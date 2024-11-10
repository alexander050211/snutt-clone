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

type ClassTime = {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  place: string;
  startMinute: number;
  endMinute: number;
  start_time: string;
  end_time: string;
};

type Lecture = {
  id: string;
  credit: number;
  class_time_json: ClassTime[];
  course_title: string;
};

export type InfoTimetable = {
  _id: string;
  user_id: string;
  year: number;
  semester: 1 | 2 | 3 | 4;
  lecture_list: Lecture[];
  title: string;
  updated_at: string;
};
