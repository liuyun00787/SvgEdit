'use strict';

module.exports = app => {
  return function* () {
    const data = this.args[0];
    console.log('deleteChange----');
    const tdata = JSON.parse(data) || {};
    if (!tdata._EVENT_) {
      this.socket.emit(tdata._EVENT_, JSON.stringify({ code: 200, data: tdata.data }));
    };
    this.socket.broadcast.emit('deleteChangeReply', JSON.stringify({ code: 200, data: tdata.data }));
    const drawList = yield app.redis.get('draw') || '';
    let ArrayList = JSON.parse(drawList) || [];
    if (!tdata.data.deleteAll) {
      const index = ArrayList.findIndex(item => item.__ID__ === tdata.data.item.__ID__ );
      if (index !== -1) {
        ArrayList.splice(index, 1);
      }
    } else {
      ArrayList = [];
    }
    // yield app.redis.set('draw', JSON.stringify(ArrayList));
  };
};
