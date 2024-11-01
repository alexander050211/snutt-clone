import './reset.css';

import styles from './Mypage.module.css';
import Navibar from './Navibar';

type Nickname = {
  nickname: string;
  tag: string;
};

type MypageProps = {
  nickname: Nickname | undefined;
  onLogout: () => void;
};

const Mypage = ({ nickname, onLogout }: MypageProps) => {
  //todo: design
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Mypage todo</h1>
        <h1 className={styles.title}>
          {' '}
          {nickname != null
            ? `${nickname.nickname}#${nickname.tag}`
            : 'Error'}{' '}
        </h1>
        <button onClick={onLogout}> 로그아웃 </button>
      </div>
      <Navibar />
    </div>
  );
};

export default Mypage;
