
const results = document.querySelector('#results');
const charactersList = document.getElementById('people');

const searchBar = document.getElementById('searchBar');
let swCharacters = [];

// Search for people and display results in the DOM

searchBar.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCharacters = swCharacters.filter(character => {
        return (
            character.name.toLowerCase().includes(searchTerm)
        );
    });
    displayCharacters(filteredCharacters);
});

function search_test() {
    let input = document.getElementById('searchBar').value
    input=input.toLowerCase();
    console.log(input);
    let x = document.getElementsByClassName('per');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";                 
        }
    }
}

async function asyncFetch(value) {
    try {
        const res = await fetch(`https://swapi.dev/api/${value}/`);
        const data = await res.json();
        displayResults(data, value)
    } catch(err) {
        console.log(err);
    }
};

const displayCharacters = (person) => {
    const htmlString =person
        .map((person) => {
            return `
            <li class="person">
                <h2>${person.name}</h2>
            </li>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};

function displayResults(data, value) {
    let output = '';
    console.log(data);
    if (value === 'people') {
        data.results.forEach(person => {
            output += `
            <ul class="unstyled" style="list-style-type:none;">
            <li class="per">
            <div class="card p-3 m-3" style = "opacity:.8">
                
                <h4 class="card-title text-center">${person.name}</h4>
                <div class="card-content">
                    <span style="text-decoration: underline;">Height:</span> ${person.height}
                    <span style="text-decoration: underline;">Mass:</span> ${person.mass}
                    <span style="text-decoration: underline;">Hair Color:</span> ${person.hair_color}
                </div>

            </div>
            </li>
            </ul>
            `
        })
    }
    if (value === 'planets') {
        data.results.forEach(item => {
            output += `
            <ul class="unstyled" style="list-style-type:none;">
            <li class="per">
            <div class="card p-3 m-3" style = "opacity:.8">
                <h4 class="card-title text-center">${item.name}</h4>
                <div class="card-content">
                    <span style="text-decoration: underline;">Rotation Period:</span> ${item.rotation_period}
                    <span style="text-decoration: underline;">Orbital Period:</span> ${item.orbital_period}
                    <span style="text-decoration: underline;">Diameter:</span> ${item.diameter}
                </div>
            </div>
            </li>
            </ul>
            `
        })
    }
    if (value === 'starships') {
        data.results.forEach(ship => {
            output += `
            <ul class="unstyled" style="list-style-type:none;">
            <li class="per">
            <div class="card p-3 m-3" style = "opacity:.8">
                <h4 class="card-title text-center">${ship.name}</h4>
                <div class="card-content">
                    <span style="text-decoration: underline;">Model:</span> ${ship.model}
                    <span style="text-decoration: underline;">Manufacturer:</span> ${ship.manufacturer}
                    <span style="text-decoration: underline;">Cost:</span> ${ship.cost_in_credits}
                </div>
            </div>
            </li>
            </ul>
            `
        })
    }
    results.innerHTML = output;
}


window.onload = function () {
    document.getElementById('d').click()
}

//event listener for buttons
document.querySelector('#buttons').addEventListener('click', e => {
    asyncFetch(e.target.textContent.trim().toLowerCase());
});


