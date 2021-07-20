let digitalElement = document.querySelector('.digital');
let sElement = document.querySelector('.p_s');
let mElement = document.querySelector('.p_m');
let hElement = document.querySelector('.p_h');

//função para atualizar o relogio
function updateClock(){

    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let secound = now.getSeconds();

    //adicionando a hora no relogio digital
    digitalElement.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(secound)}`;

    //relogio analogico
    let ponteitoSecounds = ((360/60)*secound)-90;
    let ponteiroMinutes  = ((360/60)*minute)-90;
    let ponteiroHour     = ((360/12)*hour)-90;
    sElement.style.transform = `rotate(${ponteitoSecounds}deg)`;
    mElement.style.transform = `rotate(${ponteiroMinutes}deg)`;
    hElement.style.transform = `rotate(${ponteiroHour}deg)`;
 }

//função para validar o zero da hora
function fixZero(time){
   return time<10 ? `0${time}` : time;
}

setInterval(updateClock,1000);
updateClock();