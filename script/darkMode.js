//Dark Mode

const setDarkMode = () => {
    function addClassMulti (element, classToAdd,){
        let arrayOfElements = document.querySelectorAll(element)
        arrayOfElements.forEach(element => {
            element.classList.toggle(classToAdd)
        })
    }

    function addClass (element, classToAdd,){
        let singleElement = document.querySelector(element)
        singleElement.classList.toggle(classToAdd)
    }

    document.body.classList.toggle('darkBody');
    addClassMulti('.trending','darkTrending')
    addClassMulti('h1','whiteText')
    addClassMulti('h2','whiteText')
    addClassMulti('h3','whiteText')
    addClassMulti('.navLogo','darkNavLogo')
    addClassMulti('.darkModeText','navWhiteText')
    addClassMulti('#favsButton','navWhiteText')
    addClassMulti('#myGifsButton','navWhiteText')
    addClassMulti('.createImg','darkCreateImg')

    addClass('nav','darkBody')
    addClass('nav','darkNav')
    addClass('.imgLeftArrow','darkLeftArrow')
    addClass('.imgRightArrow','darkRightArrow')


    if(document.body.classList.contains('index')){
        addClass('.searchInput','darkBody')
        addClass('.searchBar','whiteSearchBar')
        addClass('.searchIcon','whiteSearchIcon')
    }
    
}

darkModeButton.addEventListener('change', () => {
    localStorage.setItem('darkModeToggle', darkModeButton.checked)
    setDarkMode()
})       

if (localStorage.getItem('darkModeToggle') == null){
    localStorage.setItem('darkModeToggle', darkModeButton.checked)
}else{
    let modeStatus = localStorage.getItem('darkModeToggle')
    if(modeStatus == 'true'){
        darkModeButton.checked = 'true'
        setDarkMode()
    }
}

