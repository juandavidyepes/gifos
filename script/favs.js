const favsContainer = document.querySelector('.favsContainer')
const favGifs = JSON.parse(localStorage.getItem('favGifs'))
const favsNoContent = document.querySelector('.favsNoContent')
const buttonContainer = document.querySelector('.buttonContainer')

console.log(favGifs)
if (favGifs.length == 0){
    console.log('ta vacio')
    favsNoContent.style.display = 'flex'
    buttonContainer.style.display = 'none'
    favsContainer.style.display = 'none'
}else{
    favGifs.forEach(favGif => {
        const gifFav = document.createElement('div')
        favsContainer.appendChild(gifFav)
        gifFav.classList.add('gif')
        gifFav.style.backgroundImage=favGif.url
        gifFav.style.backgroundSize = '260px 200px'  
        gifsOptions(gifFav, favGif.username, favGif.title)
    })
}