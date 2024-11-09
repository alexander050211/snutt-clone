export type Nickname = {
  nickname: string;
  tag: string;
};

export type InfoToken = {
  id: string;
  isAdmin: boolean;
  regDate: string;
  notificationCheckedAt: string;
  email: string;
  localId: string;
  fbName: string;
  nickname: Nickname;
};
