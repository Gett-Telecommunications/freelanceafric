import { I_File } from './file.interface';

export interface I_ChatMessage {
  id: string;
  senderUID: string;
  type: 'message' | 'file' | 'notification' | 'typing';
  message: string;
  createdAt: string;
  file?: {
    fileId: string;
    fileName: string;
  };
  reference?: string | I_File;
}
