//Dark Mode

document.getElementById('darkModeButton').addEventListener('change',()=>{

    function addClass (element, classToAdd,){
        let arrayOfElements = document.querySelectorAll(element)
        arrayOfElements.forEach(element => {
            element.classList.toggle(classToAdd)
        })
    }
    
    addClass('.trending','darkTrending')
    addClass('h1','whiteText')
    addClass('h2','whiteText')
    addClass('h3','whiteText')
    addClass('.navLogo','darkNavLogo')
    addClass('.darkModeText','navWhiteText')
    addClass('#favsButton','navWhiteText')
    addClass('#myGifsButton','navWhiteText')
    addClass('.darkModeButton','navWhiteText')
    addClass('.createImg','darkCreateImg')
 
  
    document.body.classList.toggle('darkBody');
    document.querySelector('nav').classList.toggle('darkBody');
    document.querySelector('nav').classList.toggle('darkNav');
    document.querySelector('.searchInput').classList.toggle('darkBody');
    document.querySelector('.searchBar').classList.toggle('whiteSearchBar');
    document.querySelector('.searchIcon').classList.toggle('whiteSearchIcon');

})