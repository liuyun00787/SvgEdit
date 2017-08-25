'use strict';

module.exports = app => {
  return function* () {
    const data = this.args[0];
    console.log('drawChange----');
    const tdata = JSON.parse(data) || {};
    if (!tdata._EVENT_) {
      this.socket.emit(tdata._EVENT_, JSON.stringify({ code: 200, data: tdata.data }));
    };
    this.socket.broadcast.emit('drawChangeReply', JSON.stringify({ code: 200, data: tdata.data }));
    const drawList = yield app.redis.get('draw') || '';
    const ArrayList = JSON.parse(drawList) || [];
    console.log(tdata.data);
    const index = ArrayList.findIndex(item => item.__ID__ === tdata.data.item.__ID__ );
    if (index === -1) {
      ArrayList.push(tdata.data.item);
    } else {
      ArrayList[index] = tdata.data.item;
    }
    // yield app.redis.set('draw', JSON.stringify(ArrayList));
  };
};
