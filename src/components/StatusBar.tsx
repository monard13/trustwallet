import React, { useState, useEffect } from 'react';

export const StatusBar: React.FC = () => {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTimeString(`${hours}:${minutes}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000); // Update every second for accuracy
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.statusBar}>
      <span style={styles.timeText}>{timeString || '16:24'}</span>
      <div style={styles.statusIcons}>
        <span style={{ fontSize: 10 }}>📶</span>
        <span style={{ fontSize: 10 }}>📡</span>
        <span style={styles.batteryPill}>100</span>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  statusBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px 4px',
    color: '#FFFFFF',
    userSelect: 'none',
  },
  timeText: {
    fontWeight: '600',
    fontSize: '14px',
  },
  statusIcons: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  batteryPill: {
    backgroundColor: '#3A3A3C',
    borderRadius: '4px',
    padding: '1px 5px',
    fontSize: '10px',
    fontWeight: 'bold',
  },
};
