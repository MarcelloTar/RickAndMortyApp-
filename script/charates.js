const baseUrl = 'https://rickandmortyapi.com/api/character';

const container = document.querySelector('.cardBox');

let currentPage = 1;
let currentGender = '';
let currentStatus = '';
function getCharacters(page, gender, status) {
   fetch(`${baseUrl}/?page=${page}&status=${status}&gender=${gender}`)
      .then(response => response.json())
      .then(data => {
         renderCards(data.results);
         renderPagination(data.info);
      });

}

getCharacters(currentPage, currentGender, currentStatus);

function renderCards(data) {
   container.innerHTML = '';
   data.forEach(cardData => {
      container.innerHTML += `
         <div class="card" style="width: 18rem;">
         <img src="${cardData.image}" class="card-img-top" alt="...">
         <div class="card-body">
            <h5 class="card-title">${cardData.name}</h5>
            <p class="card-text">${cardData.species}</p>
            <button type="button" class="btn btn-green" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="${cardData.id}">detales</button>
         </div>
         </div>
      `;
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

      getCharacters(currentPage, currentGender, currentStatus);
      
   })
   }
   if(info.prev == null){
      prevPage.classList.add('disabled')
   } else{
      prevPage.addEventListener('click', () => {
         currentPage--;
         getCharacters(currentPage, currentGender, currentStatus);
      })
   }
   
   
}




const btnfilter = document.querySelector('.btnfilter');

btnfilter.addEventListener('click', function(){
  const gender = document.getElementById('selectgender').value;
  const status = document.getElementById('seletstatus').value;
  console.log(gender, status);
  currentGender = gender;
  currentStatus = status;
  currentPage = 1;
   getCharacters(currentPage, currentGender, currentStatus)
  
  
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
       let dataEpisode = data.episode;
       
      //  console.log(dataEpisode);
      //  console.log(dataEpisode[11].slice(-2));
      let episodes = [];
      for (let i = 0; i < dataEpisode.length; i++) {
         if(dataEpisode[i].length === 41) {
            episodes.push(' ' + dataEpisode[i].slice(-1));
         } else if(dataEpisode[i].length === 42){
            episodes.push(' ' + dataEpisode[i].slice(-2));
         }
      }
      console.log(episodes);

      let episodesSenEp = [];
      for (let i = 0; i < episodes.length; i++) {
         fetch(`https://rickandmortyapi.com/api/episode/${episodes[i]}`)
          .then(response => response.json())
          .then(data => {   
            episodesSenEp.push(data.episode)
          })     
       }
       console.log(episodesSenEp);
       
         

       modalBody.innerHTML= '';
       modalBody.innerHTML = `
            <div class="boxImg">
              <img src="${data.image}" alt="">
            </div>
            <div class="boxInfo">
              <p>Name: ${data.name}</p>
              <p>Species: ${data.species}</p>
              <p>Gender: ${data.gender}</p>
              <p>Status: ${data.status}</p>
              <p>Origin: ${data.origin.name}</p>
              <p>Location: ${data.location.name}</p>
               <details class='details'>
                <summary>In which series did he appear</summary>
                  <p class='episodes'>${episodesSenEp}</p>
             </details>
            </div>
            
       `
       modalTitle.textContent = `Info about ${data.name}`
    });
    
  })
}



