document.querySelector('.busca').addEventListener('submit',async (event)=>{
    event.preventDefault();//mantem os dados no campo busca ao clicar no botao

    let input = document.querySelector('#searchInput').value;

    if(input !== ''){
        showWarning("Carregando...");
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=303422057219db1ba62b4c3a21eacebc&units=metric&lang=pt_br`;//encode uri substitui os espaços

        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200){
            showInformation({
                name:json.name, //nome da cidade
                country : json.sys.country, //nome do País
                temp: json.main.temp, //Situação do tempo
                tempIcon: json.weather[0].icon, //Icone do tempo
                windSpeed: json.wind.speed, //velocidade do vento
                windAngle: json.wind.deg // angulo do vento
            });
        }else{
            clearInfo();
            showWarning("Não encontramos esta localização");
        }
    }else{
        clearInfo();
    }

});

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

function  clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showInformation(json){
    showWarning('');
    //mostra o quadrado das informações
    document.querySelector('.resultado').style.display = 'block';
    //mostra as informações
    document.querySelector('.titulo').innerHTML = `${json.name},${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>Km</span>,`;

    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`
}