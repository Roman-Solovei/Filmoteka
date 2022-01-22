import './sass/main.scss';
import UeScroll from 'ue-scroll-js';

UeScroll.init();

import { renderMarkup,onFormSubmit} from '../src/js/markup';
import { onToggleModal, onBackdropClose, onHiddenModal } from './js/modal-film';
import { toggleModalTeam } from '../src/js/modal-team';
import { renderModalFilm } from '../src/js/markup';
// локальні імпорти
import { header, mainContainer, team } from "../src/js/refs.js";
import { checkAuth } from '../src/js/auth.js';
import { onBtnHomeClick, onBtnLibraryClick, onBtnWatchedClick, onBtnQueueClick, onHeaderButtonClick, homePageRender, fetchMovies, onInputInput } from '../src/js/header.js';
import { ApiService } from "./js/API-service";
const apiService = new ApiService();

checkAuth();

renderMarkup(apiService.fetchTrendingFilms()); 
renderModalFilm();


header.btnHome.addEventListener('click', onBtnHomeClick);
header.form.addEventListener('submit', onFormSubmit);
header.btnLibrary.addEventListener('click', onBtnLibraryClick);
header.btnWatched.addEventListener('click', onBtnWatchedClick);
header.btnQueue.addEventListener('click', onBtnQueueClick);
header.headerButton.addEventListener('click', onHeaderButtonClick);
header.input.addEventListener('input', onInputInput);

mainContainer.backdrop.addEventListener('click', onBackdropClose);
mainContainer.closeModal.addEventListener('click', onToggleModal);
mainContainer.filmClickListener.addEventListener('click', onHiddenModal);

// modal-team
team.openModalTeam.addEventListener('click', toggleModalTeam);
team.closeModalTeam.addEventListener('click', toggleModalTeam);


