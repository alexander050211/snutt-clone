import './reset.css';

import Navibar from './Navibar.tsx';
import tabImage from './resources/topbar_listview.svg';
import styles from './Timetable.module.css';

/*
type Nickname = {
  nickname: string;
  tag: string;
};
*/

//const Landing = ({ nickname }: { nickname: Nickname }): 지난 과제의 흔적

const Timetable = () => {
  //todo
  return (
    <div className={styles.container}>
      <div className={styles.headerFrame}>
        <div className={styles.headerInnerFrame}>
          <div className={styles.headerContentFrame}>
            <button className={styles.tabButton}>
              <img src={tabImage} />
            </button>
            <div className={styles.headerTextFrame}>
              <div className={styles.timetableTitle}>a안</div>
              <div className={styles.timetableCredit}>(18학점)</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.timetableFrame}>todo</div>
      <Navibar />
    </div>
  );
};

export default Timetable;
