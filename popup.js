var slider = document.getElementById("mySlider");
var output = document.getElementById("display");
var resetButton = document.getElementById("reset");

var defaultValue = 1.0;

browser.storage.local.get('sliderValue').then(result => {
    if ('sliderValue' in result) 
        slider.value = parseFloat(result.sliderValue);
    else
        slider.value = 1;

    output.innerHTML = slider.value;
});

if (slider.value !== defaultValue) {
    resetButton.disabled = false;
}

slider.oninput = function() {
    output.innerHTML = this.value;

    if (this.value != defaultValue)
        resetButton.disabled = false;
    else
        resetButton.disabled = true;

    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            type: 'changePlaybackRate',
            value: this.value
        });
    });

    browser.storage.local.set({ sliderValue: this.value });
}

resetButton.onclick = function() {
    slider.value = defaultValue;
    output.innerHTML = defaultValue;
    resetButton.disabled = true;

    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            type: 'changePlaybackRate',
            value: defaultValue
        });
    });

    browser.storage.local.set({ sliderValue: defaultValue });
}