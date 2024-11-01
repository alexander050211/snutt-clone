import './reset.css';

import styles from './Mypage.module.css';
import Navibar from './Navibar';

const Mypage = () => {
  //todo
  return (
    <div className={styles.container}>
      <div className={styles.tmpContent}>
        <h1 className={styles.title}>Mypage todo</h1>
      </div>
      <Navibar />
    </div>
  );
};

export default Mypage;
