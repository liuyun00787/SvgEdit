import 'imports?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg-min.js';
import videojs from 'imports?this=>window,fix=>module.exports=0!video.js/dist/video.min.js';
// import 'video.js/dist/video-js.min.css';
// import '../node_modules/video.js/dist/video-js.min.css';
import B from './libs/Broadcaster/index';
import V from './libs/Viewer/index';

export const Broadcaster = B(videojs);
export const Viewer = V(videojs);
