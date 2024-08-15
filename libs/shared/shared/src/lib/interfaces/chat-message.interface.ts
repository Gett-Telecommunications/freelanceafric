export interface I_ChatMessage {
  id: string;
  senderUID: string;
  type: 'message' | 'file' | 'image' | 'video' | 'audio' | 'notification' | 'typing';
  message: string;
  createdAt: string;
  file?: {
    fileId: string;
    fileName: string;
  };
}
