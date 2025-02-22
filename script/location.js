const baseUrl = 'https://rickandmortyapi.com/api/location';
const container = document.querySelector('.cardBox')


let currentPage = 1;
let currentName = '';
let currentType = '';

function getLocation(page, name, type) {
    
    fetch(`${baseUrl}/?page=${page}&name=${name}&type=${type}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            renderCards(data.results)
            renderPagination(data.info)
    });
    
}
    getLocation(currentPage, currentName, currentType)

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
      
            getLocation(currentPage, currentName, currentType)
      })
  }

  if(info.prev == null){
      prevPage.classList.add('disabled')
   } else{
      prevPage.addEventListener('click', () => {
         currentPage--;
         getLocation(currentPage, currentName, currentType)
      })
   }





  
}

const btnfilter = document.querySelector('.btnfilter');

btnfilter.addEventListener('click', function(){
  const name = document.querySelector('.inputName').value;
  const type = document.querySelector('.inputType').value;
  console.log(name, type);
  currentName = name;
  currentStatus = type;
  currentPage = 1;
  getLocation(currentPage, currentName, currentType)

   
  
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
       

       modalBody.innerHTML= '';
       modalBody.innerHTML = `
            <div class="boxInfo">
              <p>Name: ${data.name}</p>
              <p>Type: ${data.type}</p>
              <p>Dimension: ${data.dimension}</p>
            </div>
            
       `
       modalTitle.textContent = `Info about location ${data.name}`
    });
    
  })
}