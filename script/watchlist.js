let watchlist = JSON.parse(localStorage.getItem('watchlist'));

const tbody = document.querySelector('.tbody');

function renderTable(){
    tbody.innerHTML = ""
    for (let i = 0; i < watchlist.length; i++) {
        console.log(watchlist);
        
        tbody.innerHTML +=`
            <tr>
                <th scope="row">${i}</th>
                <td>${watchlist[i].name}</td>
                <td>${watchlist[i].episode}</td>
                <td>${watchlist[i].addDate}</td>
                <td><input class="form-check-input d-flex m-auto inputWatched" data-id="${i}" type="checkbox" name="watched" id="inputWatched" ${watchlist[i].watched ? 'checked' : ''}></td>
                <td><button type="button" class="btn btn-danger btndelete" data-id="${i}">Delete</button></td>
            </tr>
        `    
    }
    btnDelete()
    inputWatched()
}
renderTable();

function btnDelete(){
    const btndelete = document.querySelectorAll('.btndelete')
    btndelete.forEach(btn =>{
        btn.addEventListener('click', function(){
            watchlist.splice(btn.getAttribute('data-id'), 1);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            renderTable()
        })
    })
}
function inputWatched() {
    const inputWatchedCheckbox = document.querySelectorAll('.inputWatched');
    inputWatchedCheckbox.forEach(input =>{
        input.addEventListener('click', function(){
            let id = input.getAttribute('data-id')
            watchlist[id].watched === false ? watchlist[id].watched = true : watchlist[id].watched = false;
            if(watchlist[id].watched === false){
                watchlist[id].watched = true;
            } else {
                watchlist[id].watched = false;
            }
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
        })
    })
}