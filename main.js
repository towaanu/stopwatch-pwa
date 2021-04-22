// Check if browsers support service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    // Register the service worker
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful ', registration);
    }, function(err) {
      // registration failed
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


window.addEventListener('DOMContentLoaded', function() {
  initStopwatch();
})

function initStopwatch() {
    const startBtn = document.querySelector("#stopwatch .start");
    const stopBtn = document.querySelector("#stopwatch .stop");
    const resetBtn = document.querySelector("#stopwatch .reset");
    const timerDiv = document.querySelector("#stopwatch .timer");

    function updateTimer(newTime) {
	const ms = newTime % 1000;
	const s = Math.floor(newTime / 1000) % 60;
	const m = Math.floor(newTime / 60000);
	timerDiv.innerHTML = `${m} : ${s} : ${ms}`;
    }

    let intervalId = null;
    let startTime = null;
    let currentTime = 0;

    startBtn.addEventListener("click", event => {
	if(intervalId) {
	    return;
	}
	
	if(!startTime) {
	    startTime = new Date() - currentTime;
	    updateTimer(currentTime);
	}

	intervalId = setInterval(() => {
	    currentTime = Date.now() - startTime;
	    updateTimer(currentTime);
	}, 10)
    })

    stopBtn.addEventListener("click", event => {
	if(!intervalId) {
	    return;
	}
	clearInterval(intervalId);
	intervalId = null;
	startTime = null;
    })

    resetBtn.addEventListener("click", event => {
	if(intervalId) {
	    clearInterval(intervalId);
	    intervalId = null;
	}
	currentTime = 0;
	startTime = null;
	updateTimer(currentTime);
    })

}
