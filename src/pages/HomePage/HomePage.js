import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Panel } from 'primereact/panel';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { fetchShiftByDate } from '../../actions/shiftActions';
import ShiftCalendar from './ShiftCalendar';

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const list = useSelector(store => store.shift.list);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      setLoading(true);
      dispatch(fetchShiftByDate(selectedDate)).then(res => setLoading(false));
    }
  }, [selectedDate]);

  return (
    <div className="p-grid p-fluid dashboard">
      <div className="p-col-12 p-fluid">
        <Panel header="Shifts">
          <div className="p-grid">
            <div className="p-col-12 p-md-4">
              <Calendar
                placeholder="Select Date"
                value={selectedDate}
                onChange={event => setSelectedDate(event.value)}
              ></Calendar>
            </div>
            <div className="p-col-12 p-md-6">
              {loading && (
                <ProgressSpinner
                  style={{ width: '40px', height: '40px' }}
                  strokeWidth="8"
                  fill="#EEEEEE"
                  animationDuration=".5s"
                />
              )}
            </div>
            <div className="p-col-12 p-md-2">
              <Button label="Add New Shift" icon="pi pi-plus" onClick={() => history.push('/shift/add')} />
            </div>
            <div className="p-col-12">{!loading && <ShiftCalendar shifts={list}/>}</div>
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default Dashboard;
