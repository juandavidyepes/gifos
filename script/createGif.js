const API_KEY = 'jWJFF6ZVFn7p6nk7dDLNkUpBqUBwK1fU'
const video = document.querySelector('video')
const title = document.querySelector('.title')
const subtitle = document.querySelector('.subtitle')
const btn = document.querySelector('.btnAction')
const step1 = document.querySelector('.step1')
const step2 = document.querySelector('.step2')
const step3 = document.querySelector('.step3')
const count = document.querySelector('.timer')
let modeStatus = localStorage.getItem('darkModeToggle')

if (localStorage.getItem('myGifs') == null){
    var myGifsList = []
}else{
    var myGifsList = JSON.parse(localStorage.getItem('myGifs'))
}

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
        document.querySelector('.videoBox').style.display = 'block'
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
    btn.textContent = 'Finalizar'
    btn.removeEventListener('click', recording)
    btn.addEventListener('click', stop)
    recorder.startRecording()
    countTimer()
}

function stop () {
    console.log('STOPPED')
    clearInterval(timerVar)
    recorder.stopRecording( () => {
        blob = recorder.getBlob();
    })
    console.log(blob)
    btn.removeEventListener('click', stop)
    btn.addEventListener('click', upload)
    count.addEventListener('click', function() {
        btn.removeEventListener('click', upload)
        blob = undefined
        recorder = undefined
        count.textContent = ''
        if(modeStatus == 'true'){
            step2.classList.toggle('darkOnStep2')
        }else{
            step2.classList.toggle('onStep2')
        }
        getStreamAndRecord()
    })
    btn.textContent = 'Subir GIFO'
    count.textContent = 'REPETIR CAPTURA'
    count.style.textDecoration = 'underline 2px solid #5ED7C6'
}

async function upload () {
    createLoadingScreen()
    if(modeStatus == 'true'){
        step2.classList.toggle('darkOnStep2')
        step3.classList.toggle('darkOnStep3')
    }else{
        step2.classList.toggle('onStep2')
        step3.classList.toggle('onStep3')
    }
    console.log('SUBIDO')
    count.style.display = 'none'
    btn.style.display = 'none'
    const form = new FormData()
    form.append('file', recorder.getBlob(), 'myGif.gif')
    const response = await fetch(`https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`,{
        method: 'POST',
        body: form
    })
    const response_json = await response.json()
    console.log(response_json)
    let gifId = response_json.data.id
    myGifsList.push(response_json.data.id)
    localStorage.setItem('myGifs', JSON.stringify(myGifsList))
    let gifUploaded = await getGifById(gifId)
    checkScreen (gifUploaded.images.original.url)
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

    document.querySelector('.videoBox').appendChild(checkScreen)
    checkScreen.appendChild(checkDownload)
    checkScreen.appendChild(checkLink)
    checkScreen.appendChild(checkIcon)
    checkScreen.appendChild(checkText)
}

function checkScreen (url) {
    document.querySelector('.checkIcon').src = 'images/check.svg'
    document.querySelector('.checkIcon').style.padding = '84px 0 9px'
    document.querySelector('.checkText').textContent = 'GIFO subido con éxito'

    let checkDownload = document.querySelector('.checkDownload')
    let checkLink = document.querySelector('.checkLink')
    checkDownload.style.display = 'flex'
    checkLink.style.display = 'block'
    
    checkDownload.addEventListener('click', async () => {
        window.open(url)
    })
    checkLink.addEventListener('click', async () => {
        window.open(url)
    })
}

async function getGifById (gifId) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/${gifId}?api_key=${API_KEY}`)
    const data = await response.json()
    console.log(data)
    return data.data
}

btn.addEventListener('click', getStreamAndRecord)