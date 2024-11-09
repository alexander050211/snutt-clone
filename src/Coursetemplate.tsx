// CourseTemplate.tsx
import styles from './CourseTemplate.module.css';

const CourseTemplate = () => {
  const timeLabels = Array.from({ length: 13 }, (_, i) => i + 9);
  const days = ['월', '화', '수', '목', '금'];

  return (
    <div className={styles.container}>
      {/* Time Labels Column */}
      <div className={styles.timeLabelsColumn}>
        {timeLabels.map((time) => (
          <div key={time} className={styles.timeLabel}>
            {time}
          </div>
        ))}
      </div>

      {/* Day Labels Row */}
      <div className={styles.daysHeader}>
        {days.map((day) => (
          <div key={day} className={styles.dayLabel}>
            {day}
          </div>
        ))}
      </div>

      {/* Horizontal Grid Lines */}
      <div className={styles.horizontalLines}>
        <div className={styles.primaryLine} />
        <div className={styles.secondaryLine} />
        <div className={styles.primaryLine} />
        <div className={styles.secondaryLine} />
        <div className={styles.primaryLine} />
        <div className={styles.secondaryLine} />
        <div className={styles.primaryLine} />
        <div className={styles.secondaryLine} />
        <div className={styles.primaryLine} />
        <div className={styles.secondaryLine} />
        <div className={styles.primaryLine} />
        <div className={styles.secondaryLine} />
        <div className={styles.primaryLine} />
        <div className={styles.secondaryLine} />
        <div className={styles.primaryLine} />
        <div className={styles.secondaryLine} />
        <div className={styles.primaryLine} />
        <div className={styles.secondaryLine} />
        <div className={styles.primaryLine} />
        <div className={styles.secondaryLine} />
        <div className={styles.primaryLine} />
        <div className={styles.secondaryLine} />
        <div className={styles.primaryLine} />
        <div className={styles.secondaryLine} />
        <div className={styles.primaryLine} />
        <div className={styles.secondaryLine} />
        <div className={styles.primaryLine} />
      </div>

      {/* Vertical Grid Lines */}
      <div className={styles.verticalLines}>
        {days.map((day) => (
          <div key={day} className={styles.verticalLine} />
        ))}
        <div className={styles.verticalLine} />
      </div>
    </div>
  );
};

export default CourseTemplate;
