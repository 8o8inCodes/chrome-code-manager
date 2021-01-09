chrome.tabs.onUpdated.addListener(function (tabId , info) {
  if (info.status === 'complete') {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.storage.sync.get((data)=>{
        const {url} = tabs[0]

        data.scripts.forEach(script => {
          if(script.enabled){
            const reg = new RegExp(script.urlMatch)
            if(reg.test(url)){
              chrome.tabs.executeScript(
                tabs[0].id,
                {
                  code: script.code
                }
              );
            }
          }
        });
      })
    });
  }
});
