let changeColor = document.getElementById('getPoints');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {
            //   code: 'console.log("lol");'
              code: 'document.querySelector("button.tw-button--success").click();'
            }
        );
    });
  };