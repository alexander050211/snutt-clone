import appleId from './appleid_button@2x 1.png';
import googleGLogo from './Google _G_ logo.png';
import styles from './Home.module.css';
import kakaoLoginSmall1 from './kakao_login_small 1.png';
import facebook from './페이스북_로고_심볼형_RGB 1.png';

const Home = ({ onLoginButtonClick }: { onLoginButtonClick: () => void }) => {
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
              <b className={styles.button} onClick={onLoginButtonClick}>
                로그인
              </b>
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
