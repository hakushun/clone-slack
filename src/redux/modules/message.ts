export type Message = {
  timestamp: number;
  user: {
    id: string;
    username: string;
    avatarURL: string;
  };
  content: string;
};
