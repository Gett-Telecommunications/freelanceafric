import { Injectable, OnDestroy, inject } from '@angular/core';
import {
  Firestore,
  Unsubscribe,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Storage, UploadTask, deleteObject, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Observable, Subscription } from 'rxjs';

import { Auth, User, user } from '@angular/fire/auth';
import { E_FileRoutes, E_FirestoreCollections, I_File } from '@freelanceafric/shared-shared';
@Injectable({
  providedIn: 'root',
})
export class FileManagementService implements OnDestroy {
  auth = inject(Auth);

  private firestore: Firestore = inject(Firestore);
  private storage: Storage = inject(Storage);
  private uploadTasks: { file: string; task: UploadTask }[] = [];

  private filesCollection = collection(this.firestore, E_FirestoreCollections.FILES);

  private user$ = user(this.auth);
  private user: User | null = null;
  userSubscription: Subscription;

  constructor() {
    this.userSubscription = this.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  uploadFile(files: File[], path: E_FileRoutes): Observable<I_FileUploadProgress[]> {
    return new Observable((observer) => {
      if (!this.user) {
        observer.error('User is not logged in');
        return;
      }
      const returnValue: I_FileUploadProgress[] = [];
      const findObjectByIndex = (index: number) => returnValue.find((value) => value.index === index);
      const updateObjectByIndex = async (index: number, value: I_FileUploadProgress) => {
        const object = findObjectByIndex(index);
        if (object) {
          Object.assign(object, value);
        } else {
          returnValue.push(value);
        }
        const allDone = returnValue.every((value) => value.completed);
        observer.next(returnValue);
        if (allDone) {
          observer.complete();
          const filesToUpload = returnValue.map((progressData) => progressData.fileObj);
          await this.saveFilesToDB(filesToUpload);
        }
        return;
      };
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file) {
          const fileObj = new _File_({ originalName: file.name, route: path });
          updateObjectByIndex(i, {
            index: i,
            file: file,
            progress_percentage: 0,
            fileObj,
          });

          const storageRef = ref(this.storage, fileObj.fullPath);
          const uploadTask = uploadBytesResumable(storageRef, file);
          this.uploadTasks.push({ file: file.name, task: uploadTask });
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              updateObjectByIndex(i, { index: i, file: file, progress_percentage: progress });
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  updateObjectByIndex(i, {
                    index: i,
                    file: file,
                    progress_percentage: progress,
                    infoMessage: 'Upload is paused',
                    running: false,
                    paused: true,
                  });
                  break;
                case 'running':
                  updateObjectByIndex(i, {
                    index: i,
                    file: file,
                    progress_percentage: progress,
                    infoMessage: 'Upload is running',
                    running: true,
                    paused: false,
                  });
                  break;
              }
            },
            (error) => {
              // https://firebase.google.com/docs/storage/web/handle-errors
              let errorMessage = 'Unknown error occurred, inspect error.serverResponse';
              switch (error.code) {
                case 'storage/unauthorized':
                  errorMessage = `User doesn't have permission to access the object`;
                  break;
                case 'storage/canceled':
                  errorMessage = `User canceled the upload`;
                  break;

                case 'storage/unknown':
                  errorMessage = `Unknown error occurred, inspect error.serverResponse`;
                  break;
              }
              updateObjectByIndex(i, { index: i, file: file, progress_percentage: 0, errorMessage: errorMessage });
            },
            () => {
              // Get the download URL and save the file to the DB
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                const evt = findObjectByIndex(i);
                if (!evt) throw new Error('File object not found when trying to update it');
                const obj = evt.fileObj;
                if (!obj) throw new Error('File object not found when trying to update it');
                obj.url = downloadURL;
                if (!this.user) throw new Error('User is not logged in');
                obj.uploadedBy = this.user.uid;
                updateObjectByIndex(i, {
                  index: i,
                  file: file,
                  progress_percentage: 100,
                  infoMessage: '',
                  errorMessage: '',
                  successMessage: 'File uploaded successfully',
                  downloadUrl: downloadURL,
                  running: false,
                  completed: true,
                  fileObj: obj,
                });
              });
            },
          );
        }
      }
    });
  }

  pauseUpload(fileName: string): void {
    const uploadTask = this.uploadTasks.find((task) => task.file === fileName);
    if (uploadTask) {
      uploadTask.task.pause();
    }
  }

  resumeUpload(fileName: string): void {
    const uploadTask = this.uploadTasks.find((task) => task.file === fileName);
    if (uploadTask) {
      uploadTask.task.resume();
    }
  }

  cancelUpload(fileName: string): void {
    const uploadTask = this.uploadTasks.find((task) => task.file === fileName);
    if (uploadTask) {
      uploadTask.task.cancel();
    }
  }

  async saveFilesToDB(files: (_File_ | undefined)[]): Promise<void> {
    try {
      for (const file of files) {
        if (!file) continue;
        if (!file.id) throw new Error('File does not have an ID when trying to save it to the DB');
        await setDoc(doc(this.filesCollection, file.id), file.toJson);
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error saving files to the DB');
    }
  }

  getFilesByRoute$(route: E_FileRoutes): Observable<{ files: I_File[]; unsubscriber: Unsubscribe }> {
    return new Observable((observer) => {
      const q = query(this.filesCollection, where('route', '==', route));
      const unsubscriber = onSnapshot(q, (querySnapshot) => {
        const files: I_File[] = [];
        querySnapshot.forEach((doc) => {
          files.push(doc.data() as I_File);
        });
        observer.next({ files, unsubscriber });
      });
    });
  }

  async deleteFile(file: I_File): Promise<void> {
    try {
      // Delete the file from the storage
      // Create a reference to the file to delete
      const desertRef = ref(this.storage, file.fullPath);

      // Delete the file from storage
      deleteObject(desertRef)
        .then(async () => {
          // Delete the file from the DB
          await deleteDoc(doc(this.filesCollection, file.id));
        })
        .catch(() => {
          throw new Error('Error deleting file from the storage');
        });
    } catch (error) {
      console.log(error);
      throw new Error('Error deleting file from the DB');
    }
  }

  async updateFile(file: I_File): Promise<void> {
    try {
      await updateDoc(doc(this.filesCollection, file.id), { ...file });
    } catch (error) {
      console.log(error);
      throw new Error('Error updating file in the DB');
    }
  }

  async getFileDataByIdFromDB(fileId: string): Promise<I_File | undefined> {
    try {
      const docRef = doc(this.filesCollection, fileId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as I_File;
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error getting file data from the DB (FileManagementService::getFileDataByIdFromDB)');
    }
  }

  async getFileFromStorageById(fileId: string): Promise<File | undefined> {
    try {
      const fileFromDB = await this.getFileDataByIdFromDB(fileId);
      if (!fileFromDB) throw new Error('File not found in the DB');
      const storageRef = ref(this.storage, fileFromDB.fullPath);
      const fileUrl = await getDownloadURL(storageRef);
      const file = await fetch(fileUrl);
      if (!file) throw new Error('File not found in the DB');
      const blob = await file.blob();
      return new File([blob], fileFromDB.originalName);
    } catch (error) {
      console.log(error);
      throw new Error('Error getting file from the storage');
    }
  }

  async getFileDownloadURLById(fileId: string): Promise<string> {
    try {
      const fileFromDB = await this.getFileDataByIdFromDB(fileId);
      if (!fileFromDB) throw new Error('File not found in the DB');
      if (fileFromDB.downloadUrl) return fileFromDB.downloadUrl;
      const storageRef = ref(this.storage, fileFromDB.fullPath);
      const fileUrl = await getDownloadURL(storageRef);
      return fileUrl;
    } catch (error) {
      console.log(error);
      throw new Error('Error getting file from the storage');
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}

export interface I_FileUploadProgress {
  index: number;
  file: File;
  downloadUrl?: string;
  progress_percentage: number;
  errorMessage?: string;
  successMessage?: string;
  infoMessage?: string;
  completed?: boolean;
  cancelled?: boolean;
  paused?: boolean;
  running?: boolean;
  fileObj?: _File_;
}

export class _File_ implements I_File {
  private _uploadName = '';
  private _url?: string;
  private _uploadedBy?: string;

  id: string;
  originalName: string;
  route: E_FileRoutes;

  constructor(file: { originalName: string; route: E_FileRoutes; id?: string; url?: string }) {
    this.originalName = file.originalName;
    this.route = file.route;
    if (file.id) {
      this.id = file.id;
    } else {
      this.id = this.generateRandomId();
    }
    if (file.url) {
      this.url = file.url;
    }
    this.uploadName = this.cleanUpString(`${this.id}_${this.originalName}`);
  }
  generateRandomId(): string {
    return Math.random().toString(36).substring(2);
  }

  set uploadName(_uploadName: string) {
    this._uploadName = _uploadName;
  }

  get uploadName(): string {
    return this._uploadName;
  }

  set url(_url: string) {
    this._url = _url;
  }

  get url(): string {
    if (!this._url) throw new Error('File does not have a URL when trying to get it');
    return this._url;
  }

  get fullPath(): string {
    return `${this.route}/${this.uploadName}`;
  }

  get createdAt_ISO(): string {
    return new Date().toISOString();
  }

  set uploadedBy(_uploadedBy: string) {
    this._uploadedBy = _uploadedBy;
  }

  get uploadedBy(): string {
    if (!this._uploadedBy) throw new Error('File does not have an uploadedBy when trying to get it');
    return this._uploadedBy;
  }

  // Clean up a string by replacing special characters with underscores
  cleanUpString(input: string): string {
    // Define the symbols to replace
    const symbolsToReplace = /[#[*?]/g;
    // Replace symbols with underscores
    return input.replace(symbolsToReplace, '_');
  }

  get toJson(): I_File {
    return {
      id: this.id,
      originalName: this.originalName,
      uploadName: this.uploadName,
      createdAt_ISO: this.createdAt_ISO,
      route: this.route,
      fullPath: this.fullPath,
      downloadUrl: this.url,
      uploadedBy: this.uploadedBy,
    };
  }
}
