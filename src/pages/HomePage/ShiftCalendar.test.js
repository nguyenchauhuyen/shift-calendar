import React from 'react';
import configureStore from 'redux-mock-store';
// import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import ShiftCalendar from './ShiftCalendar';
import ShiftItem from './ShiftItem';
const mockStore = configureStore([]);

describe('Shift Calendar', () => {
  let wrapper;

  describe('on start', () => {
    beforeEach(() => {
      const list = [
        {
          _id: '605851c122209f26322b59a6',
          name: 'Morning Shift',
          date: '2021-03-31',
          timeStart: '01:00:00.000',
          timeEnd: '03:39:00.000',
          createdAt: '2021-03-22T08:13:53.660Z',
          updatedAt: '2021-03-23T09:48:07.397Z',
          __v: 0,
          id: '605851c122209f26322b59a6',
        },
        {
          _id: '6058524622209f26322b59a7',
          name: 'Afternoon Shift',
          date: '2021-03-31',
          timeStart: '13:00:00.000',
          timeEnd: '17:00:00.000',
          createdAt: '2021-03-22T08:16:06.805Z',
          updatedAt: '2021-03-22T08:16:06.878Z',
          __v: 0,
          id: '6058524622209f26322b59a7',
        },
        {
          _id: '605853da22209f26322b59a8',
          name: 'Night Shift',
          date: '2021-03-31',
          timeStart: '18:00:00.000',
          timeEnd: '22:00:00.000',
          createdAt: '2021-03-22T08:22:50.959Z',
          updatedAt: '2021-03-22T08:22:51.061Z',
          __v: 0,
          id: '605853da22209f26322b59a8',
        },
        {
          _id: '6058bd8512ef723e5c948ae9',
          name: 'Morning shift 2',
          date: '2021-03-31',
          timeStart: '04:30:00.000',
          timeEnd: '08:30:00.000',
          createdAt: '2021-03-22T15:53:41.159Z',
          updatedAt: '2021-03-22T15:53:41.261Z',
          __v: 0,
          id: '6058bd8512ef723e5c948ae9',
        },
      ];

      wrapper = shallow(<ShiftCalendar shifts={list} />);
    });

    it('should render 4 <ShiftItem />', () => {
      expect(wrapper.find(ShiftItem)).toHaveLength(4);
    });
  });
});
