let config = {
  socketUrl: '/',
  apiUrl: '/api/v1/',
};

switch (__ENV__) {
  case 'production':  // 线上环境
    config = {
      socketUrl: '/',
      apiUrl: '/api/v1/',
    };
    break;
  case 'develop':  // 本地开发环境
    config = {
      socketUrl: '//localhost:8080',
      // socketUrl: '//192.168.102.144:8080',
      apiUrl: '/api/v1/',
    };
    break;
  default:
    config = {
      socketUrl: '/',
      apiUrl: '/api/v1/',
    };
    break;
}
export default config;
