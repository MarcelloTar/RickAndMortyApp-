const baseUrl = 'https://rickandmortyapi.com/api/location';
const container = document.querySelector('.cardBox')

function getLocation(page, name, type) {
    
    fetch(`${baseUrl}/?page=${page}&name=${name}&type=${type}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            renderCards(data.results)
            renderPagination(data.info)
    });
    
    }
    getLocation(1, '', '')

function renderCards(data) {
        container.innerHTML = ''
        data.forEach(cardData => {
            container.innerHTML += `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${cardData.name}</h5>
                    <p class="card-text">type: ${cardData.type}</p>
                    <p class="card-text">dimension: ${cardData.dimension}</p>
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

     getLocation(currentPage, '', '');
     
  })
  prevPage.addEventListener('click', () => {
     console.log('previous page');
     if(currentPage > 1){
        currentPage--;
        getLocation(currentPage, '', '');
     }
     

  })
}

const btnfilter = document.querySelector('.btnfilter');

btnfilter.addEventListener('click', function(){
  const name = document.querySelector('.inputName').value;
  const type = document.querySelector('.inputType').value;
  console.log(name, type);
  currentPage = 1;
  if(name === ''){
   getLocation(currentPage, '', type)
  } else if(type === ''){
   getLocation(currentPage, name, '')
  } else{
   getLocation(currentPage, name, type)
   }

   
  
})