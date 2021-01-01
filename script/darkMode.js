//Dark Mode
let darkModeButton = document.getElementById('darkModeButton');

darkModeButton.addEventListener('change',()=>{
    document.body.classList.toggle('darkBody');
    document.querySelector('.trending').classList.toggle('darkTrending');
})
