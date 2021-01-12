const mygifsContainer = document.querySelector('.mygifsContainer')
const mygifsNoContent = document.querySelector('.mygifsNoContent')
const buttonContainerMyGifs = document.querySelector('.buttonContainerMyGifs')

let myGifsList = []
console.log(myGifsList)
if (favsList.length == 0){
    console.log('ta vacio')
    mygifsNoContent.style.display = 'flex'
    buttonContainerMyGifs.style.display = 'none'
    mygifsContainer.style.display = 'none'
}else{
    var start = 0
    var limit = 12
    function showFavs (favsList, start, limit, buttonContainerMyGifs) {
        for(i=start; i<limit; i++){
            if(favsList[i]===undefined){break;}
            var myGif = favsList[i]    
            const gifMyContainer = document.createElement('div')
            const gifMy = document.createElement('img')
            mygifsContainer.appendChild(gifMyContainer)
            gifMyContainer.appendChild(gifMy)
            gifMyContainer.classList.add('gifContainer')
            gifMy.classList.add('gif')
            console.log(myGif.url)
            gifMy.src=myGif.url
            gifsOptions(gifMy, myGif.username, myGif.title, myGif.id, myGif.urlAlone, gifMyContainer)
            if(i==favsList.length-1){buttonContainerMyGifs.style.display = 'none'}
        }
    }

    showFavs(favsList, start, limit, buttonContainerMyGifs)

    if(favsList.length > 12){
        buttonContainerMyGifs.style.display = 'block'
        buttonContainerMyGifs.addEventListener('click', async () =>{
            limit+=12
            start+=12
            showFavs(favsList, start, limit, buttonContainerMyGifs)
        })
    }

}