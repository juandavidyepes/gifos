const favsContainer = document.querySelector('.favsContainer')
const favsNoContent = document.querySelector('.favsNoContent')
const buttonContainer = document.querySelector('.buttonContainer')

console.log(favsList)
if (favsList.length == 0){
    console.log('ta vacio')
    favsNoContent.style.display = 'flex'
    buttonContainer.style.display = 'none'
    favsContainer.style.display = 'none'
}else{
    favsList.forEach(favGif => {
        const gifFav = document.createElement('div')
        favsContainer.appendChild(gifFav)
        gifFav.classList.add('gif')
        gifFav.style.backgroundImage=favGif.url
        gifFav.style.backgroundSize = '260px 200px'  
        gifsOptions(favsList, gifFav, favGif.username, favGif.title, favGif.id)
    })
}