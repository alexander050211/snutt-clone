import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './LectureList.module.css';
import Navibar from './Navibar';
import lectureClock from './resources/lecture_clock.svg';
import lectureLocation from './resources/lecture_location.svg';
import lectureTag from './resources/lecture_tag.svg';
import leftArrow from './resources/lecturedetail_leftarrow.svg';
import {
  fetchTimetable,
  NICKNAME_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
} from './utils/Functions';
import type { InfoTimetable } from './utils/Types';

const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일'];

const getWeekdayString = (day: number): string => {
  return WEEKDAYS[day] ?? '';
};

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
          data.lecture_list.map((lecture, index) => (
            <React.Fragment key={index}>
              <div className={styles.lectureItem}>
                <div className={styles.mainline}>
                  <h4>{lecture.course_title}</h4>
                  <p className={styles.lectureInfo}>
                    {lecture.instructor} / {lecture.credit}학점
                  </p>
                </div>
                <div className={styles.subline}>
                  <img
                    className={styles.lectureIcon}
                    src={lectureTag}
                    alt="Lecture Tag"
                  />
                  {lecture.department}, {lecture.academic_year}
                </div>
                <div className={styles.classTimes}>
                  <img
                    className={styles.lectureIcon}
                    src={lectureClock}
                    alt="Lecture Clock"
                  />
                  {lecture.class_time_json.map((classTimes, index1) => (
                    <React.Fragment key={index1}>
                      <div className={styles.classTime}>
                        {getWeekdayString(classTimes.day)}(
                        {classTimes.start_time} ~ {classTimes.end_time}){', '}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                <div className={styles.subline}>
                  <img
                    className={styles.lectureIcon}
                    src={lectureLocation}
                    alt="Lecture Location"
                  />
                  {Array.from(
                    new Set(
                      lecture.class_time_json.map((classTimes) =>
                        classTimes.place === '' ? '-' : classTimes.place,
                      ),
                    ),
                  ).join(', ')}
                </div>
              </div>
            </React.Fragment>
          ))}
      </div>
      <footer className={styles.navibarFrame}>
        <Navibar />
      </footer>
    </div>
  );
};

export default LectureList;
