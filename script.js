const API_KEY = `2543806db591a0c6d5959cbb07944ca0`;
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}`;


const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results);
        console.log(data)
    }).then(err => console.log(err))
}

getMovies(API_URL);

async function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <p>
                   ${overview}
                </p>
            </div>
        `

        main.appendChild(movieEl);
    });
}


function getColor(vote) {
    if ( vote => 8) {
        return 'green';
    } else if ( vote >= 5 ) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
   e.preventDefault();

   const searchTerm = search.value;

   if (searchTerm) {
       getMovies(SEARCH_URL + '&query=' + searchTerm);
   } else {
       getMovies(API_URL);
   }
});

