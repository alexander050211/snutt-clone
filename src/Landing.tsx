import './reset.css';

import styles from './Landing.module.css';

type Nickname = {
  nickname: string;
  tag: string;
};

const Landing = ({ nickname }: { nickname: Nickname }) => {
  //todo
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {nickname.nickname}#{nickname.tag}
      </h1>
    </div>
  );
};

export default Landing;
