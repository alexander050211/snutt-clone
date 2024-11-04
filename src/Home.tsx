import { Link } from 'react-router-dom';

import styles from './Home.module.css';
import appleId from './resources/logo_apple.png';
import facebook from './resources/logo_facebook.png';
import googleGLogo from './resources/logo_google.png';
import kakaoLoginSmall1 from './resources/logo_kakaotalk.png';

//const Home = ({ onLoginButtonClick }: { onLoginButtonClick: () => void })
const Home = () => {
  //todo
  return (
    <div className={styles.frameParent}>
      <div className={styles.groupParent}>
        <div className={styles.rectangleParent}>
          <div className={styles.groupChild} />
          <div className={styles.groupItem} />
          <div className={styles.groupInner} />
          <div className={styles.rectangleDiv} />
          <div className={styles.groupChild1} />
          <div className={styles.groupChild2} />
          <div className={styles.groupChild3} />
          <div className={styles.groupChild4} />
        </div>
        <div className={styles.timetable}>TimeTable</div>
      </div>
      <div className={styles.frameGroup}>
        <div className={styles.frameWrapper}>
          <div className={styles.buttonfilledParent}>
            <div className={styles.buttonfilled}>
              <Link to="/login" className={styles.button}>
                로그인
              </Link>
            </div>
            <div className={styles.buttontext}>
              <div className={styles.buttonWrapper}>
                <div className={styles.button1}>회원가입</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.frameContainer}>
          <div className={styles.frameDiv}>
            <div className={styles.lineParent}>
              <div className={styles.frameChild} />
              <div className={styles.sns}>SNS 계정으로 계속하기</div>
              <div className={styles.frameChild} />
            </div>
            <div className={styles.kakaoLoginSmall1Parent}>
              <img
                className={styles.kakaoLoginSmall1Icon}
                alt=""
                src={kakaoLoginSmall1}
              />
              <div className={styles.googleGLogoWrapper}>
                <img className={styles.googleGLogo} alt="" src={googleGLogo} />
              </div>
              <img className={styles.rgb1Icon} alt="" src={facebook} />
              <img
                className={styles.appleidButton2x1Icon}
                alt=""
                src={appleId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
