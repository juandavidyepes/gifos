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
const searchGifs = async () => {
    autocompleteList.innerHTML= ''
    const gifsSearch = await getSearchResults(searchInput.value, offsetSearch, limit)
    searchResults.innerHTML=''
    showGifs(gifsSearch)
    offsetSearch+=12
    titleTrend.textContent=searchInput.value
    titleTrend.style.fontSize='35px'
    titleTrend.style.padding='137px 0 60px'
    if (searchResults.innerHTML==''){
        searchNoContent.style.display='flex'
        trendingTermsContainer.style.display='block'
        buttonContainer.style.display='none'
        searchResults.style.display='none'
    } else{
        searchNoContent.style.display='none'
        searchResults.style.display='grid'
        buttonContainer.style.display='block'
        trendingTermsContainer.style.display='none'
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
        searchInput.style.paddingLeft = '54px'
    })
    if (searchInput.value == ''){
        searchGrey.style.display='none'
        searchInput.style.paddingLeft = '50px'
        searchIcon.style.display = 'block'
        resetIcon.style.display = 'none'
    }
})

//Funcion para mostrar los gifs obtenidos en una grid, creando un div en cada espacio y asignando la imagen al fondo. Llamo la funcion para mostrar las opciones en cada uno
const showGifs = gifsSearch => {
    gifsSearch.data.forEach(gifSearch => {
        console.log(gifSearch)
        const gifSearched = document.createElement('div')
        const urlGif = "url('"+gifSearch.images.original.url+"')"
        gifSearched.classList.add('gif')
        searchResults.appendChild(gifSearched)
        gifSearched.style.backgroundImage=urlGif
        gifSearched.style.backgroundSize = '260px 200px'   
        gifsOptions(favsList, gifSearched, gifSearch.username, gifSearch.title, gifSearch.id)
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

