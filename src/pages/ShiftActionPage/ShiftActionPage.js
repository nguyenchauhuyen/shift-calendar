import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getShiftDetail, saveShift } from '../../actions/shiftActions';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useFormik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';

const ShiftActionPage = props => {
  const itemEditing = useSelector(store => store.shift.itemEditing);
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const msgs1 = useRef(null);
  useEffect(() => {
    dispatch(getShiftDetail(id));
  }, []);

  const handleSubmit = (values, actions) => {
    const start = values.timeStart.getTime();
    const end = values.timeEnd.getTime();

    if (start < end) {
      const payload = {
        id: itemEditing.id,
        name: values.name,
        date: moment(values.date).format('YYYY-MM-DD'),
        timeStart: moment(values.timeStart).format('HH:mm:00.000'),
        timeEnd: moment(values.timeEnd).format('HH:mm:00.000'),
      };

      dispatch(saveShift(payload)).then(
        res => {
          actions.setSubmitting(false);
          history.push('/');
        },
        res => {
          actions.setSubmitting(false);
          msgs1.current.show([{ severity: 'error', detail: res.message, sticky: true }]);
        },
      );
    } else {
      msgs1.current.show([{ severity: 'error', detail: 'Start Time must be before End Time', sticky: true }]);
      actions.setSubmitting(false);
    }
  };

  const timeStart = itemEditing.timeStart ? itemEditing.timeStart.split(':') : ['00', '00'];
  const timeEnd = itemEditing.timeEnd ? itemEditing.timeEnd.split(':') : ['00', '00'];
  const formik = useFormik({
    initialValues: {
      name: itemEditing.name || '',
      date: itemEditing.date ? new Date(moment(itemEditing.date).format('MM/DD/YYYY')) : '',
      timeStart: new Date(0, 0, 0, timeStart[0], timeStart[1]),
      timeEnd: new Date(0, 0, 0, timeEnd[0], timeEnd[1]),
    },
    validationSchema: validateSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <div className="p-fluid">
      <div className="p-grid">
        <div className="p-col-12">
          <Messages ref={msgs1} />
          <div className="card card-w-title">
            <h1>
              {!id && 'Add New Shift'}
              {id && 'Edit Shift'}
            </h1>
            <form>
              <div className="p-grid">
                <div className="p-col-12 p-md-2">
                  <label htmlFor="input">Shift Name</label>
                </div>
                <div className="p-col-12 p-md-4">
                  <InputText
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.errors.name && formik.touched.name && <small className="p-invalid">Name is required.</small>}
                </div>
                <div className="p-col-12 p-md-2">
                  <label htmlFor="textarea">Date</label>
                </div>
                <div className="p-col-12 p-md-4">
                  <Calendar
                    name="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></Calendar>
                  {formik.errors.date && formik.touched.date && <small className="p-invalid">Date is required.</small>}
                </div>
                <div className="p-col-12 p-md-2">
                  <label htmlFor="calendar">Time Start</label>
                </div>
                <div className="p-col-12 p-md-4">
                  <Calendar
                    name="timeStart"
                    placeholder="Time"
                    timeOnly={true}
                    showTime={true}
                    value={formik.values.timeStart}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.timeStart && formik.touched.timeStart && (
                    <small className="p-invalid">Time Start is required.</small>
                  )}
                </div>

                <div className="p-col-12 p-md-2">
                  <label htmlFor="dropdown">Time End</label>
                </div>
                <div className="p-col-12 p-md-4">
                  <Calendar
                    name="timeEnd"
                    placeholder="Time"
                    timeOnly={true}
                    showTime={true}
                    value={formik.values.timeEnd}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.timeEnd && formik.touched.timeEnd && (
                    <small className="p-invalid">Time End is required.</small>
                  )}
                  {formik.errors.timeStartBeForeTimeEnd && (
                    <small className="p-invalid">Time Start must be before Time End.</small>
                  )}
                </div>

                <div className="p-col-12 p-md-10" />
                <div className="p-col-12 p-md-2" style={{ textAlign: 'right' }}>
                  {formik.isSubmitting && (
                    <ProgressSpinner
                      style={{ width: '40px', height: '40px' }}
                      strokeWidth="8"
                      fill="#EEEEEE"
                      animationDuration=".5s"
                    />
                  )}
                  {!formik.isSubmitting && (
                    <Button type="submit" label="Save" icon="pi pi-check" onClick={formik.handleSubmit} />
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const validateSchema = yup.object({
  name: yup.string().required().min(5),
  date: yup.date().required(),
  timeStart: yup.date().required(),
  timeEnd: yup.date().required(),
});

export default ShiftActionPage;
