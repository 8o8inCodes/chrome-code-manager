let speech = new SpeechSynthesisUtterance();

speech.lang = "en-US";
speech.text = "Hello";
speech.volume = 1;
speech.rate = 1.75;
speech.pitch = 1;                

let speak = (msg) => {
    console.log("speaking: " + msg);
    speech.text = msg;
    window.speechSynthesis.speak(speech);
}

let speechQueue = [];
let spokenSqueue = [];

let scanCaptions = ()=>{
    manageSpeechQueue();
    const spanElements = document.getElementsByClassName("ytp-caption-segment");
    if(!spanElements || spanElements.length === 0) return;
    
    for(let i = 0; i < spanElements.length; i++){
        const span = spanElements[i];
        const text = span.innerText;
        if(!text) continue;
        if(!speechQueue.includes(text) && !spokenSqueue.includes(text)){
            speechQueue.push(text);
            console.log("added to queue: " + text);
        }
    }

    
}

let manageSpeechQueue = ()=>{
    if(speechQueue.length === 0) return;

    if(speechQueue.length > 0 && window.speechSynthesis.speaking === false){
        const text = speechQueue.shift();
        speak(text);
        spokenSqueue.push(text);
    }
}

setInterval(scanCaptions, 300);