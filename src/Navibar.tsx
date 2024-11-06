import './reset.css';

import { Link, useLocation } from 'react-router-dom';

import styles from './Navibar.module.css';
import friends from './resources/navibar_friends.svg';
import lecturereview from './resources/navibar_lecture_review.svg';
import mypageOff from './resources/navibar_mypage_off.svg';
import mypageOn from './resources/navibar_mypage_on.svg';
import search from './resources/navibar_search.svg';
import timetableOff from './resources/navibar_timetable_off.svg';
import timetableOn from './resources/navibar_timetable_on.svg';
const Navibar = () => {
  const location = useLocation();

  return (
    <div className={styles.navibarFrame}>
      <div className={styles.navibarContent}>
        <Link to="/" className={styles.navibarButton}>
          <img
            src={location.pathname === '/' ? timetableOn : timetableOff}
            alt="Timetable"
          />
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
          <img
            src={location.pathname === '/mypage' ? mypageOn : mypageOff}
            alt="MyPage"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navibar;
