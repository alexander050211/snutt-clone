import { useLocation, useNavigate } from 'react-router-dom';

import { deleteLecture } from './utils/Functions';
import type { Lecture } from './utils/Types';

type LocationState = {
  timetableId: string;
  lecture: Lecture;
};

const LectureDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  const handleDelete = () => {
    deleteLecture(state.timetableId, state.lecture._id)
      .then(() => {
        navigate('/');
      })
      .catch((err: unknown) => {
        console.error('Error: ', err);
      });
  };

  return (
    <div>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        돌아가기
      </button>
      <h1>{state.lecture.course_title}</h1>
      {/* todo */}
      <button
        onClick={() => {
          handleDelete();
        }}
      >
        강의 삭제
      </button>
    </div>
  );
};

export default LectureDetail;
