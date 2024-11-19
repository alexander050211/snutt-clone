import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import styles from './LectureDetail.module.css';
import leftArrow from './resources/lecturedetail_leftarrow.svg';
import { deleteLecture } from './utils/Functions';
import type { Lecture } from './utils/Types';

const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일'];

const getWeekdayString = (day: number): string => {
  return WEEKDAYS[day] ?? '';
};

type LocationState = {
  timetableId: string;
  lecture: Lecture;
};

const LectureDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { timetableId, lecture } = location.state as LocationState;
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteLecture(timetableId, lecture._id)
      .then(() => {
        navigate('/');
      })
      .catch((err: unknown) => {
        console.error('Error: ', err);
      });
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.upperBar}>
        <Link to="/" className={styles.timetableButton}>
          <img src={leftArrow} />
        </Link>
        <div className={styles.pageTitle}>강의 상세 보기</div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.divider} />

        <div className={styles.content}>
          <div className={styles.contentTitle}>강의명</div>
          <div className={styles.contentText}>{lecture.course_title}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>교수</div>
          <div className={styles.contentText}>{lecture.instructor}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>색상</div>
          <div className={styles.contentText}>{lecture.colorIndex}</div>
        </div>

        <div className={styles.divider} />

        <div className={styles.content}>
          <div className={styles.contentTitle}>학과</div>
          <div className={styles.contentText}>{lecture.department}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>학년</div>
          <div className={styles.contentText}>{lecture.academic_year}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>학점</div>
          <div className={styles.contentText}>{lecture.credit}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>분류</div>
          <div className={styles.contentText}>{lecture.classification}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>구분</div>
          <div className={styles.contentText}>{lecture.category}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>강좌번호</div>
          <div className={styles.contentText}>{lecture.course_number}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>분반번호</div>
          <div className={styles.contentText}>{lecture.lecture_number}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>정원</div>
          <div className={styles.contentText}>{lecture.quota}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>비고</div>
          <div className={styles.contentText}>{lecture.remark}</div>
        </div>

        <div className={styles.divider} />

        <div className={styles.content}>
          <div className={styles.contentTitle}>시간 및 장소</div>
        </div>
        {lecture.class_time_json.map((classTime, index) => (
          <React.Fragment key={index}>
            <div className={styles.content}>
              <div className={styles.contentTitle}>시간</div>
              <div className={styles.contentText}>
                {getWeekdayString(classTime.day)}({classTime.start_time}-
                {classTime.end_time})
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.contentTitle}>장소</div>
              <div className={styles.contentText}>{classTime.place}</div>
            </div>
          </React.Fragment>
        ))}
        <div className={styles.divider} />
        <div className={styles.content} onClick={handleDelete}>
          <div className={styles.deleteText}>삭제</div>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalTitle}>강의 삭제</div>
              <div className={styles.modalText}>강의를 삭제하시겠습니까?</div>
              <div className={styles.modalButtons}>
                <div
                  onClick={() => {
                    setShowModal(false);
                  }}
                  className={styles.modalButton}
                >
                  취소
                </div>
                <div onClick={confirmDelete}>확인</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LectureDetail;
