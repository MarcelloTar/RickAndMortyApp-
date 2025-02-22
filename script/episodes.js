const baseUrl = 'https://rickandmortyapi.com/api/episode';
const container = document.querySelector('.cardBox')

let currentPage = 1;
let currentName = '';
let currentEpisodes = '';

function getEpisodes(page, name, episodes) {
    
    fetch(`${baseUrl}/?page=${page}&name=${name}&episode=${episodes}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            renderCards(data.results)
            renderPagination(data.info)
    });
    
    }
    getEpisodes(currentPage, currentName, currentEpisodes)

function renderCards(data) {
        container.innerHTML = ''
        data.forEach(cardData => {
            container.innerHTML += `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${cardData.name}</h5>
                    <p class="card-text">Episode: ${cardData.episode}</p>
                    <p class="card-text">release date: ${cardData.air_date}</p>
                    <button type="button" class="btn btn-green btnAdd" data-bs-toggle="modal" data-bs-target="#exampleModal" data-name="${cardData.name}" data-episode="${cardData.episode}" >Add</button>
                </div>
            </div>
            `
            
        });
        addToWatchList()
}

function renderPagination(info){
   
  const paginationBox = document.querySelector('.pagination');
  paginationBox.innerHTML = '';
  paginationBox.innerHTML += `
     <li class="page-item prevPage">
        <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        </a>
     </li>
  `;
  paginationBox.innerHTML += `
  <li class="page-item"><a class="page-link" href="#">${currentPage}</a></li>
   `;

  paginationBox.innerHTML += `
     <li class="page-item nextPage">
        <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        </a>
     </li>
  `;
  const prevPage = document.querySelector('.prevPage');
  const nextPage = document.querySelector('.nextPage');

  if(info.next == null){
      nextPage.classList.add('disabled')
   } else {
      nextPage.addEventListener('click', () => {
      currentPage++;

      console.log('next page');

      getEpisodes(currentPage, currentName, currentEpisodes);
   
      })
   }
if(info.prev == null){
   prevPage.classList.add('disabled')
} else{
   prevPage.addEventListener('click', () => {
      currentPage--;
      getEpisodes(currentPage, currentName, currentEpisodes)
   })
}





  
}

const btnfilter = document.querySelector('.btnfilter');

btnfilter.addEventListener('click', function(){
  const name = document.querySelector('.inputName').value;
  const episodes = document.querySelector('.inputEpisodes').value;
  currentName = name;
  currentEpisodes = episodes

  getEpisodes(currentPage, currentName, currentEpisodes)
  
})

function addToWatchList() {
         const btnAdds = document.querySelectorAll('.btnAdd');
         console.log(btnAdds);
         btnAdds.forEach(btnAdds => {
            btnAdds.addEventListener('click', function(){
               const name = btnAdds.getAttribute('data-name');
               const episode = btnAdds.getAttribute('data-episode')
               console.log(name);

               let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
               const episodeOBj = {
                     name: name,
                     episode: episode,
                     watched: false,
                     addDate: new Date().toISOString()
                  };

               const isAlreadyAdded = watchlist.some(item => item.name === name && item.episode === episode)

               
               if (!isAlreadyAdded) {
                  watchlist.push(episodeOBj)
                  localStorage.setItem('watchlist', JSON.stringify(watchlist))
               }
               
            })
         })
}





   