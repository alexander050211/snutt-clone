import './reset.css';

import styles from './Login.module.css';

type Nickname = {
  nickname: string;
  tag: string;
};

const Login = ({
  onLoginSuccess,
}: {
  onLoginSuccess: ({ newNickname }: { newNickname: Nickname }) => void;
}) => {
  //todo
  const newNickname = { nickname: 'asdf', tag: 'todo' };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <label className={styles.title}>로그인</label>
        <div className={styles.inputContent}>
          <label className={styles.text}>아이디</label>
          <input
            className={styles.inputBox}
            type="text"
            placeholder="아이디를 입력하세요"
          />

          <label className={styles.text}>비밀번호</label>
          <input
            className={styles.inputBox}
            type="text"
            placeholder="비밀번호를 입력하세요"
          />
          <label className={styles.additional}>
            아이디 찾기 | 비밀번호 재설정
          </label>
          <button
            className={styles.login}
            onClick={() => {
              onLoginSuccess({ newNickname });
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
