import { renderMarkup, renderSearchMarkup, apiService} from "./markup";

export function scrolTop(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"});
}

function oldHashPage(hash){
   return hash.slice(0,hash.indexOf('&'));
}

function oldHashSearch(hash){
    const index = hash.indexOf('&search=%22')
    if(index === -1){  return  }
    const pieceHash = hash.slice(index + 11);
    return pieceHash.slice(0,pieceHash.indexOf('%22'));   
}
function oldHashPagination(hash){
    const index = hash.indexOf('&page=%22')
    if(index === -1){  return  }
    const pieceHash = hash.slice(index + 9);
    const pagination = +(pieceHash.slice(0,pieceHash.indexOf('%22')));
    if (Number.isInteger(pagination))  { return pagination;   }
}

export function setLocation(page,search,pagination){
const hash = location.hash;
const oldPage = oldHashPage(hash);
const oldSearch = oldHashSearch(hash);

if(!!search){
    location.hash = `home&search="${search}"&page="1"`;
}
else if(!!pagination){
    console.log(oldPage);
    location.hash = !oldSearch?
    `${oldPage}&page="${pagination}"`:
     `home&search="${oldSearch}"&page="${pagination}"`;
}
else if(!!page){
    apiService.resetPage();
    location.hash = `${page}&`;
}
}

export function startNavigation(){
    const hash = location.hash;
    const oldPage = oldHashPage(hash);
const oldSearch = oldHashSearch(hash);
const oldPagination = oldHashPagination(hash);
if(!!oldPagination){
    apiService.page = oldPagination; 
}
if(!!oldSearch){ 
    apiService.searchedMovies = oldSearch;
    renderSearchMarkup()
}else if (oldPage==='home' ){
    renderMarkup(); 
}else if(oldPage==='library/watched'||oldPage==='library'){
  onBtnWatchedClick();
}else if(oldPage==='library/queue'){
    onBtnQueueClick();
}else{
    renderMarkup(); 
}
}