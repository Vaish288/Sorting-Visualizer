const n=30;
const arr=[];

init();

let audioCtx= null;

function playNote(freq){
    if(audioCtx==null){
        audioCtx=new(
            AudioContext ||
            webkitAudioContext ||
            window.webkitAudioContext
        )();
    }
    const dur=0.1;
    const osc=audioCtx.createOscillator();
    osc.frequency.value=freq;
    osc.start();
    osc.stop(audioCtx.currentTime+dur);
    const node=audioCtx.createGain();
    node.gain.value=0.01
    node.gain.linearRampToValueAtTime(
        0, audioCtx.currentTime+dur
    );
    osc.connect(node);
    node.connect(audioCtx.destination);
}


function init(){
    for (let i = 0; i < n; i++) {
      arr[i] = Math.random();
    }
    showBars();
}

function play(){
    const copy=[...arr];
    const movess=bubbleSort(copy);
    animate(movess);
}

function animate(movess){
    if(movess.length==0){
        showBars();
        return;
    }
    const move=movess.shift();
    const [i,j]= move.indices;

    if(move.type=="swap"){
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    playNote(300+arr[i]*600); 
    playNote(300+arr[j]*600);
    
    showBars(move);
    setTimeout(function(){
        animate(movess);
    },50);
}

function bubbleSort(arr){
    const movess=[];
    do {
      var swapped = false;
      for (let i = 1; i < arr.length; i++) {
        //movess.push({
         // indices: [i - 1, i],
          //type: "comp",
        //});
        if (arr[i - 1] > arr[i]) {
          swapped = true;
          movess.push({
            indices:[i-1,i], type:"swap"});
          [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        }
      }
    } while (swapped);
    return movess;
}


function showBars(move){

    container.innerHTML="";
    for (let i = 0; i < arr.length; i++) {
      const bar = document.createElement("div");
      bar.style.height = arr[i] * 100 + "%";
      bar.classList.add("bar");

      if(move && move.indices.includes(i)){
        bar.style.backgroundColor=
        move.type=="swap"?"blue":"red";
      }
      container.appendChild(bar);
    }
}

