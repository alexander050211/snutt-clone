import './reset.css';

import { useEffect, useState } from 'react';

import styles from './Mypage.module.css';
import Navibar from './Navibar';
import {
  fetchInformation,
  getNickname,
  getToken,
  NICKNAME_STORAGE_KEY,
  saveNickname,
} from './utils/Functions';
import type { InfoToken, Nickname } from './utils/Types';

type ChangeProps = {
  toAccount: () => void;
  notify: () => void;
};

const MypageChangeNickname = ({ toAccount, notify }: ChangeProps) => {
  const [nickname, setNickname] = useState<Nickname | undefined>(getNickname());

  const changeNickname = async () => {
    try {
      const url =
        'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/users/me';
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': getToken() as string,
        },
        body: JSON.stringify({
          nickname: (document.getElementById('name') as HTMLInputElement).value,
        }),
      });

      if (!response.ok) {
        notify();
        throw new Error(`API 호출 실패: ${response.status}`);
      }

      const data = (await response.json()) as InfoToken;

      setNickname(data.nickname);
      saveNickname(data.nickname);
      toAccount();
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const onNicknameChange = () => {
    void changeNickname();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onNicknameChange();
    }
  };

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
          onClick={toAccount}
          style={{ textAlign: 'left' }}
        >
          〈 &nbsp;뒤로
        </button>
        <div className={styles.middleSection}>닉네임 변경</div>
        <button
          className={styles.sideSection}
          onClick={onNicknameChange}
          style={{ textAlign: 'right' }}
        >
          저장&nbsp;&nbsp;&nbsp;&nbsp;
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.subtitle} style={{ marginTop: '18px' }}>
          닉네임 (공백 포함 한/영/숫자 10자 이내)
        </div>
        <input
          className={styles.inputBox}
          type="text"
          id="name"
          placeholder={nickname != null ? `${nickname.nickname} ` : 'Error'}
          onKeyDown={handleKeyDown}
        />
        <div className={styles.subtitle} style={{ marginTop: '16px' }}>
          최초 닉네임은 가입 시 임의 부여된 닉네임으로,
          <br />
          앞의 이름을 변경할 시 4자리 숫자 태그는 자동 변경됩니다.
          <br />
          <br />
          변경된 닉네임은 나의 모든 친구에게 반영됩니다.
        </div>
        <div
          className={styles.subtitle}
          style={{ marginTop: '20px', fontWeight: 'bold' }}
        >
          닉네임 조건
        </div>
        <div className={styles.subtitle} style={{ marginTop: '0px' }}>
          - 불완전한 한글(예: ㄱ, ㅏ)은 포함될 수 없습니다.
          <br />
          - 영문 대/소문자는 구분됩니다. <br />- 상대에게 불쾌감을 주는 등
          부적절한 닉네임은 관리자에 의해 안내 없이 수정될 수 있습니다.
        </div>
      </div>
      <Navibar />
    </div>
  );
};

export default MypageChangeNickname;
