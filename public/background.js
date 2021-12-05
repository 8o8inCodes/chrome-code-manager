chrome.tabs.onUpdated.addListener(function (tabId , info) {
  if (info.status === 'complete') {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.storage.sync.get((data)=>{
        const {url} = tabs[0]

        data.scripts.forEach(script => {
          if(script.enabled){
            const reg = new RegExp(script.urlMatch)
            if(reg.test(url)){
              console.log("Executing Script", script);
              const wrappedScript = `
                const executeCode = () => {
                  ${script.code}
                }
                const waitForElement = (selector) => {
                  if (!selector || selector === 'undefined') {
                    executeCode();
                    return;
                  }
                  if (document.querySelector(selector)) {
                    executeCode();
                  } else {
                    setTimeout(() => waitForElement(selector), 100);
                  }
                }
                waitForElement('${script.waitForElement}');
              `

              console.log("Full script", wrappedScript)
              chrome.tabs.executeScript(
                tabs[0].id,
                {
                  code: wrappedScript
                }
              );
            }
          }
        });
      })
    });
  }
});
