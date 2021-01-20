//Dark Mode

const setDarkMode = () => {
    let screenSize900 = window.matchMedia('(max-width: 900px)')
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

    if (screenSize900.matches){
        addClassMulti('.navLogo','darkNavLogoMobile')
        addClassMulti('.menu','darkBurgerMenu')
    }else{
        addClassMulti('.navLogo','darkNavLogo')}

    
    addClassMulti('h1','whiteText')
    addClassMulti('h2','whiteText')
    addClassMulti('h3','whiteText')
    addClassMulti('.darkModeText','navWhiteText')
    addClassMulti('#favsButton','navWhiteText')
    addClassMulti('#myGifsButton','navWhiteText')
    addClassMulti('.createImg','darkCreateImg')
    addClassMulti('.navIcon','darkNavIcon')
    addClass('nav','darkBody')
    addClass('nav','darkNav')
    addClassMulti('.facebook','darkFace')
    addClassMulti('.twitter','darkTwitter')
    addClassMulti('.instagram','darkInsta')

    if(document.body.classList.contains('index') || document.body.classList.contains('favs') || document.body.classList.contains('myGifs')){
    addClassMulti('.trending','darkTrending')
    addClass('.imgLeftArrow','darkLeftArrow')
    addClass('.imgRightArrow','darkRightArrow')
    addClassMulti('.imgVerMas','darkVerMas')
    }



    if(document.body.classList.contains('index')){
        addClass('.searchBar','whiteBorder')
        addClass('.searchInput','darkBody')
        addClass('.searchInput','whiteText')        
        addClass('.resetIcon','whiteResetIcon')                
        addClass('.searchIcon','whiteSearchIcon')
        addClass('.autocompleteList','whiteBorder')
    }
    
    if(document.body.classList.contains('createGif')){
        addClass('.cameraImg','darkCamera')
        addClass('.bigBox','darkBigBox')
        addClass('.borderlessBox','darkBorderlessBox')
        addClass('.step1','darkStep1')
        addClass('.step2','darkStep2')
        addClass('.step3','darkStep3')
        addClass('.gifCountContainer','darkGifCountContainer')
        addClass('.peliculaImg','darkPeliculaImg')
        addClass('.btnAction','darkBtnAction')
        addClassMulti('p','whiteText')
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

