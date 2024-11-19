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

export type ClassTime = {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  place: string;
  startMinute: number;
  endMinute: number;
  start_time: string;
  end_time: string;
};

export type Lecture = {
  _id: string;
  academic_year: string;
  category: string;
  class_time_json: ClassTime[];
  classification: string;
  colorIndex: number;
  credit: number;
  department: string;
  instructor: string;
  lecture_number: string;
  quota: number;
  remark: string;
  course_number: string;
  course_title: string;
  lecture_id: string;
  class_time_mask: number[];
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
