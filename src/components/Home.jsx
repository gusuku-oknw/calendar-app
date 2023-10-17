import React, { useState, useEffect } from 'react';

const ScheduleCalendar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const [selectedLecture, setSelectedLecture] = useState(null);

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handle = (mm) => {
      setIsMobile(mm.matches);
    };

    handle(mediaQuery);
    mediaQuery.addListener(handle);

    return () => {
      mediaQuery.removeListener(handle);
    };
  }, []);

  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
  };

  const handleCloseDetail = () => {
    setSelectedLecture(null);
  };

  const styles = {
    scheduleCalendar: {
      textAlign: 'center',
    },
    tableContainer: {
      overflowX: 'auto',
      margin: '0 auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    cell: {
      border: '1px solid #ccc',
      padding: isMobile ? '5px' : '10px',
      minWidth: '50px',
      fontSize: isMobile ? '12px' : 'initial',
    },
    th: {
      backgroundColor: '#f0f0f0',
    },
    lectureCell: {
      backgroundColor: '#FF1493',
    },
    emptyCell: {
      backgroundColor: '#f0f0f0',
      color: '#ccc',
    },
    timeCell: {
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.scheduleCalendar}>
      {/* カレンダーコンテンツとその他のコンポーネントをこちらに追加します */}
    </div>
  );
};

export default ScheduleCalendar;
