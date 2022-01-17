import { ApiService } from "./API-service";
import { API_IMG } from "./const";
import Notiflix from 'notiflix'





import { galleryContainer,notificationFailureText } from "./refs";
console.log();
import filmCard from "../markup-template/filmCard.hbs";
import { result } from "lodash";

const apiService = new ApiService();
let dataArray = [];


export function onFormSubmit(event) {
    event.preventDefault();
       
    const moviesQuery = event.currentTarget.elements.movies.value;
    let trimedSearchedMovies = apiService.searchedMovies.trim() 
    apiService.searchedMovies = moviesQuery;
 
    if (!moviesQuery) {
        return
    }
    if (moviesQuery === " ") {
    
        return
    }

   
         apiService.fetchMoviesResults().then(resultsNotification).catch(error => { Notiflix.Notify.failure(error)}) ;
    // apiService.fetchMovies().then(result => console.log(result));
  
  
  
    apiService.resetPage();

}

function renderSearchMarkup() {
    dataArray = [];
        apiService.fetchMovies().then(data => {
        apiService.getGenres().then(({ genres }) => {
    data.results.forEach(({ id, title, genre_ids, poster_path, release_date }) => {
        const filterResult = filterGenres(genre_ids, genres);
        responseProcessing(id, title, filterResult, poster_path, release_date);
        });
        }).then(next => {
            const markup = filmCard(dataArray);
            appendMarkup(markup);
        }).catch(console.log);
        }).catch(console.log);
    clearGallery();
}

export function renderMarkup(fetchFunc) {
    fetchFunc.then(data => {
      
        apiService.getGenres().then(({ genres }) => {
    data.results.forEach(({ id, title, genre_ids, poster_path, release_date }) => {
        const filterResult = filterGenres(genre_ids, genres);
        responseProcessing(id, title, filterResult, poster_path, release_date);
        });
        }).then(next => {
            const markup = filmCard(dataArray);
            appendMarkup(markup);
        }).catch(console.log);
    }).catch(console.log);
}

function appendMarkup(element) {
    galleryContainer.insertAdjacentHTML("beforeend", element); 
}

function responseProcessing(id, name, genres, imgPath, date) {
   
    const keyData = {     
        name, id, genres, img: `${API_IMG.BASIC_URL}${API_IMG.FILE_SIZE}${imgPath}`, date
    }
    if (!imgPath) {
        keyData.img = "https://cdn1.savepice.ru/uploads/2022/1/17/453f010a7f25f43caeef9a5146541a6c-full.jpg"
    };
    const year = !keyData.date ? "unknown" : keyData.date.slice(0,4);
    keyData.date = year;

    dataArray.push(keyData);

}

function filterGenres(conditions, array) {
    const filter = array.filter(item => conditions.includes(item.id)).map(obj => obj.name);
       if (filter.length > 2) {
            filter.splice(2);
       }
    return filter;
}


function clearGallery(){
    galleryContainer.innerHTML = '';
}

function resultsNotification(results) {
    if (results.length === 0) {
        notificationFailureText.classList.remove('is-hidden');
        setTimeout(() => {
            notificationFailureText.classList.add('is-hidden')
        }, 5000);
   
    }
    if (results.length >= 1) {
        notificationFailureText.classList.add('is-hidden');
        renderSearchMarkup();
     }
}



