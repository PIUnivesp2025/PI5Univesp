document.addEventListener('DOMContentLoaded', function() {
    // Update the global variable home with address that was caught by the window.location.href
    home = window.location.href;
});


// Call the potenciometer function every second
setInterval(potenciometer, 1000);


// Create a global variable to store the main address everytime the DOM is loaded
let home = '';

function ledOn() {
    let led = document.getElementById('ledImg');
    led.src = `${home}/static/energyManagement/brightingLed.png`;

    // Call the Python function to turn the led on
    fetch('/ledOn')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
}


function ledOff() {
    let led = document.querySelector('#ledImg');
    led.src = `${home}/static/energyManagement/led.png`;

    // Call the Python function to turn the led on
    fetch('/ledOff')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
}


function potenciometer() {
    fetch('/pot')
    .then(response => response.json())
    .then(data => {
        let volt = (data * 5) / 1023;
        volt = volt.toFixed(2);
        console.log(`data is: ${data} and its type is ${typeof(data)}`);
        console.log(`volt is: ${volt} and its type is ${typeof(volt)}`);
        
        // Update the html element only if the variable volt is not NaN
        if (!(isNaN(volt))) {
            document.querySelector('#volts').innerHTML = volt;
        }
    });
}