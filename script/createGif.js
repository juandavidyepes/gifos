const API_KEY = 'jWJFF6ZVFn7p6nk7dDLNkUpBqUBwK1fU'
const video = document.querySelector('video')
const title = document.querySelector('.title')
const subtitle = document.querySelector('.subtitle')
const btn = document.querySelector('.btnAction')
const step1 = document.querySelector('.step1')
const step2 = document.querySelector('.step2')
const step3 = document.querySelector('.step3')
const count = document.querySelector('.timer')


function countTimer () {    
    timerVar = setInterval(countTimer, 1000);
    var totalSeconds = 0;
    function countTimer() {
        ++totalSeconds;
        var hour = Math.floor(totalSeconds /3600);
        var minute = Math.floor((totalSeconds - hour*3600)/60);
        var seconds = totalSeconds - (hour*3600 + minute*60);
        if(hour < 10)
            hour = "0"+hour;
        if(minute < 10)
            minute = "0"+minute;
        if(seconds < 10)
            seconds = "0"+seconds;
        count.innerHTML = hour + ":" + minute + ":" + seconds;
    }
}

function getStreamAndRecord(){
    title.textContent = '¿Nos das acceso a tu cámara?'
    subtitle.textContent = 'El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.'
    btn.style.display = 'none' 
    let modeStatus = localStorage.getItem('darkModeToggle')
    if(modeStatus == 'true'){
        step1.classList.toggle('darkOnStep1')
    }else{
        step1.classList.toggle('onStep1')
    }
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { 
                max: 480
            }
        }
    })
    .then(function(stream) {
        let modeStatus = localStorage.getItem('darkModeToggle')
        if(modeStatus == 'true'){
            step1.classList.toggle('darkOnStep1')
            step2.classList.toggle('darkOnStep2')
        }else{
            step1.classList.toggle('onStep1')
            step2.classList.toggle('onStep2')
        }
        video.style.display='block'
        title.style.display='none'
        subtitle.style.display='none'
        btn.style.display = 'flex'
        btn.textContent = 'Grabar'
        console.log('PREPARADO')

        video.srcObject = stream;
        video.play()

        recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: () => {
                console.log('GRABANDO')
            }
        })

        btn.removeEventListener('click', getStreamAndRecord)
        btn.addEventListener('click', recording)
    })
}

const recording = () => {
    console.log('GRABANDO')
    recorder.startRecording()
    btn.textContent = 'Finalizar'
    btn.removeEventListener('click', recording)
    btn.addEventListener('click', stop)
    countTimer()
}

function stop () {
    console.log('STOPPED')
    btn.textContent = 'Subir GIFO'
    clearInterval(timerVar)
    count.textContent = 'REPETIR CAPTURA'
    count.style.textDecoration = 'underline 2px solid #5ED7C6'
    recorder.stopRecording( () => {
        blob = recorder.getBlob();
    })
    btn.removeEventListener('click', stop)
    btn.addEventListener('click', upload)
    count.addEventListener('click', function() {
        btn.removeEventListener('click', upload)
        blob = ''
        recording()
    })
}

async function upload () {
    console.log('SUBIDO')
    count.style.display = 'none'
    btn.style.display = 'none'
    const form = new FormData()
    form.append('file', recorder.getBlob(), 'ungif.gif')
    const response = await fetch(`https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`,{
        method: 'POST',
        body: form
    })

    const response_json = await response.json()
    console.log(response_json)
    createLoadingScreen()
}

function createLoadingScreen () {
    let checkScreen = document.createElement('div')
    let checkIcon = document.createElement('img')
    let checkText = document.createElement('p')
    let checkDownload = document.createElement('img')
    let checkLink = document.createElement('img')
    checkScreen.classList.add('checkScreen')
    checkIcon.classList.add('checkIcon')
    checkText.classList.add('checkText')
    checkDownload.classList.add('checkDownload')
    checkLink.classList.add('checkLink')
    checkIcon.src = 'images/loader.svg'
    checkText.textContent = 'Estamos subiendo tu GIFO'
    checkDownload.src = 'images/icon-download.svg'
    checkLink.src = 'images/icon-link-normal.svg'

    document.querySelector('.borderlessBox').appendChild(checkScreen)
    checkScreen.appendChild(checkIcon)
    checkScreen.appendChild(checkText)
    checkScreen.appendChild(checkDownload)
    checkScreen.appendChild(checkLink)
}

btn.addEventListener('click', getStreamAndRecord)