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
                    <button type="button" class="btn btn-green" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="${cardData.id}">detales</button>
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

const exampleModal = document.getElementById('exampleModal')
if (exampleModal) {
  exampleModal.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget
    const modalTitle = exampleModal.querySelector('.modal-title')
    const id = button.getAttribute('data-bs-whatever')
    const modalBody = document.querySelector('.modal-body')
    fetch(`${baseUrl}/${id}`)
    .then(response => response.json())
    .then(data => {
       console.log(data);
       let dataResidents = data.residents;
       console.log(dataResidents[0], dataResidents[0].length);
       
       let residents = [];
       for (let i = 0; i < dataResidents.length; i++) {
         if(dataResidents[i].length === 43) {
            residents.push(dataResidents[i].slice(-1));
         } else if(dataResidents[i].length === 44){
            residents.push(dataResidents[i].slice(-2));
         } else if(dataResidents[i].length === 45){
            residents.push(dataResidents[i].slice(-3));
         }
       }
       console.log(residents);
      
       let residentsName = [];
       
       for (let i = 0; i < residents.length; i++) {
         fetch(`https://rickandmortyapi.com/api/character/${residents[i]}`)
          .then(response => response.json())
          .then(data => {   
            residentsName.push(data.name)
          })     
       }
       console.log(residentsName);


       modalBody.innerHTML= '';
       modalBody.innerHTML = `
            <div class="boxInfo">
              <p>Name: ${data.name}</p>
              <p>Type: ${data.type}</p>
              <p>Dimension: ${data.dimension}</p>
               <details class='details'>
                <summary>They live there:</summary>
                  <p>${residentsName}</p>
             </details>
            </div>
            
       `
       modalTitle.textContent = `Info about location ${data.name}`
    });
    
  })
}