/*  Search Endpoint */

const searchResults = document.querySelector('.searchResults')
const searchBar = document.querySelector('.searchBar')
const searchInput = document.querySelector('.searchInput')
const buttonContainer = document.querySelector('.buttonContainer')
const titleTrend = document.querySelector('.titleTrend')
const searchNoContent = document.querySelector('.searchNoContent')

let offsetSearch = 0
let limit = 12

//Toma los valores obtenidos del fetch y los pasa a la funcion para mostrarlos. 
//Modifica la pagina para mostrar unicamente lo deseado
const getSearchResults = async (query) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=${limit}&q=${query}&offset=${offsetSearch}`)
    const data = await response.json()
    return data
}

const searchGifs = async () => {
    const gifFound = document.querySelector('.gifFound')
    autocompleteList.innerHTML= ''
    const gifsSearch = await getSearchResults(searchInput.value)
    searchResults.innerHTML=''
    showGifs(gifsSearch)
    offsetSearch+=12
    
    if (searchResults.innerHTML==''){
        searchNoContent.style.display='flex'
        trendingTermsContainer.style.display='block'
        buttonContainer.style.display='none'
        searchResults.style.display='none'
        gifFound.textContent=searchInput.value
        gifFound.style.padding='137px 0 109px'
        gifFound.style.fontSize='30px'
        titleTrend.textContent='Trending:'
        titleTrend.style.padding='73px 0 7px'
        titleTrend.style.fontSize='18px'
    } else{
        titleTrend.style.display='block'
        searchNoContent.style.display='none'
        searchResults.style.display='grid'
        buttonContainer.style.display='block'
        trendingTermsContainer.style.display='none'
        titleTrend.textContent=searchInput.value
        titleTrend.style.padding='63px 0 95px'
        titleTrend.style.fontSize='35px'
    }
    removeAutocomplete()    
}

//Evento para buscar al darle SUBMIT
searchBar.addEventListener('submit', async(e) => {
    e.preventDefault()
    searchGifs()
})

const btnVerMas = document.querySelector('.btnVerMas')

//Evento para buscar y mostrar 12 gifs mas al hacer click en Ver Mas
btnVerMas.addEventListener('click', async () => {
    const gifsSearch = await getSearchResults(searchInput.value, offsetSearch, limit)
    showGifs(gifsSearch)
    offsetSearch+=12
})

/*  Autocomplete    */

const autocompleteList = document.querySelector('.autocompleteList')
const searchIcon = document.querySelector('.searchIcon')
const suggestionItem = document.querySelector('.suggestionItem')

const autocompleteFetch = async (query) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=${API_KEY}&limit=5&q=${query}`)
    const data = await response.json()
    return data.data
}

//Cada vez que presiona una tecla se realiza el fetch para obtener las palabras sugeridas
//Pasa la lista a la funcion que las muestra
searchInput.addEventListener('keyup', async () => {
    const suggestionsList = await autocompleteFetch(searchInput.value)
    showSuggestions(suggestionsList)
})

//Funcion para volver la barra de busqueda a su estado original
const removeAutocomplete = () => {
    autocompleteList.style.display='none'
    searchBar.style.border = '1px solid #572EE5';
    searchBar.style.borderRadius = '27px';
}

//Funcion para mostrar las palabras sugeridas en una lista
const showSuggestions = suggestionsList => {
    autocompleteList.innerHTML= ''
    autocompleteList.style.display= 'block'
    
    suggestionsList.forEach(suggestion => {
        const suggestionItem = document.createElement('li')
        suggestionItem.textContent=suggestion.name
        autocompleteList.appendChild(suggestionItem)
        
        suggestionItem.addEventListener('click', async () => {
            searchInput.value=suggestionItem.textContent
            searchGifs()
        })
    })
    
    if (autocompleteList.innerHTML == ''){
        removeAutocomplete()
    }else{
        searchBar.style.borderBottom = '0';
        searchBar.style.borderBottomLeftRadius = '0';
        searchBar.style.borderBottomRightRadius = '0';
    }
}

/*  Search Bar Icon    */

const resetIcon = document.querySelector('.resetIcon')
const searchGrey = document.querySelector('.searchIconGrey')

