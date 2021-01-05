const favsContainer = document.querySelector('.favsContainer')
const favsNoContent = document.querySelector('.favsNoContent')
const buttonContainerFavs = document.querySelector('.buttonContainerFavs')

console.log(favsList)
if (favsList.length == 0){
    console.log('ta vacio')
    favsNoContent.style.display = 'flex'
    buttonContainerFavs.style.display = 'none'
    favsContainer.style.display = 'none'
}else{
    var start = 0
    var limit = 12
    function showFavs (favsList, start, limit, buttonContainerFavs) {
        for(i=start; i<limit; i++){
            if(favsList[i]===undefined){break;}
            var favGif = favsList[i]    
            console.log(favsList.length-2)
            console.log(i)
            const gifFav = document.createElement('div')
            favsContainer.appendChild(gifFav)
            gifFav.classList.add('gif')
            gifFav.style.backgroundImage=favGif.url
            gifFav.style.backgroundSize = 'cover'
            gifsOptions(gifFav, favGif.username, favGif.title, favGif.id, favGif.urlAlone)
            if(i==favsList.length-1){buttonContainerFavs.style.display = 'none'}
        }
    }

    showFavs(favsList, start, limit, buttonContainerFavs)

    if(favsList.length > 12){
        buttonContainerFavs.style.display = 'block'
        buttonContainerFavs.addEventListener('click', async () =>{
            limit+=12
            start+=12
            showFavs(favsList, start, limit, buttonContainerFavs)
        })
    }

}