import './reset.css';

import { useEffect, useState } from 'react';

import styles from './Mypage.module.css';
import Navibar from './Navibar';
import {
  fetchInformation,
  getNickname,
  NICKNAME_STORAGE_KEY,
  saveNickname,
} from './utils/Functions';
import type { Nickname } from './utils/Types';

type AccountProps = {
  toMypage: () => void;
  toChange: () => void;
};

const MypageAccount = ({ toMypage, toChange }: AccountProps) => {
  const [nickname, setNickname] = useState<Nickname | undefined>(getNickname());

  useEffect(() => {
    if (nickname != null) {
      saveNickname(nickname);
    } else {
      localStorage.removeItem(NICKNAME_STORAGE_KEY);
    }
  }, [nickname]);

  useEffect(() => {
    let ignore = false;
    fetchInformation()
      .then((data) => {
        if (!ignore && data !== null) {
          setNickname(data.nickname);
          saveNickname(data.nickname);
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
        <button
          className={styles.sideSection}
          onClick={toMypage}
          style={{ textAlign: 'left' }}
        >
          〈 &nbsp;뒤로
        </button>
        <div className={styles.middleSection}>내 계정</div>
        <div className={styles.sideSection}></div>
      </div>
      <div className={styles.content}>
        <button
          className={styles.button}
          onClick={toChange}
          style={{ marginTop: '40px' }}
        >
          <div className={styles.buttonLeft}>닉네임 변경</div>

          <div className={styles.buttonRight}>
            {nickname != null
              ? `${nickname.nickname}#${nickname.tag} `
              : 'Error'}
            &nbsp; {'〉'}
          </div>
        </button>
      </div>
      <Navibar />
    </div>
  );
};

export default MypageAccount;
