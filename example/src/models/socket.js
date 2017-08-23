import IO from 'socket.io-client';
import _ from 'lodash';
import { socketUrl } from '../utils/config';

let __dispatch__;
let socket = { emit() {}, on() {} };

export default {
  namespace: 'socket',
  state: {
    fetching: true,
    mouseInfo: {},
    drawItems: [],
    drawI: false,
    selectItem: undefined,
    wBToolsInfo: {},
  },
  reducers: {
    initState(state, { mouse, wbTools, drawList }) {
      return { ...state, fetching: false, drawItems: JSON.parse(drawList) || [], wBToolsInfo: JSON.parse(wbTools) || {}, mouseInfo: JSON.parse(mouse) || {},  }
    },
    setWbTools(state, { wBToolsInfo }) {
      return { ...state, wBToolsInfo: { ...state.wBToolsInfo, ...wBToolsInfo } };
    },
    setMouse(state, { mouseInfo }) {
      return { ...state, mouseInfo: { ...state.mouseInfo, ...mouseInfo } };
    },
    setDrawItems(state, { isDelete = false, drawItem = {}, deleteAll = false }) {
      if (isDelete) {
        if (deleteAll) {
          return {...state, drawItems: [] };
        } else {
          const index = _.findIndex(state.drawItems, _.matchesProperty('__ID__', drawItem.__ID__));
          if (index === -1) {
          } else {
            state.drawItems.splice(index, 1);
          }
        }
      } else {
        const index = _.findIndex(state.drawItems, _.matchesProperty('__ID__', drawItem.__ID__));
        if (index === -1) {
          state.drawItems.push(drawItem);
        } else {
          state.drawItems[index] = drawItem;
        }
      }
      return { ...state, drawItems: state.drawItems, selectItem: drawItem };
    },
  },
  effects: {
    *init() {
      socket = IO(socketUrl);
      socket.on('connect', () => {
        console.log('connect!');
      });
      socket.on('initReply', (res) => {
        const { data: { mouse, wbTools, drawList  } } = JSON.parse(res);
        __dispatch__({ type: 'initState', mouse, wbTools, drawList });
      });
      socket.on('wbToolsChangeReply', (res) => {
        const { data } = JSON.parse(res);
        __dispatch__({ type: 'setWbTools', wBToolsInfo: data });
      });
      socket.on('mouseGlobalChangeReply', (res) => {
        const { data } = JSON.parse(res);
        __dispatch__({ type: 'setMouse', mouseInfo: data });
      });
      socket.on('drawChangeReply', (res) => {
        const { data } = JSON.parse(res);
        __dispatch__({ type: 'setDrawItems', drawItem: data.item, clear: data.clear });
      });
      socket.on('deleteChangeReply', (res) => {
        const { data } = JSON.parse(res);
        __dispatch__({ type: 'setDrawItems', isDelete: true, drawItem: data.item, deleteAll: data.deleteAll });
      });

      socket.emit('init', JSON.stringify({ _EVENT_: 'initReply' }));
      window.IO = socket;
    },
    *wbToolsChange({ wBToolsInfo }, { put }) {
      try {
        yield put({ type: 'setWbTools', wBToolsInfo });
        socket.emit('wbToolsChange', JSON.stringify({ data: wBToolsInfo }));
      } catch (e) {
        console.log(e)
      }
    },
    *mouseMove({ mouseInfo }, { put }) {
      try {
        yield put({ type: 'setMouse', mouseInfo });
        socket.emit('mouseGlobalChange', JSON.stringify({ data: mouseInfo }));
      } catch (e) {
        console.log(e)
      }
    },
    *drawChange({ drawItem, clear }, { put }) {
      try {
        yield put({ type: 'setDrawItems', drawItem, clear });
        if (clear) {
          socket.emit('drawChange', JSON.stringify({ data: { clear } }));
        } else {
          const req = drawItem;
          socket.emit('drawChange', JSON.stringify({ data: { item: req, clear } }));
        }
      } catch (e) {
        console.log(e);
      }
    },
    *deleteChange({ item }, { put }) {
      try {
        yield put({ type: 'setDrawItems', isDelete: true, drawItem: item, deleteAll: item ? false : true });
        socket.emit('deleteChange', JSON.stringify({ data: { item, deleteAll: item ? false : true } }));
      } catch (e) {
        console.log(e);
      }
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      __dispatch__ = dispatch;
      // dispatch({ type: 'init' });
    },
  },
};
