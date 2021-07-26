setTimeout(()=>{
    var elements = document.body.getElementsByTagName("*");
    var oldBg = [];
    var oldBs = [];
    var oldTs = [];
    var oldBi = [];
    for(let el in elements){
        if(!elements[el]){
            continue;
        }
        if(!elements[el].style){
            continue;
        }
      var r = Math.floor(Math.random()*255);
      var g = Math.floor(Math.random()*255);
      var b = Math.floor(Math.random()*255);
      oldTs[el] = elements[el].style.textShadow;
      oldBg[el] = elements[el].style.backgroundColor;
      oldBs[el] = elements[el].style.boxShadow;
      oldBi[el] = elements[el].style.backgroundImage;
      elements[el].style.textShadow = '0px 0px 30px rgba('+r+','+g+','+b+',1)';
      r = Math.floor(Math.random()*255);
      g = Math.floor(Math.random()*255);
      b = Math.floor(Math.random()*255);
      elements[el].style.backgroundColor = 'rgb('+r+','+g+','+b+')';
      elements[el].style.boxShadow = '0px 0px 30px 0px rgba('+r+','+g+','+b+',1)';
    }
    function restore(elements, oldBg, oldBs, oldTs,oldBi){
        for(let el in elements){
            if(!elements[el]){
                continue;
            }
            if(!elements[el].style){
                continue;
            }
            elements[el].style.textShadow = oldTs[el];
            elements[el].style.backgroundColor = oldBg[el];
            elements[el].style.boxShadow = oldBs[el];
            elements[el].style.boxShadow = oldBi[el];
        }
    }
    setTimeout(restore, 10000, elements, oldBg, oldBs, oldTs, oldBi);
  }, 1);