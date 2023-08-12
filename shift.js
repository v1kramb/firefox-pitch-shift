browser.runtime.onMessage.addListener(function(message) {
    if (message.type === 'changePlaybackRate') {
        var video = document.querySelector('video');
        video.playbackRate = message.value;
    }
});