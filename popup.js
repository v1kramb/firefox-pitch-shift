var slider = document.getElementById("mySlider");
var output = document.getElementById("display");
var resetButton = document.getElementById("reset");

var minusButton = document.getElementById("minus");
var plusButton = document.getElementById("plus");
var step = 0.01;

var defaultValue = 1.0;
output.innerHTML = defaultValue;

var tabSliderValues = {};

function getActiveTab() {
    return browser.tabs.query({ active: true, currentWindow: true })
        .then((tabs) => tabs[0].id);
}

getActiveTab().then(tabId => {
    browser.storage.local.get(tabId.toString()).then(result => {
        if (tabId.toString() in result) {
            slider.value = result[tabId.toString()];
            tabSliderValues[tabId] = parseFloat(result[tabId.toString()]);
        } 
        else {
            slider.value = defaultValue;
            tabSliderValues[tabId] = defaultValue;
        }
        output.innerHTML = slider.value;

        if (slider.value != defaultValue)
            resetButton.disabled = false;
        else
            resetButton.disabled = true;
    });
});



function updateSliderValue(newSliderValue) {
    var activeTabId;
    getActiveTab().then(tabId => {
        activeTabId = tabId;
        tabSliderValues[activeTabId] = newSliderValue;
        browser.storage.local.set({ [activeTabId]: newSliderValue });

        browser.tabs.sendMessage(activeTabId, {
            type: 'changePlaybackRate',
            value: newSliderValue
        });
    });
}

slider.oninput = function() {
    var newSliderValue = parseFloat(this.value);
    output.innerHTML = newSliderValue;
    
    updateSliderValue(newSliderValue);

    if (this.value != defaultValue)
        resetButton.disabled = false;
    else
        resetButton.disabled = true;
}

resetButton.onclick = function() {
    slider.value = defaultValue;
    output.innerHTML = defaultValue;
    resetButton.disabled = true;
    updateSliderValue(defaultValue);
}

minusButton.onclick = function() {
    slider.value = parseFloat(slider.value) - step;
    output.innerHTML = slider.value;
    updateSliderValue(slider.value);

    if (slider.value != defaultValue)
        resetButton.disabled = false;
    else
        resetButton.disabled = true;
}

plusButton.onclick = function() {
    slider.value = parseFloat(slider.value) + step;
    output.innerHTML = slider.value;
    updateSliderValue(slider.value);

    if (slider.value != defaultValue)
        resetButton.disabled = false;
    else
        resetButton.disabled = true;
}
