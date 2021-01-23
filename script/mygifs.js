const mygifsContainer = document.querySelector('.mygifsContainer')
const mygifsNoContent = document.querySelector('.mygifsNoContent')
const buttonContainerMyGifs = document.querySelector('.buttonContainerMyGifs')

var startMyGifs = 0
var limitMyGifs = 12

if (localStorage.getItem('myGifs') != null){
    myGifsList = JSON.parse(localStorage.getItem('myGifs'))
    ids = JSON.parse(localStorage.getItem('myGifs')).join()

    if(myGifsList.length > 12){
        buttonContainerMyGifs.style.display = 'block'
        buttonContainerMyGifs.addEventListener('click', async () =>{
            limitMyGifs+=12
            startMyGifs+=12
            showMyGifs(startMyGifs, limitMyGifs)
        })
    }

    showMyGifs(startMyGifs, limitMyGifs)

}else{
    console.log('ta vacio')
    mygifsNoContent.style.display = 'flex'
    buttonContainerMyGifs.style.display = 'none'
    mygifsContainer.style.display = 'none'
}

async function getGifsById () {
    const response = await fetch(`https://api.giphy.com/v1/gifs?api_key=${API_KEY}&ids=${ids}`)
    const data = await response.json()
    return data.data
}

async function showMyGifs (startMyGifs, limitMyGifs) {
    let myGifs = await getGifsById()
    console.log(myGifs)
    for(i=startMyGifs; i<limitMyGifs; i++){
        if(myGifs[i]===undefined){break;}
        var myGif = myGifs[i]   
        console.log(myGif)
        const gifMyContainer = document.createElement('div')
        const gifMyImg = document.createElement('img')
        mygifsContainer.appendChild(gifMyContainer)
        gifMyContainer.appendChild(gifMyImg)
        gifMyContainer.classList.add('gifContainer')
        gifMyImg.classList.add('gif')
        gifMyImg.src=myGif.images.original.url
        gifsOptions(gifMyImg, myGif.username, myGif.title, myGif.id, myGif.images.original.url, gifMyContainer)
        if(i==myGifs.length-1){buttonContainerMyGifs.style.display = 'none'}
    }
}