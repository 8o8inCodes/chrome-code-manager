let speech = new SpeechSynthesisUtterance();

speech.lang = "en-US";
speech.text = "Hello";
speech.volume = 1;
speech.rate = 1.25;
speech.pitch = 1;                

let speak = (msg) => {
    speech.text = msg;
    window.speechSynthesis.speak(speech);
}

let currentSpeech = null;

let scanCaptions = ()=>{
    const spanElements = document.getElementsByClassName("ytp-caption-segment");

    if(!spanElements || spanElements.length === 0) return;
    
    let fullText = ""
    for(const captionElement of spanElements){
        const text = captionElement.textContent;
        if(text && text !== ""){
            fullText += " " + text;
        }
    }
    if(currentSpeech === fullText) return;
    speak(fullText);
    console.log(fullText)
    currentSpeech = fullText;
}

setInterval(scanCaptions, 300);