import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteShift } from '../../actions/shiftActions';
import { useHistory } from 'react-router';

const ShiftItem = ({ shift, height, top }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onDelete = id => {
    if (confirm('Are you sure you want to delete this item ?')) {
      dispatch(deleteShift(id));
    }
  };

  return (
    <div className="shift-item" style={{ height, top }}>
      <div className="shift-name">{shift.name}</div>
      <div className="shift-date">{shift.date}</div>
      <div className="shift-time">
        {shift.timeStart.slice(0, 5)}-{shift.timeEnd.slice(0, 5)}
      </div>
      <div style={{ position: 'absolute', bottom: 5, right: 5 }}>
        <a>
          <i
            className="pi pi-pencil"
            onClick={() => history.push(`/shift/edit/${shift.id}`)}
            style={{ marginRight: 15 }}
          />
        </a>
        <a>
          <i className="pi pi-trash" onClick={() => onDelete(shift.id)} />
        </a>
      </div>
    </div>
  );
};

export default ShiftItem;
