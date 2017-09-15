import classNames from 'classnames';

export default ({ role = 'Broadcaster', attr = {}, target }) => {
	const VideoPlay = Snap.parse(`
	    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="568px" height="359px">
		    <defs>
			    <filter id="Filter_0">
				    <feFlood flood-color="rgb(51, 51, 51)" flood-opacity="1" result="floodOut"></feFlood>
				    <feComposite operator="atop" in="floodOut" in2="SourceGraphic" result="compOut"></feComposite>
				    <feBlend mode="normal" in="compOut" in2="SourceGraphic"></feBlend>
			    </filter>
			    <filter id="Filter_1">
				    <feFlood flood-color="rgb(51, 51, 51)" flood-opacity="1" result="floodOut"></feFlood>
				    <feComposite operator="atop" in="floodOut" in2="SourceGraphic" result="compOut"></feComposite>
				    <feBlend mode="normal" in="compOut" in2="SourceGraphic"></feBlend>
			    </filter>
			    <filter filterUnits="userSpaceOnUse" id="Filter_2" x="17px" y="331px" width="16px" height="17px">
				    <feOffset in="SourceAlpha" dx="0.5" dy="0.866"></feOffset>
				    <feGaussianBlur result="blurOut" stdDeviation="1"></feGaussianBlur>
				    <feFlood flood-color="rgb(255, 255, 255)" result="floodOut"></feFlood>
				    <feComposite operator="atop" in="floodOut" in2="blurOut"></feComposite>
				    <feComponentTransfer><feFuncA type="linear" slope="0.5"></feFuncA></feComponentTransfer>
				    <feMerge>
					    <feMergeNode></feMergeNode>
					    <feMergeNode in="SourceGraphic"></feMergeNode>
				    </feMerge>
			    </filter>
			    <filter id="Filter_3">
				    <feOffset in="SourceAlpha" dx="0.5" dy="0.866"></feOffset>
				    <feGaussianBlur result="blurOut" stdDeviation="1"></feGaussianBlur>
				    <feFlood flood-color="rgb(0, 0, 0)" result="floodOut"></feFlood>
				    <feComposite operator="out" in="floodOut" in2="blurOut" result="compOut"></feComposite>
				    <feComposite operator="in" in="compOut" in2="SourceAlpha"></feComposite>
				    <feComponentTransfer><feFuncA type="linear" slope="0.75"></feFuncA></feComponentTransfer>
				    <feBlend mode="normal" in2="SourceGraphic"></feBlend>
			    </filter>
			    <filter id="Filter_4">
				    <feFlood flood-color="rgb(102, 102, 102)" flood-opacity="1" result="floodOut"></feFlood>
				    <feComposite operator="atop" in="floodOut" in2="SourceGraphic" result="compOut"></feComposite>
				    <feBlend mode="normal" in="compOut" in2="SourceGraphic"></feBlend>
			    </filter>
			    <filter filterUnits="userSpaceOnUse" id="Filter_5" x="54px" y="332px" width="280px" height="12px">
				    <feOffset in="SourceAlpha" dx="0" dy="1"></feOffset>
				    <feGaussianBlur result="blurOut" stdDeviation="0"></feGaussianBlur>
				    <feFlood flood-color="rgb(255, 255, 255)" result="floodOut"></feFlood>
				    <feComposite operator="atop" in="floodOut" in2="blurOut"></feComposite>
				    <feComponentTransfer><feFuncA type="linear" slope="1"></feFuncA></feComponentTransfer>
				    <feMerge>
					    <feMergeNode></feMergeNode>
					    <feMergeNode in="SourceGraphic"></feMergeNode>
				    </feMerge>
			    </filter>
			    <linearGradient id="PSgrad_0" x1="0%" x2="0%" y1="100%" y2="0%">
				    <stop offset="0%" stop-color="rgb(150,5,5)" stop-opacity="1"></stop>
				    <stop offset="100%" stop-color="rgb(210,15,10)" stop-opacity="1"></stop>
			    </linearGradient>
			    <linearGradient id="PSgrad_1" x1="0%" x2="0%" y1="100%" y2="0%">
				    <stop offset="0%" stop-color="rgb(209,209,209)" stop-opacity="1"></stop>
				    <stop offset="100%" stop-color="rgb(242,240,241)" stop-opacity="1"></stop>
			    </linearGradient>
			    <linearGradient id="PSgrad_2" x1="0%" x2="0%" y1="100%" y2="0%">
				    <stop offset="0%" stop-color="rgb(242,240,241)" stop-opacity="1"></stop>
				    <stop offset="100%" stop-color="rgb(209,209,209)" stop-opacity="1"></stop>
			    </linearGradient>
			    <filter filterUnits="userSpaceOnUse" id="Filter_6" x="342px" y="333px" width="58px" height="14px">
				    <feOffset in="SourceAlpha" dx="0.5" dy="0.866"></feOffset>
				    <feGaussianBlur result="blurOut" stdDeviation="1"></feGaussianBlur>
				    <feFlood flood-color="rgb(255, 255, 255)" result="floodOut"></feFlood>
				    <feComposite operator="atop" in="floodOut" in2="blurOut"></feComposite>
				    <feComponentTransfer><feFuncA type="linear" slope="0.5"></feFuncA></feComponentTransfer>
				    <feMerge>
					    <feMergeNode></feMergeNode>
					    <feMergeNode in="SourceGraphic"></feMergeNode>
				    </feMerge>
			    </filter>
			    <filter id="Filter_7">
				    <feOffset in="SourceAlpha" dx="0.5" dy="0.866"></feOffset>
				    <feGaussianBlur result="blurOut" stdDeviation="1"></feGaussianBlur>
				    <feFlood flood-color="rgb(0, 0, 0)" result="floodOut"></feFlood>
				    <feComposite operator="out" in="floodOut" in2="blurOut" result="compOut"></feComposite>
				    <feComposite operator="in" in="compOut" in2="SourceAlpha"></feComposite>
				    <feComponentTransfer><feFuncA type="linear" slope="0.75"></feFuncA></feComponentTransfer>
				    <feBlend mode="normal" in2="SourceGraphic"></feBlend>
			    </filter>
			    <filter id="Filter_8">
				    <feFlood flood-color="rgb(102, 102, 102)" flood-opacity="1" result="floodOut"></feFlood>
				    <feComposite operator="atop" in="floodOut" in2="SourceGraphic" result="compOut"></feComposite>
				    <feBlend mode="normal" in="compOut" in2="SourceGraphic"></feBlend>
			    </filter>
			    <filter filterUnits="userSpaceOnUse" id="Filter_9" x="417px" y="331px" width="21px" height="17px">
				    <feOffset in="SourceAlpha" dx="0.5" dy="0.866"></feOffset>
				    <feGaussianBlur result="blurOut" stdDeviation="1"></feGaussianBlur>
				    <feFlood flood-color="rgb(255, 255, 255)" result="floodOut"></feFlood>
				    <feComposite operator="atop" in="floodOut" in2="blurOut"></feComposite>
				    <feComponentTransfer><feFuncA type="linear" slope="0.5"></feFuncA></feComponentTransfer>
				    <feMerge>
					    <feMergeNode></feMergeNode>
					    <feMergeNode in="SourceGraphic"></feMergeNode>
				    </feMerge>
			    </filter>
			    <filter id="Filter_10">
				    <feOffset in="SourceAlpha" dx="0.5" dy="0.866"></feOffset>
				    <feGaussianBlur result="blurOut" stdDeviation="1"></feGaussianBlur>
				    <feFlood flood-color="rgb(0, 0, 0)" result="floodOut"></feFlood>
				    <feComposite operator="out" in="floodOut" in2="blurOut" result="compOut"></feComposite>
				    <feComposite operator="in" in="compOut" in2="SourceAlpha"></feComposite>
				    <feComponentTransfer><feFuncA type="linear" slope="0.75"></feFuncA></feComponentTransfer>
				    <feBlend mode="normal" in2="SourceGraphic"></feBlend>
			    </filter>
			    <filter id="Filter_11">
				    <feFlood flood-color="rgb(102, 102, 102)" flood-opacity="1" result="floodOut"></feFlood>
				    <feComposite operator="atop" in="floodOut" in2="SourceGraphic" result="compOut"></feComposite>
				    <feBlend mode="normal" in="compOut" in2="SourceGraphic"></feBlend>
			    </filter>
			    <filter filterUnits="userSpaceOnUse" id="Filter_12" x="443px" y="332px" width="70px" height="12px">
				    <feOffset in="SourceAlpha" dx="0" dy="1"></feOffset>
				    <feGaussianBlur result="blurOut" stdDeviation="0"></feGaussianBlur>
				    <feFlood flood-color="rgb(255, 255, 255)" result="floodOut"></feFlood>
				    <feComposite operator="atop" in="floodOut" in2="blurOut"></feComposite>
				    <feComponentTransfer><feFuncA type="linear" slope="1"></feFuncA></feComponentTransfer>
				    <feMerge>
					    <feMergeNode></feMergeNode>
					    <feMergeNode in="SourceGraphic"></feMergeNode>
				    </feMerge>
			    </filter>
		    </defs>
		    <image x="1px" y="317px" width="566px" height="41px" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjAAAAAjCAMAAAC98sBBAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAtFBMVEX+/v7x8PH9/f3x7/D8/Pzw7u/7+/v6+vrv7e75+fnu7O34+Pjt6+z39/fs6uv29vbr6er09PTq6Onz8/Pp5+jy8vLo5ufw8PDn5ebv7+/m5OXu7u7k4+Ts7Ozj4uPr6+vi4eLp6enh4ODo6Ojg39/m5ubf3t7l5eXd3d3k5OTc3Nzi4uLb29vh4eHa2drg4ODZ2Nne3t7Y2NjX19fW1tbV1dXa2trU1NTZ2dnT09PS0tL///8Tv0kZAAAAAWJLR0Q7OQ70bAAAAAd0SU1FB+EJDxE4KHtxzeYAAADLSURBVHja7dZZdsEAAEbhnypVNVPUPEfElKiq/S/MFn5POTnnfiu4j1cCXpIDbFL+DbDlVXgHbAUV005AlhRV+gBsJZU/AVtZlS/AVlG1BtiqqjcAW13NFmBrqt0BbG11vwFbV70+YOtp8APYBhqOANtQ4wlgG2s6A2xTzReAba7lCrAttd4AtrW2AWDbahcCtp32EWDb63AEbAedzoDtpEsM2C4KEsAWKLwCtlDRL2CLdPsDbDfd/wHbXXHaCciSWMkDsCVKe7uRLU8nPUnMkEIIXQAAAABJRU5ErkJggg=="></image>
		    <g filter="url(#Filter_2)">
			    <g filter="url(#Filter_3)">
				    <g filter="url(#Filter_4)">
					    <path fill-rule="evenodd" fill="rgb(0, 0, 0)" d="M17.894,331.768 L17.894,344.169 L29.861,337.941 L17.894,331.768 Z"></path>
				    </g></g></g>
		    <image x="43px" y="322px" width="482px" height="31px" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeIAAAAfCAQAAACRmwZbAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfhCQ8ROCh7cc3mAAABsUlEQVR42u3cYWpTQRSG4XeGk4ix/dEKBlsa6qq6RHEjrqONpSBRo1JppDTjJsY5MN/3bCDvkHPJufdCysdyAw0b4FN2gI6UqU75fssNlUrN+Gyz/0hnqiu1smCZ3WHWmc5UL1gEK+Apu8SsqxVFZKpXEJzR+JFdYtbVOY3v2RGjTlpZc5HdYdbZmnV2wriTBpvsCrPuLql8zo4Y4gqCa79gsul8kJnqDQQbSnaHWWc6++U1LbjKrjDr7jI7YJj31OCdzOJhOnQe1l5QgzOv0zad8+yAYd5CcOqL2KZzkh0wzCktOPE6bdN5w0t2wiCvOQZLX8Q2naXMfvkKgiJzXNNRZaa6UINjdoVZdyrLNBx5CQ7ZFWbd/ZW5jA+04E92hVl3jzLr9BMt+CXzHwim4zE7YJjfEOz9dNqm8y07YJgdNfiaXWHW3UN2wMCTlmArc/dgOu6zA4Z5oAVbv2Sy6dzJ3CTeQnCbXWHW3Z3MfrmFYOun0zade5lf4i8Q7LIrzLrbyVzEO1rwU2bxMB17maneQ3CQOa7p0JnqAwTPMsc1HTpT/UwJml8x2XR0prrR/gFVHVFdr5cT3gAAAABJRU5ErkJggg=="></image>
		    <g filter="url(#Filter_5)">
			    <path fill-rule="evenodd" fill="rgb(167, 167, 167)" d="M57.941,332.958 L330.997,332.958 C332.654,332.958 333.997,334.301 333.997,335.958 L333.997,339.912 C333.997,341.569 332.654,342.912 330.997,342.912 L57.941,342.912 C56.284,342.912 54.941,341.569 54.941,339.912 L54.941,335.958 C54.941,334.301 56.284,332.958 57.941,332.958 Z"></path>
		    </g>
		    <path fill-rule="evenodd" fill="rgb(102, 102, 102)" d="M57.941,332.958 L220.997,332.958 C222.654,332.958 223.997,334.301 223.997,335.958 L223.997,339.912 C223.997,341.569 222.654,342.912 220.997,342.912 L57.941,342.912 C56.284,342.912 54.941,341.569 54.941,339.912 L54.941,335.958 C54.941,334.301 56.284,332.958 57.941,332.958 Z"></path>
		    <path fill-rule="evenodd" fill="rgb(167, 167, 167)" d="M57.941,332.958 L170.997,332.958 C172.654,332.958 173.997,334.301 173.997,335.958 L173.997,339.912 C173.997,341.569 172.654,342.912 170.997,342.912 L57.941,342.912 C56.284,342.912 54.941,341.569 54.941,339.912 L54.941,335.958 C54.941,334.301 56.284,332.958 57.941,332.958 Z"></path>
		    <path fill="url(#PSgrad_0)" d="M57.941,332.958 L170.997,332.958 C172.654,332.958 173.997,334.301 173.997,335.958 L173.997,339.912 C173.997,341.569 172.654,342.912 170.997,342.912 L57.941,342.912 C56.284,342.912 54.941,341.569 54.941,339.912 L54.941,335.958 C54.941,334.301 56.284,332.958 57.941,332.958 Z"></path>
		    <path fill-rule="evenodd" fill="rgb(167, 167, 167)" d="M167.000,329.957 L181.000,329.957 C182.657,329.957 184.000,331.300 184.000,332.957 L184.000,342.986 C184.000,344.643 182.657,345.986 181.000,345.986 L167.000,345.986 C165.343,345.986 164.000,344.643 164.000,342.986 L164.000,332.957 C164.000,331.300 165.343,329.957 167.000,329.957 Z"></path>
		    <path fill="url(#PSgrad_1)" d="M167.000,329.957 L181.000,329.957 C182.657,329.957 184.000,331.300 184.000,332.957 L184.000,342.986 C184.000,344.643 182.657,345.986 181.000,345.986 L167.000,345.986 C165.343,345.986 164.000,344.643 164.000,342.986 L164.000,332.957 C164.000,331.300 165.343,329.957 167.000,329.957 Z"></path>
		    <path fill-rule="evenodd" fill="rgb(167, 167, 167)" d="M169.857,333.233 L178.143,333.233 C179.124,333.233 179.919,334.028 179.919,335.009 L179.919,340.945 C179.919,341.926 179.124,342.721 178.143,342.721 L169.857,342.721 C168.876,342.721 168.081,341.926 168.081,340.945 L168.081,335.009 C168.081,334.028 168.876,333.233 169.857,333.233 Z"></path>
		    <path stroke-width="1px" stroke="rgb(255, 255, 255)" fill="url(#PSgrad_2)" d="M169.857,333.233 L178.143,333.233 C179.124,333.233 179.919,334.028 179.919,335.009 L179.919,340.945 C179.919,341.926 179.124,342.721 178.143,342.721 L169.857,342.721 C168.876,342.721 168.081,341.926 168.081,340.945 L168.081,335.009 C168.081,334.028 168.876,333.233 169.857,333.233 Z"></path>
		    <g filter="url(#Filter_6)">
			    <g filter="url(#Filter_7)">
				    <g filter="url(#Filter_8)">
					    <text font-family="Tahoma" fill="rgb(0, 0, 0)" font-size="11px" x="342px" y="342px">4.25 / 7.12</text>
				    </g></g></g>
		    <g filter="url(#Filter_9)">
			    <g filter="url(#Filter_10)">
				    <g filter="url(#Filter_11)">
					    <path fill-rule="evenodd" fill="rgb(97, 66, 97)" d="M431.597,344.371 L430.861,343.431 C432.202,341.963 433.021,340.009 433.021,337.865 C433.021,335.717 432.200,333.760 430.855,332.292 L431.607,331.370 C433.135,333.096 434.060,335.371 434.060,337.865 C434.060,340.363 433.131,342.643 431.597,344.371 ZM429.099,342.591 L428.463,341.658 C429.450,340.696 430.064,339.352 430.064,337.864 C430.064,336.406 429.474,335.085 428.521,334.128 L429.163,333.205 C430.318,334.417 431.026,336.058 431.026,337.864 C431.026,339.704 430.291,341.372 429.099,342.591 ZM425.855,339.724 C426.434,339.308 426.998,338.629 426.998,337.862 C426.998,337.166 426.750,336.542 426.260,336.122 L426.773,335.077 C427.547,335.756 427.974,336.753 427.974,337.864 C427.974,338.960 427.560,339.945 426.803,340.623 L425.855,339.724 ZM424.476,342.031 L423.976,341.969 L422.008,340.500 C421.664,340.125 420.977,340.000 420.977,340.000 L418.976,340.000 C417.852,340.000 417.977,339.000 417.977,339.000 L417.977,336.031 C417.977,335.094 418.945,335.031 418.945,335.031 L421.070,335.031 C421.664,335.031 421.976,334.531 421.976,334.531 L423.976,333.062 L424.445,333.062 C424.977,333.062 425.008,333.562 425.008,333.562 L425.008,341.531 C425.008,342.031 424.476,342.031 424.476,342.031 Z"></path>
				    </g></g></g>
		    <g filter="url(#Filter_12)">
			    <path fill-rule="evenodd" fill="rgb(167, 167, 167)" d="M446.941,332.958 L509.997,332.958 C511.654,332.958 512.997,334.301 512.997,335.958 L512.997,339.912 C512.997,341.569 511.654,342.912 509.997,342.912 L446.941,342.912 C445.284,342.912 443.941,341.569 443.941,339.912 L443.941,335.958 C443.941,334.301 445.284,332.958 446.941,332.958 Z"></path>
		    </g>
		    <path fill-rule="evenodd" fill="rgb(102, 102, 102)" d="M504.754,333.896 L507.997,333.896 C509.654,333.896 510.997,335.239 510.997,336.896 L510.997,339.037 C510.997,340.694 509.654,342.037 507.997,342.037 L504.754,342.037 C503.097,342.037 501.754,340.694 501.754,339.037 L501.754,336.896 C501.754,335.239 503.097,333.896 504.754,333.896 Z"></path>
		    <path stroke-width="1px" stroke="rgb(255, 255, 255)" fill="url(#PSgrad_2)" d="M504.754,333.896 L507.997,333.896 C509.654,333.896 510.997,335.239 510.997,336.896 L510.997,339.037 C510.997,340.694 509.654,342.037 507.997,342.037 L504.754,342.037 C503.097,342.037 501.754,340.694 501.754,339.037 L501.754,336.896 C501.754,335.239 503.097,333.896 504.754,333.896 Z"></path>
		    <image x="538px" y="331px" width="17px" height="17px" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfhCQ8ROCh7cc3mAAAAtElEQVQoz82RsQrCQBBEX+QOlmuM2GxATEpLf8Eif26vpNFSK6+8zu3O4iBcQLB1ynnDLOw0+xzwTB0JY1Y/uy5wOyEoVgeeG4bxwoH7yoOQiDUGjPgGQZqsKLF/BXzFp45EixIdCcMCO9Z1w5FrIa7c9qzZ1gFFClnxQ/8QcH1+brCp44hWfsQKcQEGIokrsvhkKsR5xsub85extqCkJisHhMiDVDW0DCjGvclCi2DLBmb3A6+5RqxKJ3JvAAAAAElFTkSuQmCC"></image>
	    </svg>
	    `);
	const newPlay = target.group();
	const videoGroup = target.group();

	videoGroup.add(VideoPlay, newPlay);
  return {
    group: videoGroup,
    handleChange: ({ width, height }) => {
      const getBox = path.getBBox();
      path.attr({
        width: getBox.width += width,
        height: getBox.height += height,
      });
      onChange();
    },
  };
};
