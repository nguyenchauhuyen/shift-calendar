import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import ShiftItem from './ShiftItem';
const mockStore = configureStore([]);

describe('ShiftItem', () => {
  let wrapper;

  describe('on start', () => {
    beforeEach(() => {
      let store = mockStore({
        shift: { list: [], itemEdting: {} },
      });
      const originalDispatch = store.dispatch;
      store.dispatch = jest.fn(originalDispatch);

      const shiftDetail = {
        _id: '605851c122209f26322b59a6',
        name: 'Morning Shift',
        date: '2021-03-31',
        timeStart: '01:00:00.000',
        timeEnd: '03:39:00.000',
        createdAt: '2021-03-22T08:13:53.660Z',
        updatedAt: '2021-03-23T09:48:07.397Z',
        __v: 0,
        id: '605851c122209f26322b59a6',
      };

      wrapper = mount(
        <Provider store={store}>
          <ShiftItem shift={shiftDetail} />
        </Provider>,
      );
    });

    it('should render Shift name correctly', () => {
      expect(wrapper.find('.shift-name').text()).toEqual('Morning Shift');
    });

    it('should render Shift date  correctly', () => {
      expect(wrapper.find('.shift-date').text()).toEqual('2021-03-31');
    });

    it('should render Shift time correctly', () => {
      expect(wrapper.find('.shift-time').text()).toEqual('01:00-03:39');
    });
  });
});
