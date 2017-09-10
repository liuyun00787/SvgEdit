import classNames from 'classnames';
import md5 from 'md5';
import Snap from 'imports?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';
import videojs from 'imports?this=>window,fix=>module.exports=0!video.js/dist/video.js';
import '../video.js/video-js.min.css';
import './assets/video.css';

export default ({ role = 'Broadcaster', attr = {}, target }) => {
  const group = target.group(attr);
  let videoWrapDom;
  let videoDom;
  const bg = target.rect(0, 0, 0, 0).attr({ class: 'whiteBoardBG', fill: '#000', fillOpacity: 0.5 }).attr({
    width: attr.width || 0,
    height: attr.height || 0,
  });
  const id = md5(`${new Date() + Math.random()}video`);
  const video = Snap.fragment(`
			<foreignObject className="bg"} width="${attr.width}" height="${attr.height}">
				<div id="${id}-wrpa" class="videoSVGBOX-wrap" style="width: ${attr.width}px; height: ${attr.height}px;">
					<video
				    id="${id}"
				    class="video-js videoSVGBOX"
				    controls
				    preload="auto"
				    poster="//vjs.zencdn.net/v/oceans.png"
				    data-setup='{}'>
					  <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
					  <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm" />
					  <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg" />
					  <p class="vjs-no-js">
					    To view this video please enable JavaScript, and consider upgrading to a
					    web browser that
					    <a href="http://videojs.com/html5-video-support/" target="_blank">
					      supports HTML5 video
					    </a>
					  </p>
				</video>
			</div>
		</foreignObject>`);
  group.add(bg, video);
  videoWrapDom = document.getElementById(`${id}-wrpa`);
  videoDom = document.getElementById(id);
  return {
    group,
    runVideo() {
	    try {
		    if (videoDom) {
		    	const options = {};
			    videojs(videoDom, options, function onPlayerReady() {
				    videojs.log('Your player is ready!');
				    // In this context, `this` is the player that was created by Video.js.
				    // this.play();
				    // How about an event listener?
				    this.on('ended', () => {
					    videojs.log('Awww...over so soon?!');
				    });
			    });
		    }
	    } catch (e) {
		    console.log(e);
	    }
    },
    handleSetWH: ({ width, height }) => {
    	console.log(video.select('.bg'));
      bg.attr({ width, height });
      if (videoWrapDom) {
	      videoWrapDom.style.width = `${width}px`;
	      videoWrapDom.style.height = `${height}px`;
      }
	    if (videoDom) {
		    // videoDom.style.width = `${width}px`;
		    // videoDom.style.height = `${height}px`;
		    if (document.getElementsByClassName('videoSVGBOX')) {
			    // document.getElementsByClassName('.videoSVGBOX').style.width = '100%';
		    }
	    }
    },
  };
};
