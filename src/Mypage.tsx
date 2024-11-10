import './reset.css';

import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './Mypage.module.css';
import Navibar from './Navibar';
import {
  fetchInformation,
  getNickname,
  NICKNAME_STORAGE_KEY,
  saveNickname,
  TOKEN_STORAGE_KEY,
} from './utils/Functions';
import type { Nickname } from './utils/Types';

type MypageProps = {
  onLogout: () => void;
  toAccount: () => void;
};

const Mypage = ({ onLogout, toAccount }: MypageProps) => {
  const [nickname, setNickname] = useState<Nickname | undefined>(getNickname());

  useEffect(() => {
    if (nickname != null) {
      saveNickname(nickname);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(NICKNAME_STORAGE_KEY);
    }
  }, [nickname]);

  useEffect(() => {
    let ignore = false;
    fetchInformation()
      .then((data) => {
        if (!ignore && data !== null) {
          if (getNickname() === undefined || getNickname() !== data.nickname) {
            setNickname(data.nickname);
            saveNickname(data.nickname);
          }
        }
      })
      .catch((error: unknown) => {
        console.error('Error: ', error);
      });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.upperBar}>
        <div className={styles.sideSection}></div>
        <div className={styles.middleSection}>마이페이지</div>
        <div className={styles.sideSection}></div>
      </div>
      <div className={styles.content}>
        <button
          className={styles.button}
          onClick={toAccount}
          style={{ marginTop: '40px' }}
        >
          <div className={styles.buttonLeft}>내 계정</div>

          <div className={styles.buttonRight}>
            {nickname != null
              ? `${nickname.nickname}#${nickname.tag} `
              : 'Error'}
            &nbsp; {'〉'}
          </div>
        </button>
        <div className={styles.subtitle}>디스플레이</div>
        <button className={styles.button}>
          <div className={styles.buttonLeft}>색상 모드</div>

          <div className={styles.buttonRight}>자동 &nbsp; {'〉'}</div>
        </button>
        <button className={styles.button}>
          <div className={styles.buttonLeft}>시간표 설정</div>

          <div className={styles.buttonRight}>&nbsp; {'〉'}</div>
        </button>
        <button className={styles.button}>
          <div className={styles.buttonLeft}>시간표 테마</div>

          <div className={styles.buttonRight}>&nbsp; {'〉'}</div>
        </button>

        <div className={styles.subtitle}>서비스</div>

        <button className={styles.button}>
          <div className={styles.buttonLeft}>빈자리 알림</div>

          <div className={styles.buttonRight}>&nbsp; {'〉'}</div>
        </button>

        <div className={styles.subtitle}>정보 및 제안</div>

        <button className={styles.button}>
          <div className={styles.buttonLeft}>버전 정보</div>

          <div className={styles.buttonRight}>wafflestudio 22.5기 &nbsp;</div>
        </button>
        <button className={styles.button}>
          <div className={styles.buttonLeft}>개발자 정보</div>

          <div className={styles.buttonRight}>
            2024 frontend 세미나 8조 &nbsp;
          </div>
        </button>
        <button
          className={styles.button}
          onClick={onLogout}
          style={{ color: 'red', marginTop: '40px' }}
        >
          <div className={styles.buttonLeft}>로그아웃</div>
        </button>
      </div>
      <Navibar />
      <Outlet />
    </div>
  );
};

export default Mypage;
