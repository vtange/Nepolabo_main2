var ytplayer, ytplayer2;
function onYouTubeIframeAPIReady() {
    if (document.getElementById("ytplayer")) {
        ytplayer = new YT.Player('ytplayer', {
            videoId: 'RoC3xl_HPo0',
            playerVars: {
                'playsinline': 1
            },
            events: {
                'onStateChange': onPlayerStateChange
            }
            });
        ytplayer2 = new YT.Player('ytplayer2', {
            videoId: '605L0qQ3TSM',
            playerVars: {
                'playsinline': 1
            },
            events: {
                'onStateChange': onPlayerStateChange
            }
            });
    } else {
        window.setTimeout(onYouTubeIframeAPIReady, 200);
    }
}
// event that will be fired when the state of the video player changes
function onPlayerStateChange(event) {
    if(event.data == -1 || event.data == 1) {
      // unstarted or playing
    } else if (event.data == 0 || event.data == 2) {
      // stopped or paused
    }
  }