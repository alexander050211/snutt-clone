import './reset.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Coursetemplate from './CourseTemplate';
import LectureBlock from './LectureBlock';
import Navibar from './Navibar';
import tabImage from './resources/topbar_listview.svg';
import topTabAlarmOff from './resources/topbar_toptab_alarm_off.svg';
import topTabList from './resources/topbar_toptab_list.svg';
import topTabShare from './resources/topbar_toptab_share.svg';
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
            <div className={styles.topTab}>
              <Link to="/lecturelist" className={styles.tabButton}>
                <img src={topTabList} alt="tab" />
              </Link>
              <button className={styles.tabButton}>
                <img src={topTabShare} alt="tab" />
              </button>
              <button className={styles.tabButton}>
                <img src={topTabAlarmOff} alt="tab" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className={styles.timetableFrame}>
        <Coursetemplate />
      </main>
      {data !== null &&
        data.lecture_list.map((lecture, index1) => (
          <div key={-index1}>
            {lecture.class_time_json.map((classTime, index2) => (
              <LectureBlock
                key={index1 * data.lecture_list.length + index2}
                timetableId={data._id}
                lecture={lecture}
                classTime={classTime}
                index1={index1}
                index2={index2}
                lectureListLength={data.lecture_list.length}
              />
            ))}
          </div>
        ))}
      <footer className={styles.navibarFrame}>
        <Navibar />
      </footer>
    </div>
  );
};

export default Timetable;
