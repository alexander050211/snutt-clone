import { useNavigate } from 'react-router-dom';

import styles from './LectureBlock.module.css';
import type { ClassTime, Lecture } from './utils/Types';

type Props = {
  timetableId: string;
  lecture: Lecture;
  classTime: ClassTime;
  index1: number;
  index2: number;
  lectureListLength: number;
};

const LectureBlock = ({
  timetableId,
  lecture,
  classTime,
  index1,
  index2,
  lectureListLength,
}: Props) => {
  const navigate = useNavigate();
  const start = classTime.startMinute - 60 * 9;
  const length = classTime.endMinute - classTime.startMinute;
  const day = classTime.day;

  const handleClick = () => {
    navigate(`/timetables/${timetableId}/lectures/${lecture._id}`, {
      state: { timetableId, lecture },
    });
  };

  return (
    <div
      className={styles.lectureBlock}
      key={index1 * lectureListLength + index2}
      onClick={handleClick}
      style={{
        top: `calc(68px + (${start} * (100% - 68px - 50px)) / 780)`,
        left: `calc(21px + ${day} * (100% - 22px) / 5)`,
        height: `calc((${length} * (100% - 68px - 50px)) / 780)`,
        cursor: 'pointer',
      }}
    >
      <div className={styles.lectureBlockText}>
        {lecture.course_title}
        <br />
        {classTime.place}
      </div>
    </div>
  );
};

export default LectureBlock;
