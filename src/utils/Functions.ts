import type { InfoTimetable, InfoToken, Nickname } from './Types';

export const NICKNAME_STORAGE_KEY = 'user_nickname';
export const TOKEN_STORAGE_KEY = 'authorization_token';

export const fetchInformation = async () => {
  try {
    const url =
      'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/users/me';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': getToken() as string,
      },
    });
    return (await response.json()) as InfoToken;
  } catch (error) {
    console.error('Error: ', error);
    return null;
  }
};

export const fetchTimetable = async () => {
  try {
    const url =
      'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/tables/recent';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': getToken() as string,
      },
    });
    return (await response.json()) as InfoTimetable;
  } catch (error) {
    console.error('Error: ', error);
    return null;
  }
};

export const calculateTotalCredit = (infoTimetable: InfoTimetable) => {
  const lecture_list = infoTimetable.lecture_list;

  return lecture_list.reduce((sum, cur) => {
    return sum + cur.credit;
  }, 0);
};

export const saveToken = (token: string | null) => {
  if (token !== null) localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const getToken = (): string | null => {
  const saved = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (saved != null) {
    try {
      return saved;
    } catch {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      return null;
    }
  }

  return null;
};

export const saveNickname = (nickname: Nickname) => {
  localStorage.setItem(NICKNAME_STORAGE_KEY, JSON.stringify(nickname));
};

export const getNickname = (): Nickname | undefined => {
  const saved = localStorage.getItem(NICKNAME_STORAGE_KEY);
  if (saved != null) {
    try {
      return JSON.parse(saved) as Nickname;
    } catch {
      localStorage.removeItem(NICKNAME_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      return undefined;
    }
  }
  return undefined;
};

export const deleteLecture = async (
  timetableId: string,
  timetableLectureId: string,
) => {
  try {
    const url = `https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/tables/${timetableId}/lecture/${timetableLectureId}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': getToken() as string,
      },
    });
    return (await response.json()) as InfoTimetable;
  } catch (error) {
    console.error('Error: ', error);
  }
};
