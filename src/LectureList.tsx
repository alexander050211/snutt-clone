import { Link, useNavigate } from 'react-router-dom';

import styles from './LectureList.module.css';
import type { ClassTime, Lecture } from './utils/Types';
import leftArrow from './resources/lecturedetail_leftarrow.svg';

import type { InfoTimetable } from './utils/Types';
import { useEffect, useState } from 'react';

import {
  fetchTimetable,
  NICKNAME_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
} from './utils/Functions';

const LectureList = () => {
  const [data, setData] = useState<InfoTimetable | null>(null);

  useEffect(() => {
    let ignore = false;

    fetchTimetable()
      .then((dat) => {
        if (!ignore && dat !== null) {
          setData(dat);
        }
      })
      .catch((err: unknown) => {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(NICKNAME_STORAGE_KEY);
        console.error('Error: ', err);
      });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.upperBar}>
        <Link to="/" className={styles.timetableButton}>
          <img src={leftArrow} />
        </Link>
        <div className={styles.pageTitle}>강의 목록</div>
      </div>
      <div className={styles.list}>
        {data !== null &&
          data.lecture_list.map((lecture) => (
            <div className={styles.lectureItem}>
              <h4>lecture.course_title</h4>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LectureList;
