function playMusic(melody, maxInt = '') {
    randIntAnswer = getRandomInt(maxInt);

    if (maxInt != '') {
        melody = melody.split('.')[0] + randIntAnswer + '.mp3';
    }
    console.log(melody);

    fetch('/play', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'melody=' + melody
    });

}

function stopMusic() {
    fetch('/stop', {
        method: 'POST'
    });
}

let timer;
let timeLeft = 0;
let alarSoundName = 'alarm-sound'

function startTimer(timeLeft) {
    clearInterval(timer);
    
    document.getElementById('time-left').innerText = `Осталось: ${timeLeft} секунд`;

    playSound(alarSoundName='alarm-sound_0');

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById('time-left').innerText = `Осталось: ${timeLeft} секунд`;

        if (timeLeft == 10) {
            playSound(alarSoundName='alarm-sound_10');
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            playSound(playSound(alarSoundName='alarm-sound'));
            document.getElementById('time-left').innerText = `|> Таймер 60`;
        }
    }, 1000);

    
}

let telezriteli = 0;
let znatoki = 0;

function setScore(user) {
    if (user == 'telezriteli'){
        telezriteli ++;
    }
    if (user == 'znatoki'){
        znatoki ++;
    }
    document.getElementById('score_table').innerText = 'Телезрители : ' + telezriteli + ' Знатоки : '+ znatoki;

    if (telezriteli == 6 || znatoki == 6) {
        playMusic('melody2.mp3')
    }

}

function playSound(alarSoundName) {
    fetch('/play_sound')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById(alarSoundName).play();
            }
        });
}

function getRandomInt(maxInt) {
    let randInt = 0;
    randInt = Math.floor(Math.random() * maxInt);
    return randInt
}

  function windOpen(){
    window.open("https://pic.rutube.ru/video/50/22/50228e358e13ac2fab4a911301d9d8cc.jpg");
  }