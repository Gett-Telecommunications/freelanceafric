import { E_FileRoutes } from './file-routes.enum';

export interface I_File {
  id: string;
  originalName: string;
  uploadName: string;
  downloadUrl?: string;
  route: E_FileRoutes;
  fullPath: string;
  createdAt_ISO: string;
  displayName?: string;
  notes?: string;
  uploadedBy: string;
}
