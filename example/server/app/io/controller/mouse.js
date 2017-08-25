'use strict';

module.exports = app => {
  return function* () {
    const data = this.args[0];
    console.log('mouseGlobalChange----');
    const tdata = JSON.parse(data) || {};
    if (!tdata._EVENT_) {
      this.socket.emit(tdata._EVENT_, JSON.stringify({ code: 200, data: tdata.data }));
    };
    this.socket.broadcast.emit('mouseGlobalChangeReply', JSON.stringify({ code: 200, data: tdata.data }));
    // yield app.redis.set('mouse', JSON.stringify(tdata.data));
  };
};
