import { Component, computed, effect, inject, input, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { collection, collectionData, doc, Firestore, orderBy, query, setDoc } from '@angular/fire/firestore';
import { E_FileRoutes, E_FirestoreCollections, I_ChatMessage, I_File } from '@freelanceafric/shared-shared';
import { Auth, User, user } from '@angular/fire/auth';
import { Observable, Subscription, tap } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { ChatMessageComponent, FileUploadComponent } from '@freelanceafric/shared-ng-ui';

@Component({
  selector: 'lib-order-chat',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ChatMessageComponent,
    FileUploadComponent,
  ],
  templateUrl: './order-chat.component.html',
  styleUrl: './order-chat.component.scss',
})
export class OrderChatComponent implements OnDestroy {
  chatReference = input.required<string>();
  chatType = input.required<'order'>();
  chatMessage = input<I_ChatMessage>();

  private firestore = inject(Firestore);
  private auth = inject(Auth);

  private user$ = user(this.auth);
  private chatMessages$?: Observable<I_ChatMessage[]> | undefined;

  public readonly user = signal<User | null>(null);
  private chatMessages = signal<I_ChatMessage[]>([]);
  public sortedMessages = computed(() => {
    const combined = [
      ...this.chatMessages().sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
    ];
    return combined;
  });

  private dbString = computed(() => {
    switch (this.chatType()) {
      case 'order':
        return `${E_FirestoreCollections.ORDERS}/${this.chatReference()}/chat`;
    }
  });

  private collection = computed(() => {
    switch (this.chatType()) {
      case 'order':
        return collection(this.firestore, this.dbString());
    }
  });

  public messageForm = new FormGroup({
    message: new FormControl(''),
  });

  private userSub = this.user$.subscribe((user) => {
    this.user.set(user);
  });

  private messagesSub: Subscription | undefined;
  E_FileRoutes = E_FileRoutes;

  constructor() {
    effect(() => {
      const _query = query(this.collection(), orderBy('createdAt', 'desc'));
      this.chatMessages$ = collectionData(_query) as Observable<I_ChatMessage[]>;
      if (this.messagesSub) this.messagesSub.unsubscribe();
      this.messagesSub = this.chatMessages$?.subscribe((messages) => {
        this.chatMessages.set(messages);
      });
    });

    effect(() => {
      const message = this.chatMessage();
      if (message) {
        this.sendMessage(message);
      }
    });
  }

  public onSubmitMessage(): void {
    const user = this.user();
    if (!user) {
      return;
    }
    const formattedMessage: I_ChatMessage = {
      id: '',
      senderUID: user.uid,
      type: 'message',
      message: this.messageForm.value.message || '',
      createdAt: new Date().toISOString(),
    };
    this.sendMessage(formattedMessage);
    this.messageForm.reset();
  }

  public async onUploadFile(uploadedFiles: I_File[]): Promise<void> {
    const allPromises = uploadedFiles.map((file) => {
      const message: I_ChatMessage = {
        id: '',
        senderUID: this.user()?.uid || '',
        type: 'file',
        message: file.originalName,
        createdAt: new Date().toISOString(),
        reference: file,
      };
      return this.sendMessage(message);
    });
    try {
      await Promise.all(allPromises);
    } catch (error) {
      console.error(error);
    }
  }

  private async sendMessage(message: I_ChatMessage): Promise<void> {
    if (!this.user()) {
      return;
    }
    const _doc = doc(this.collection());
    message.id = _doc.id;
    message.createdAt = new Date().toISOString();
    await setDoc(_doc, message);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.messagesSub?.unsubscribe();
  }
}
