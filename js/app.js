let players = [];
let months = generateCalendarDates(2020);
let playerTrainings = {};
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
    const storagePlayer = JSON.parse(localStorage.getItem('players'));
    if (storagePlayer !== null){
        players = storagePlayer;
        players.forEach((player)=> {
            addPlayerToList(player)
        });
    }

    const storageplayerTrainings = JSON.parse(localStorage.getItem('playerTrainings'));
    if (storageplayerTrainings !== null){
        playerTrainings = storageplayerTrainings;
    }

    const months = JSON.parse(localStorage.getItem('months'));
    if (storagemonths !== null){
        months = storagemonths;
    }
} catch(error) {
    console.log('No data found!')
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
    addPlayerToList(playerData);
    form.reset();

    localStorage.setItem('players', JSON.stringify(players));
});

function addPlayerToList(player) {
    const ul = document.querySelector('.list-playerlist');
    const li = document.createElement('li');
    li.setAttribute('data-playerid', player.id);
    li.className = 'list-player';
    li.textContent= `${player.lastName} ${player.firstName} (${player.dateOfBirth}) (Player-ID:${player.id}) `;
    ul.appendChild(li);
    const btn = document.createElement('button');
    btn.className = 'button-player';
    btn.textContent= `training-dates`;
    li.appendChild(btn);
    btn.addEventListener('click', setModalContent);
    
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
        const dayelement = document.createElement('div');
        dayelement.className= 'pofdate';
        // dayelement.textContent = index+1;
        const daynumber = document.createElement('p');
        const daynotice = document.createElement('p');
        const playerInTrainings = day.includes(playerData.id);
        
        if (playerInTrainings){
            daynotice.textContent = `${playerData.firstName} ${playerData.lastName} was in training`
        };
        
        daynumber.textContent = index+1;

        calendarElement.appendChild(dayelement);
        dayelement.append(daynumber, daynotice);
        
        const calendarBtn = document.createElement('button');
        calendarBtn.className = 'button-calendar';
        dayelement.appendChild(calendarBtn);
        calendarBtn.addEventListener('click', function(){
            const playerId = playerData.id;
            months[8][index].push(playerId);
            const daypush = document.createElement('p');
            daypush.className= 'pofcontent';
            daypush.textContent = `${playerData.firstName} ${playerData.lastName} was in training`;
            dayelement.appendChild(daypush);
            
            const playerTrainings = {
                [playerId]: index+1
            }

            console.log(playerTrainings);

            // playerTrainings.push()
            localStorage.setItem('playerTrainings', JSON.stringify(playerTrainings));
            localStorage.setItem('months', JSON.stringify(months));
            
        });
        
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
