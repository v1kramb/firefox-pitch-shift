// Bundled with browserify
var tone = require('tone');

tone.start();
var pitchShift = new tone.PitchShift(0).toDestination();

browser.runtime.onMessage.addListener(function(message, sender) {
    if (message.type === 'changePitch') {
        var video = document.querySelector('video');
 
        const mediaSource = tone.context.createMediaElementSource(video);
        tone.disconnect(pitchShift);

        pitchShift = new tone.PitchShift(message.value).toDestination();
        tone.connect(mediaSource, pitchShift);
    }
});

// browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     if (changeInfo.status === 'complete') {
//         var video = document.querySelector('video');
//         video.playbackRate = 3;
//     }
// });