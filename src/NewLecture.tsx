import { Link, useLocation, useNavigate } from 'react-router-dom';

import styles from './NewLecture.module.css';
import leftArrow from './resources/lecturedetail_leftarrow.svg';
import { getToken } from './utils/Functions';

type LocationState = {
  timetableId: string;
};

const NewLecture = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { timetableId } = location.state as LocationState;

  const handleClick = () => {
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const instructor = (document.getElementById('name') as HTMLInputElement)
      .value;
    const credit = (document.getElementById('credit') as HTMLInputElement)
      .value;
    const place = (document.getElementById('place') as HTMLInputElement).value;
    const remark = (document.getElementById('remark') as HTMLInputElement)
      .value;

    void addNewLecture(
      title,
      instructor,
      credit !== '' ? credit : '0',
      place,
      remark,
    );
  };

  const addNewLecture = async (
    title: string,
    instructor: string,
    credit: string,
    place: string,
    remark: string,
  ) => {
    try {
      const url =
        'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/tables/' +
        timetableId +
        '/lecture';
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': getToken() as string,
        },
        body: JSON.stringify({
          course_title: title,
          instructor: instructor,
          credit: parseInt(credit),
          class_time_json: [
            {
              day: '2',
              place: place,
              startMinute: 1140,
              endMinute: 1230,
              start_time: '19:00',
              end_time: '20:30',
            },
          ],
          remark: remark,
          is_forced: true,
        }),
      });

      navigate('/');
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.upperBar}>
        <Link to="/">
          <img src={leftArrow} />
        </Link>
        <div className={styles.upperRight} onClick={handleClick}>
          저장
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.button} style={{ marginTop: `40px` }}>
          <div className={styles.buttonLeft}>강의명</div>
          <input
            className={styles.inputBox}
            type="text"
            id="title"
            defaultValue="새로운 강의"
          />
        </div>
        <div className={styles.button} style={{ marginTop: `0px` }}>
          <div className={styles.buttonLeft}>교수</div>
          <input
            className={styles.inputBox}
            type="text"
            id="name"
            placeholder="(없음)"
          />
        </div>
        <div className={styles.button} style={{ marginTop: `0px` }}>
          <div className={styles.buttonLeft}>학점</div>
          <input
            className={styles.inputBox}
            type="number"
            min="0"
            id="credit"
            defaultValue={0}
          />
        </div>
        <div className={styles.button} style={{ marginTop: `20px` }}>
          <div className={styles.buttonLeft}>장소</div>
          <input
            className={styles.inputBox}
            type="text"
            id="place"
            placeholder="(없음)"
          />
        </div>
        <div className={styles.button} style={{ marginTop: `20px` }}>
          <div className={styles.buttonLeft}>비고</div>
          <input
            className={styles.inputBox}
            type="text"
            id="remark"
            placeholder="(없음)"
          />
        </div>
        <div className={styles.button} style={{ marginTop: `60px` }}>
          <div className={styles.buttonLeft}>색</div>
          <div className={styles.buttonRight}>아쉽지만 못 바꿔요~</div>
        </div>
        <div className={styles.button} style={{ marginTop: `0px` }}>
          <div className={styles.buttonLeft}>시간</div>
          <div className={styles.buttonRight}>
            &quot;Waffle Time&quot; 수 19:00 ~ 20:30
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLecture;
