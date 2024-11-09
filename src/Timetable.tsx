import './reset.css';

import Coursetemplate from './CourseTemplate';
import Navibar from './Navibar';
import tabImage from './resources/topbar_listview.svg';
import styles from './Timetable.module.css';

const Timetable = () => {
  return (
    <div className={styles.container}>
      <header className={styles.headerFrame}>
        <div className={styles.headerInnerFrame}>
          <div className={styles.headerContentFrame}>
            <button className={styles.tabButton}>
              <img src={tabImage} alt="tab" />
            </button>
            <div className={styles.headerTextFrame}>
              <div className={styles.timetableTitle}>a안</div>
              <div className={styles.timetableCredit}>(18학점)</div>
            </div>
          </div>
        </div>
      </header>
      <main className={styles.timetableFrame}>
        <Coursetemplate />
      </main>
      <footer className={styles.navibarFrame}>
        <Navibar />
      </footer>
    </div>
  );
};

export default Timetable;
