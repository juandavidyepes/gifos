const API_KEY = 'jWJFF6ZVFn7p6nk7dDLNkUpBqUBwK1fU'

if (localStorage.getItem('favGifs') == null){
    var favsList = []
}else{
    var favsList = JSON.parse(localStorage.getItem('favGifs'))
}

const getTrendings = async () => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=3`);
    const data = await response.json()
    return data.data
};

getTrendings()
    .then(response => showTrendings(response))

//Trending Gifs Endpoint
const gifsTrendContainer = document.querySelector('.gifsTrendContainer')

//Crea un div para mostrar cada gif trending obtenido,asignandolo a su imagen de fondo. Llamo la funcion para mostrar las opciones en cada uno
showTrendings = trendings => {
    trendings.forEach(trending => {
        const gifTrendContainer = document.createElement('div')
        const gifTrend = document.createElement('img')
        const urlGifTrend =trending.images.original.url
        gifTrendContainer.classList.add('gifContainer')
        gifTrend.classList.add('gif')
        gifsTrendContainer.insertBefore(gifTrendContainer, gifsTrendContainer.childNodes[2])
        gifTrendContainer.appendChild(gifTrend)
        gifTrend.src=urlGifTrend
        gifsOptions(gifTrend, trending.username, trending.title, trending.id, trending.images.original.url, gifTrendContainer)
    })
}

// GIFS OPTIONS

function gifsOptions (gif, username, gifTitle, gifID, gifURL, gifContainer) {
    gif.addEventListener('mouseenter', async () => {
        const gifOptions = document.createElement('div') 
        gifOptions.classList.add('gifOptions')
        gifContainer.appendChild(gifOptions)
        const addFavsBtn = document.createElement('img')
        const removeFavBtn = document.createElement('img')
        const addDownloadBtn = document.createElement('img')
        const addmaxBtn = document.createElement('img')
        const adduser = document.createElement('p')
        const addtitleGif = document.createElement('p')
        const trashBtn = document.createElement('img')
        gifOptions.appendChild(addmaxBtn)
        gifOptions.appendChild(addDownloadBtn)
        
        if(gifContainer.parentNode.classList.contains('mygifsContainer')){
            gifOptions.appendChild(trashBtn)
        }else{
            gifOptions.appendChild(removeFavBtn)
            gifOptions.appendChild(addFavsBtn)
        }
        gifOptions.appendChild(adduser)
        gifOptions.appendChild(addtitleGif)
        addFavsBtn.classList.add('addFavsBtn')
        removeFavBtn.classList.add('removeFavBtn')
        addDownloadBtn.classList.add('downloadBtn')
        trashBtn.classList.add('trashBtn')
        addmaxBtn.classList.add('maxBtn')
        adduser.classList.add('user')
        addtitleGif.classList.add('titleGif')
        let userIF= ''
        username=='' ? userIF='Anonymous' : userIF=username
        adduser.textContent = userIF
        addtitleGif.textContent=gifTitle

        let gifInfo = {
            url: gifURL,
            username: userIF,
            title: gifTitle,
            id: gifID,
            urlAlone: gifURL
        }

        if(favsList.some(e => e.id === gifInfo.id)){
            console.log('ya esta')
            addFavsBtn.style.display='none'
            removeFavBtn.style.display='block'
            removeFavGif(addFavsBtn, removeFavBtn, gifInfo)
        }else{
            addFavGif(addFavsBtn, removeFavBtn, gifInfo)
            console.log('no esta')
        }

        download(addDownloadBtn, gifInfo)
        removeMyGif(trashBtn, gifInfo)

        const screenSize900 = window.matchMedia('(max-width: 900px)')

        if (screenSize900.matches){expand(gif, gifInfo)}
        else{expand(addmaxBtn, gifInfo)}

        gifOptions.addEventListener('mouseleave', async () => {
        gifOptions.remove()
        })
    })
    
}

// ADD FAVORITE GIF

function addFavGif (favBtn, removeFavBtn, gifInfo) {
    favBtn.addEventListener('click', async () =>{
        favsList.push(gifInfo)
        localStorage.setItem('favGifs', JSON.stringify(favsList))
        favBtn.style.display='none'
        removeFavBtn.style.display='block'
        removeFavGif(removeFavBtn, favBtn)
        if(document.body.classList.contains('favs')){location.reload()}
    })
}

function removeFavGif (favBtn, removeFavBtn, gifInfo) {
    removeFavBtn.addEventListener('click', () => {
        const index = favsList.map(function(e){return e.id;}).indexOf(gifInfo.id)
        favsList.splice(index, 1)      
        localStorage.setItem('favGifs', JSON.stringify(favsList))
        favBtn.style.display='block'
        removeFavBtn.style.display='none'
        location.reload()
    })
}

function download (downloadBtn, gifInfo){
    downloadBtn.addEventListener('click', async () => {
        console.log(gifInfo.url)
        window.open(gifInfo.urlAlone)
    })
}

function removeMyGif(trashBtn, gifInfo){
    trashBtn.addEventListener('click', () => {
        const index = myGifsList.map(function(e){return e.id;}).indexOf(gifInfo.id)
        myGifsList.splice(index, 1)      
        localStorage.setItem('myGifs', JSON.stringify(myGifsList))
        location.reload()
    })
}

//GIF MAX

function expand (addmaxBtn, gifInfo){
    addmaxBtn.addEventListener('click', async () => {
        console.log('Ampliar')
        let overlay = document.createElement('div')
        let close = document.createElement('img')
        let prevGif = document.createElement('img')
        let gif = document.createElement("img")
        let nextGif = document.createElement('img')
        let username = document.createElement("h2")
        let maxFav = document.createElement('img')
        let maxDownload = document.createElement('img')
        let title = document.createElement("h2");
        overlay.classList.add('overlay')
        close.classList.add('close')
        prevGif.classList.add('prevGif')
        gif.classList.add('gifMax')
        nextGif.classList.add('nextGif')
        username.classList.add('gifMaxUsername')
        maxFav.classList.add('maxFav')
        maxDownload.classList.add('maxDownload')
        title.classList.add('gifMaxTitle')
        close.src = 'images/close.svg'
        prevGif.src = 'images/button-slider-left.svg'
        gif.src = gifInfo.urlAlone
        nextGif.src = 'images/Button-Slider-right.svg'
        username.textContent = gifInfo.username
        maxFav.src = 'images/icon-fav.svg'
        maxDownload.src = 'images/icon-download.svg'
        title.textContent = gifInfo.title 

        let flexBreak = document.createElement('div')
        flexBreak.style.flexBasis = '100%'
        flexBreak.style.height = '0'

        let removeFavBtn = document.createElement('img')
        removeFavBtn.classList.add('removeFavBtn')

        document.body.appendChild(overlay)
        overlay.appendChild(close)
        overlay.appendChild(prevGif)
        overlay.appendChild(gif)
        overlay.appendChild(nextGif)
        overlay.appendChild(flexBreak)
        overlay.appendChild(username)
        overlay.appendChild(maxFav)
        overlay.appendChild(removeFavBtn)
        overlay.appendChild(maxDownload)
        overlay.appendChild(title)       

        if(favsList.some(e => e.id === gifInfo.id)){
            console.log('ya esta')
            maxFav.style.display='none'
            removeFavBtn.style.display='block'
            removeFavGif(maxFav, removeFavBtn, gifInfo)
        }else{
            addFavGif(maxFav, removeFavBtn, gifInfo)
            console.log('no esta')
        }
        download(maxDownload, gifInfo)

        close.addEventListener('click', () => {
            overlay.remove()
        })

        prevGif.addEventListener('click', () => {
            getPrevGif(prevGif)
        })

        nextGif.addEventListener('click', () => {
            getNextGif(nextGif)
        })

        let modeStatus = localStorage.getItem('darkModeToggle')
        if(modeStatus == 'true'){
            overlay.classList.add('darkBody')
            prevGif.classList.add('darkLeftArrow')
            nextGif.classList.add('darkRightArrow')
            close.classList.add('darkClose')
            username.classList.add('whiteText')
            title.classList.add('whiteText')
            maxFav.classList.add('darkOverlayIcons')
            removeFavBtn.classList.add('darkOverlayIcons')
            maxDownload.classList.add('darkOverlayIcons')
        }else{
            overlay.classList.remove('darkBody')
            prevGif.classList.remove('darkLeftArrow')
            nextGif.classList.remove('darkRightArrow')
        }
    })
}

function getPrevGif () {
    console.log('Previous GIF')  
}

function getNextGif () {
    
    console.log('Next GIF')
}