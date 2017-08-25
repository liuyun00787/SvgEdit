
module.exports = app => {
  return function* () {
    const data = this.args[0];
    console.log('wbToolsChange----');
    const tdata = JSON.parse(data) || {};
    if (!tdata._EVENT_) {
      this.socket.emit(tdata._EVENT_, JSON.stringify({ code: 200, data: tdata.data }));
    };
    this.socket.broadcast.emit('wbToolsChangeReply', JSON.stringify({ code: 200, data: tdata.data }));
    // yield app.redis.set('wbTools', JSON.stringify(tdata.data));
  };
};
