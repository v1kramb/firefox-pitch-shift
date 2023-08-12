browser.runtime.onMessage.addListener(function(message, sender) {
    if (message.type === 'changePlaybackRate') {
        var video = document.querySelector('video');
        video.playbackRate = parseFloat(message.value);
    }
});