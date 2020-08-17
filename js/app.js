let players = [];
let months = generateCalendarDates(2020);
const form = document.querySelector('.form');

function generateCalendarDates(year) {
    const months = [];

    for(let month=1; month < 13; month++) {
        months.push([]);
        const daysInMonth = new Date(year, month, 0).getDate();
        for(let day = 1; day <= daysInMonth; day++) {
            months[months.length-1].push([]);
        }
    }
    return months;
}

try {
       if (localStorage.getItem('players') == null) {
        localStorage.getItem('players') = JSON.stringify(localStorage.getItem('players'));
        const storagePlayer = JSON.parse(localStorage.getItem('players'));
        players = storagePlayer;
        players.forEach((player)=> {
            addPlayerHtml(player)
        })
       }
       else{
        const storagePlayer = JSON.parse(localStorage.getItem('players'));
        players = storagePlayer;
        players.forEach((player)=> {
            addPlayerHtml(player)
    })};
} catch(error) {
    
}

form.addEventListener('submit', function(event){
    event.preventDefault();

    const formData = new FormData(form);
    const playerData = {
        firstName: formData.get('firstname'),
        lastName: formData.get('name'),
        dateOfBirth: formData.get('birthyear'),
        position: formData.get('position'),
        important: formData.get('importantmessage'),
        id: players.length
    };

    players.push(playerData);
    addPlayerHtml(playerData);
    form.reset();

    localStorage.setItem('players', JSON.stringify(players));
});

function addPlayerHtml(player) {
    const ul = document.querySelector('.list-playerlist');
    const li = document.createElement('li');
    li.setAttribute('data-playerid', player.id);
    li.className = 'list-player';
    li.textContent= ` ${player.lastName} ${player.firstName} (${player.dateOfBirth}) (Player-ID:${player.id}) in September Nr. times in training`;
    ul.appendChild(li);

    const btn = document.createElement('button');
    btn.className = 'button-player';
    btn.textContent= `Add training-date`;
    btn.addEventListener('click', setModalContent);
    li.appendChild(btn);
}

// Modal

function setModalContent(event){
    const playerData = players[event.target.parentElement.dataset.playerid];
    console.log(playerData);
    modal.style.display = "block";
    const calendarElement = document.createElement('div');
    calendarElement.className = 'modal-calendar';
    modalContent.appendChild(calendarElement);
    months[8].forEach((day, index) => {
        const dayelement = document.createElement('p');
        dayelement.className= 'pofdate';
        dayelement.textContent = index+1;
        calendarElement.appendChild(dayelement);
        
        const playerInTraining = day.includes(playerData.id);
        console.log(playerInTraining);

        localStorage.setItem('playerInTraining', JSON.stringify(playerInTraining));

        const calendarBtn = document.createElement('button');
        calendarBtn.className = 'button-calendar';
        dayelement.appendChild(calendarBtn);
        calendarBtn.addEventListener('click', function(){
            months[8][index].push(playerData.id);
            const daypush = document.createElement('p');
            daypush.className= 'pofcontent';
            daypush.textContent = `${playerData.firstName} ${playerData.lastName} was in the training`;
            dayelement.appendChild(daypush);

            if (playerInTraining == true){
              countTraining();
              console.log(inTraining)
            }
        });
        function countTraining(){
        let inTraining = 0;
        inTraining += 1;
        calendarElement.innerHTML = inTraining;
             
        }
    });
}

// close Modal
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const closeBtn = document.querySelector(".close-btn");

closeBtn.addEventListener('click', function(){
    modal.style.display = "none";
    document.querySelector('.modal-calendar').remove();
});

window.addEventListener('click', function(event){
    if(event.target == modal){
        modal.style.display = "none";
        document.querySelector('.modal-calendar').remove();
    }
});

// let result = 0;
// if (playerInTraining == true){
// result += result;
// return result;
// }
// console.log(result);