//Evento para modificar los botones que se muestran cuando la barra de busqueda está activa
searchInput.addEventListener('keyup', async () => {
    searchIcon.style.display = 'none'
    resetIcon.style.display = 'block'
    searchGrey.style.display = 'block' 
    searchInput.style.paddingLeft = '9px'
    resetIcon.addEventListener('click', async () =>{
        searchBar.reset()
        removeAutocomplete()
        searchIcon.style.display = 'block'
        resetIcon.style.display = 'none'
        searchGrey.style.display = 'none' 
        let screenSize560 = window.matchMedia('(max-width: 560px)')
        if (screenSize560.matches){searchInput.style.paddingLeft = '15px'}
        else{searchInput.style.paddingLeft = '50px'}
    })
    if (searchInput.value == ''){
        searchGrey.style.display='none'
        searchIcon.style.display = 'block'
        resetIcon.style.display = 'none'
        let screenSize560 = window.matchMedia('(max-width: 560px)')
        if (screenSize560.matches){searchInput.style.paddingLeft = '15px'}
        else{searchInput.style.paddingLeft = '54px'}
    }
})

//Funcion para mostrar los gifs obtenidos en una grid, creando un div en cada espacio y asignando la imagen al fondo. Llamo la funcion para mostrar las opciones en cada uno
const showGifs = gifsSearch => {
    gifsSearch.data.forEach(gifSearch => {
        const gifSearchedContainer = document.createElement('div')
        const gifSearched = document.createElement('img')
        const urlGif =gifSearch.images.original.url
        gifSearchedContainer.classList.add('gifContainer')
        gifSearched.classList.add('gif')
        searchResults.appendChild(gifSearchedContainer)
        gifSearchedContainer.appendChild(gifSearched)
        gifSearched.src=urlGif
        gifsOptions(gifSearched, gifSearch.username, gifSearch.title, gifSearch.id, gifSearch.images.original.url, gifSearchedContainer)
    })
}

/*  Trending Terms Endpoint */
const trendingTermsContainer = document.querySelector('.trendingTermsContainer')

//Fetch para obtener las palabras mas buscadas
const getTrendTerms = async () => {
    const response = await fetch(`https://api.giphy.com/v1/trending/searches?api_key=${API_KEY}`)
    const data = await response.json()
    return data.data
};

getTrendTerms()
    .then(response => showTrendTerms(response))

//Muestra las palabras trending en el espacio designado, creando h3
showTrendTerms = trendTerms => {
    trendTerms = trendTerms.slice(0,5)
    trendTerms = trendTerms.join(', ')
    const trendingTerms = document.createElement('h3')
    trendingTerms.textContent=trendTerms
    trendingTermsContainer.appendChild(trendingTerms)
}

//Sticky search bar

// When the user scrolls the page, execute myFunction
window.onscroll = function() {stickBar()};

// Get the offset position of the navbar
var sticky = searchBar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickBar() {
  if (window.pageYOffset >= sticky) {
    searchBar.classList.add("stickyBar")
    autocompleteList.classList.add("stickyList")
    searchBar.style.width = '300px'
    searchBar.style.transform = 'translateX(-250px)'
    autocompleteList.style.width = '266px'
    autocompleteList.style.padding = '50px 0px 18px 34px'
    autocompleteList.style.transform = 'translateX(-250px)'
    searchInput.style.width = '205px'
    searchInput.style.padding = '0 0 0 15px'
    searchIcon.style.padding = '0 0 0 40px'
    resetIcon.style.paddingLeft = '10px'
  } else {
    searchBar.classList.remove("stickyBar");
    autocompleteList.classList.remove("stickyList");
    searchBar.style.width = '551px'
    searchBar.style.transform = 'translateX(0)'
    autocompleteList.style.width = '507px'
    autocompleteList.style.transform = 'translateX(0)'
    autocompleteList.style.padding = '50px 0px 18px 44px'
    searchInput.style.width = '210px'
    searchInput.style.padding = '0 0 0 50px'
    searchIcon.style.padding = '0 0 0 247px'
    resetIcon.style.paddingLeft = '255px'
  }
}


