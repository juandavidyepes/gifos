



const getSearchResults = async (query, offset, limit) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=${limit}&q=${query}&offset=${offset}`)
    const data = await response.json()
    return data
}

const autocompleteFetch = async (query) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=${API_KEY}&limit=5&q=${query}`)
    const data = await response.json()
    return data.data
}
