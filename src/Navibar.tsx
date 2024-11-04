import './reset.css';

import { Link } from 'react-router-dom';

import styles from './Navibar.module.css';
import friends from './resources/navibar_friends.svg';
import lecturereview from './resources/navibar_lecture_review.svg';
import mypage from './resources/navibar_mypage.svg';
import search from './resources/navibar_search.svg';
import timetable from './resources/navibar_timetable.svg';
const Navibar = () => {
  return (
    <div className={styles.navibarFrame}>
      <div className={styles.navibarContent}>
        <Link to="/" className={styles.navibarButton}>
          <img src={timetable} alt="Timetable" />
        </Link>
        <Link to="/search" className={styles.navibarButton}>
          <img src={search} alt="Search" />
        </Link>
        <Link to="/review" className={styles.navibarButton}>
          <img src={lecturereview} alt="Lecture Review" />
        </Link>
        <Link to="/friends" className={styles.navibarButton}>
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
