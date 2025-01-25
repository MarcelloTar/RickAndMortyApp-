const baseUrl = 'https://rickandmortyapi.com/api/episode';
const container = document.querySelector('.cardBox')

function getEpisodes(page, name, episodes) {
    
    fetch(`${baseUrl}/?page=${page}&name=${name}&episode=${episodes}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            renderCards(data.results)
            renderPagination(data.info)
    });
    
    }
    getEpisodes(1, '', '')

function renderCards(data) {
        container.innerHTML = ''
        data.forEach(cardData => {
            container.innerHTML += `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${cardData.name}</h5>
                    <p class="card-text">Episode: ${cardData.episode}</p>
                    <p class="card-text">release date: ${cardData.air_date}</p>
                </div>
            </div>
            `
            
        });
}

let currentPage = 1;
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

  nextPage.addEventListener('click', () => {
     currentPage++;

     console.log('next page');

     getEpisodes(currentPage, '', '');
     
  })
  prevPage.addEventListener('click', () => {
     console.log('previous page');
     if(currentPage > 1){
        currentPage--;
        getEpisodes(currentPage, '', '');
     }
     

  })
}

const btnfilter = document.querySelector('.btnfilter');

btnfilter.addEventListener('click', function(){
  const name = document.querySelector('.inputName').value;
  const episodes = document.querySelector('.inputEpisodes').value;
  currentPage = 1;
  if(name === ''){
    getEpisodes(currentPage, '', episodes)
  } else if(episodes === ''){
    getEpisodes(currentPage, name, '')
  } else{
    getEpisodes(currentPage, name, episodes)
   }

   
  
})





   