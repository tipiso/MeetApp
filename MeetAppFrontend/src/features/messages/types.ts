type Message = {
  id: number;
  senderId: number;
  senderUsername: string;
  senderPhotoUrl: string;
  senderKnownAs: string;
  recipientId: number;
  recipientUsername: string;
  recipientPhotoUrl: string;
  recipientKnownAs: string;
  content: string;
  dateRead: null | Date;
  messageSent: Date;
};

export type { Message };
