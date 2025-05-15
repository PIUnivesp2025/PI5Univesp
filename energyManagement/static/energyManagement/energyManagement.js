document.addEventListener('DOMContentLoaded', function() {
    homeAddress = window.location.href;
});

setInterval(readData, 1000);

var lastDate;
var lastDateLoad;

var lastState = 'n';
var lastStateSecondLoad = '0';

let homeAddress;

function loadOn() {
    // Call the Python function to turn on the led
    fetch('/loadOn')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
}

function loadOff() {
    // Call the Python function to turn off the led
    fetch('/loadOff')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
}

function readData() {
    // Get the Lamp image html element
    let lamp = document.querySelector('#lampImg');

    // Call the Python function to get the potenciometer value
    fetch('/presence')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data == 'y' && lastState == 'n') {
            // Change the lamp image
            lamp.src = `${homeAddress}/static/energyManagement/lampOn.png`;

            // Clear all previous log
            if (document.querySelector('#logLampUp')) {
                document.querySelectorAll(".logLamp").forEach(e => e.remove());
            }

            // Get the current time
            const d = new Date();
            // Update the global variable lastDateLoad
            lastDateLoad = d;

            // Adjust the variable month which gives a number from 0 to 11 to each month
            let month = adjustMonth(d.getMonth())

            // Create an html element to represent a new load activation
            let innerHTML = `Data e hora do acionamento: ${d.getDate()} / ${month} / ${d.getFullYear()}, ${d.toLocaleTimeString()}`;
            createHtmlElement('h6', 'logLamp', 'logLampUp', innerHTML, 'font-size: 14px;', 'firstLoad');

            // Update the lastState
            lastState = 'y';

        } else if (data == 'n' && lastState == 'y'){

            lamp.src = `${homeAddress}/static/energyManagement/lampOff.png`;

            // Get the current time
            const d = new Date();

            // Adjust the variable month which gives a number from 0 to 11 to each month
            let month = adjustMonth(d.getMonth())

            let time = adjustTime(d, lastDateLoad);

            // Create an html element to represent a new load deactivation
            let innerHTML = `Data e hora do desligamento: ${d.getDate()} / ${month} / ${d.getFullYear()}, ${d.toLocaleTimeString()}`;
            createHtmlElement('h6', 'logLamp', 'logLampDown', innerHTML, 'font-size: 14px;', 'firstLoad');

            // Create an html element to show calculated time
            innerHTML = `Tempo em que o dispositivo ficou ligado: ${time}`;
            createHtmlElement('h6', 'logLamp', 'logLampCalc', innerHTML, 'font-size: 14px;', 'firstLoad');        

            // Update the lastState
            lastState = 'n';

        } else if (data == '1' && lastStateSecondLoad == '0'){
            // Change the image from main view
            let load = document.querySelector('#loadImg');
            // Get the pattern of the source: http://127.0.0.1:8000/static/energyManagement/fan.png
            console.log(`load source: ${load.src}`);
            let source = `${homeAddress}/static/energyManagement/fanBlue.gif`;
            load.src = source;
            // Clear all previous log
            if (document.querySelector('#logLoadUp')) {
                document.querySelectorAll(".logLoad").forEach(e => e.remove());
            }

            // Get the current time
            const d = new Date();
            // Update the global variable lastDate
            lastDate = d;

            // Adjust the variable month which gives a number from 0 to 11 to each month
            let month = adjustMonth(d.getMonth())

            // Create an html element to represent a new load activation
            let innerHTML = `Data e hora do acionamento: ${d.getDate()} / ${month} / ${d.getFullYear()}, ${d.toLocaleTimeString()}`;
            createHtmlElement('h6', 'logLoad', 'logLoadUp', innerHTML, 'font-size: 14px;', 'secondLoad');

            // Update the lastStateLoad
            lastStateSecondLoad = '1';

        } else if(data == '0' && lastStateSecondLoad == '1') {
            // Change the image from main view
            let load = document.querySelector('#loadImg');

            // Get the pattern of the source: http://127.0.0.1:8000/static/energyManagement/fanBlue.gif
            console.log(`load source: ${load.src}`);
            let source = `${homeAddress}/static/energyManagement/fan.png`;
            load.src = source;

            // Get the current time
            const d = new Date();

            // Adjust the variable month which gives a number from 0 to 11 to each month
            let month = adjustMonth(d.getMonth())
            let innerHTML = `Data e hora do desligamento: ${d.getDate()} / ${month} / ${d.getFullYear()}, ${d.toLocaleTimeString()}`;
            // Create an html element to represent a new load deactivation
            createHtmlElement('h6', 'logLoad', 'logLoadDown', innerHTML, 'font-size: 14px;', 'secondLoad');

            // Configure the phrase that will show the calculated time to which the period that some load had been activated
            let time = adjustTime(d, lastDate);
            innerHTML = `Tempo em que o dispositivo ficou ligado: ${time}`;
            // Create an html element to show calculated time
            createHtmlElement('h6', 'logLoad', 'logLoadCalc', innerHTML, 'font-size: 14px;', 'secondLoad');
            
            // Update the lastStateLoad
            lastStateSecondLoad = '0';
        }
    });
}


function createHtmlElement(tag, className, id, innerHTML, style, domId) {
    // Create an html element to represent a new load deactivation
    const element = document.createElement(tag);
    element.className = className;
    element.id = id;
    element.innerHTML = innerHTML;
    element.style = style;

    // Add the button to the DOM
    document.querySelector(`#${domId}`).append(element);
}


function adjustMonth(month) {
    // Adjust the variable month which gives a number from 0 to 11 to each month
    let adjMonth = month + 1;
    if (adjMonth < 10) {
        adjMonth = `0${adjMonth}`;
    }
    return adjMonth
}


function adjustTime(currentDate, lastDate) {
    // Add pattern to the time
    let time = currentDate - lastDate;
    let unit = 'segundos';
    time = time / 1000;
    if (time >= 60 && time < 3600) {
        time = time / 60;
        unit = 'minutos';
    } else if (time >= 3600) {
        time = time / 3600;
        unit = 'horas';
    }

    return `${time.toFixed(2)} ${unit}`
}