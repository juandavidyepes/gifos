const API_KEY = 'jWJFF6ZVFn7p6nk7dDLNkUpBqUBwK1fU'
const video = document.querySelector('video')
const title = document.querySelector('.title')
const subtitle = document.querySelector('.subtitle')
const btn = document.querySelector('.btnAction')
const step1 = document.querySelector('.step1')
const step2 = document.querySelector('.step2')
const step3 = document.querySelector('.step3')
const count = document.querySelector('.timer')



const countTimer = () => {    
    var timerVar = setInterval(countTimer, 1000);
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


const getStreamAndRecord = () => { 
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
        height: { max: 480 }
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
            video.srcObject = stream;
            console.log(stream)
            video.play()
            const recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function() {
                console.log('started')
                }
            })

            const recording = () => {
                btn.textContent = 'Finalizar'
                btn.removeEventListener('click', recording)
                btn.addEventListener('click', stop )
                countTimer()
            }

            const stop = () => {
                btn.removeEventListener('click', stop)
                
                btn.textContent = 'Subir GIFO'
                recorder.stopRecording(async () => {
                    let blob = recorder.getBlob();
                    console.log(recorder)
                    const form = new FormData()
                    form.append('file', blob, 'ungif.gif')
                    console.log(form.get('file'))
                    const response = await fetch(`https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`,{
                      method: 'POST',
                      body: form
                    });
        
                    const response_json = await response.json()
                    console.log(response_json)
                    console.log(form.get('file'))
                })
            }

            btn.removeEventListener('click', getStreamAndRecord)
            btn.addEventListener('click', () => {
                recorder.startRecording()
                recording()
            })


        })
}



btn.addEventListener('click', getStreamAndRecord)