import './reset.css';

import { useCallback, useState } from 'react';

import styles from './Login.module.css';

type Nickname = {
  nickname: string;
  tag: string;
};

type LoginToken = {
  id: string;
  password: string;
};

type AuthToken = {
  user_id: string;
  token: string;
  message: string;
};

type InfoToken = {
  id: string;
  isAdmin: boolean;
  regDate: string;
  notificationCheckedAt: string;
  email: string;
  localId: string;
  fbName: string;
  nickname: Nickname;
};

const Login = ({
  onLoginSuccess,
}: {
  onLoginSuccess: ({ newNickname }: { newNickname: Nickname }) => void;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const requestLogin = useCallback(() => {
    setIsLoading(true);

    const requestBody: LoginToken = {
      id: (document.getElementById('id') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value,
    };

    fetch(
      'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/auth/login_local',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Login failed: ' + response.statusText);
        }
        return response.json() as Promise<AuthToken>;
      })
      .then((response) => {
        return fetch(
          'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/users/me',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': response.token,
            },
          },
        );
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Loading information failed: ' + response.statusText);
        }
        return response.json() as Promise<InfoToken>;
      })
      .then((response) => {
        onLoginSuccess({ newNickname: response.nickname });
      })
      .catch((error: unknown) => {
        console.error('Error during login:', error);
        alert(error instanceof Error ? error.message : 'Unknown error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [onLoginSuccess]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      requestLogin();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <label className={styles.title}>로그인</label>
        <div className={styles.inputContent}>
          <label className={styles.text}>아이디</label>
          <input
            className={styles.inputBox}
            type="text"
            id="id"
            placeholder="아이디를 입력하세요"
          />

          <label className={styles.text}>비밀번호</label>
          <input
            className={styles.inputBox}
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            onKeyDown={handleKeyDown}
          />
          <label className={styles.additional}>
            아이디 찾기 | 비밀번호 재설정
          </label>
          <button className={styles.login} onClick={requestLogin}>
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
