import './reset.css';

import { Link } from 'react-router-dom';

import friends from './friends.svg';
import lecturereview from './lecture_review.svg';
import mypage from './mypage.svg';
import styles from './Navibar.module.css';
import search from './search.svg';
import timetable from './timetable.svg';

//선택된 메뉴가 검은색으로 칠해지는 건 구현해야 됨
//검색, 강의평, 친구도 일단 시간표로 연결해 둠
const Navibar = () => {
  return (
    <div className={styles.navibarFrame}>
      <div className={styles.navibarContent}>
        <Link to="/" className={styles.navibarButton}>
          <img src={timetable} alt="Timetable" />
        </Link>
        <Link to="/" className={styles.navibarButton}>
          <img src={search} alt="Search" />
        </Link>
        <Link to="/" className={styles.navibarButton}>
          <img src={lecturereview} alt="Lecture Review" />
        </Link>
        <Link to="/" className={styles.navibarButton}>
          <img src={friends} alt="Friends" />
        </Link>
        <Link to="/mypage" className={styles.navibarButton}>
          <img src={mypage} alt="MyPage" />
        </Link>
      </div>
    </div>
  );
};

export default Navibar;
