import './reset.css';

import { useEffect, useState } from 'react';

import Coursetemplate from './CourseTemplate';
import Navibar from './Navibar';
import tabImage from './resources/topbar_listview.svg';
import styles from './Timetable.module.css';
import {
  calculateTotalCredit,
  fetchTimetable,
  NICKNAME_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
} from './utils/Functions';
import type { InfoTimetable } from './utils/Types';

const Timetable = () => {
  const [data, setData] = useState<InfoTimetable | null>(null);

  useEffect(() => {
    let ignore = false;

    fetchTimetable()
      .then((dat) => {
        if (!ignore && dat !== null) {
          setData(dat);
          /*
            dat.lecture_list.forEach(lecture => {
              console.log(lecture.course_title);
              lecture.class_time_json.forEach(classTime => {
                console.log(`${classTime.place} ${classTime.day}: ${classTime.startMinute} ~ ${classTime.endMinute}`);
              })
            });
          */
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
      <header className={styles.headerFrame}>
        <div className={styles.headerInnerFrame}>
          <div className={styles.headerContentFrame}>
            <button className={styles.tabButton}>
              <img src={tabImage} alt="tab" />
            </button>
            <div className={styles.headerTextFrame}>
              <div className={styles.timetableTitle}>{data?.title}</div>
              <div className={styles.timetableCredit}>
                {data !== null
                  ? `(${calculateTotalCredit(data)} 학점)`
                  : 'loading...'}
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className={styles.timetableFrame}>
        <Coursetemplate />
      </main>
      {data !== null &&
        data.lecture_list.map((lecture, index1) => {
          return (
            <div key={-index1}>
              {lecture.class_time_json.map((classTime, index2) => {
                const start = classTime.startMinute - 60 * 9;
                const length = classTime.endMinute - classTime.startMinute;
                const day = classTime.day;

                return (
                  <div
                    className={styles.lectureBlock}
                    key={index1 * data.lecture_list.length + index2}
                    style={{
                      top: `calc(68px + (${start} * (100% - 68px - 50px)) / 780)`,
                      left: `calc(21px + ${day} * (100% - 22px) / 5)`,
                      height: `calc((${length} * (100% - 68px - 50px)) / 780)`,
                    }}
                  >
                    <div className={styles.lectureBlockText}>
                      {lecture.course_title}
                      <br />
                      {classTime.place}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      <footer className={styles.navibarFrame}>
        <Navibar />
      </footer>
    </div>
  );
};

export default Timetable;
