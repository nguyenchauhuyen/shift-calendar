import React from 'react';
import ShiftItem from './ShiftItem';
const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

const ShiftCalendar = ({ shifts }) => {
  const getHeight = shiftDetail => {
    const timeStart = shiftDetail.timeStart.split(':');
    const timeEnd = shiftDetail.timeEnd.split(':');

    let d1 = new Date(0, 0, 0, timeStart[0], timeStart[1]);
    let d2 = new Date(0, 0, 0, timeEnd[0], timeEnd[1]);
    let diff = d2.getTime() - d1.getTime();

    var hours = diff / (1000 * 60 * 60);
    return hours * 51;
  };

  const getTop = shiftDetail => {
    const timeStart = shiftDetail.timeStart.split(':');

    const d1 = new Date(0, 0, 0, 0, 0);
    const d2 = new Date(0, 0, 0, timeStart[0], timeStart[1]);
    var diff = d2.getTime() - d1.getTime();
    var hours = diff / (1000 * 60 * 60);
    return hours * 51;
  };

  return (
    <ul className="activity-list">
      {hours.map((hour, index) => {
        return <li key={index}>{`${('0' + hour).slice(-2)}:00`}</li>;
      })}
      {shifts.map(shift => {
        const height = getHeight(shift);
        const top = getTop(shift);
        return <ShiftItem key={shift.id} shift={shift} height={height} top={top} />;
      })}
    </ul>
  );
};

export default ShiftCalendar;
