import * as Types from '../constants/ActionTypes';
import { callApi } from '../utils/apiCaller';
import moment from 'moment';

export const fetchShiftByDate = date => {
  return async dispatch => {
    try {
      let dateString = moment(date).format('YYYY-MM-DD');
      const res = await callApi(`shifts?date=${dateString}`, 'GET');
      dispatch({
        type: Types.FETCH_SHIFTS,
        payload: res.data,
      });
    } catch (e) {
    }
  };
};

export const deleteShift = id => {
  return dispatch => {
    return callApi(`shifts/${id}`, 'DELETE', null).then(() => {
      dispatch({
        type: Types.DELETE_SHIFT,
        payload: { id },
      });
    });
  };
};

export const saveShift = product => {
  return async dispatch => {
    try {
      let res;
      if (product.id) {
        res = await callApi(`shifts/${product.id}`, 'PUT', product);
        dispatch({
          type: Types.UPDATE_SHIFT,
          payload: res.data,
        });
      } else {
        res = await callApi('shifts', 'POST', product);
        dispatch({
          type: Types.ADD_SHIFT,
          payload: res.data,
        });
      }
    } catch (e) {
    }
  };
};

export const getShiftDetail = id => {
  return dispatch => {
    if(id) {
      return callApi(`shifts/${id}`, 'GET', null).then(res => {
        dispatch({
          type: Types.FETCH_SHIFT_DETAIL,
          payload: res.data,
        });
      });
    } else {
      dispatch({
        type: Types.FETCH_SHIFT_DETAIL,
        payload: {},
      });
    }
    
  };
};
