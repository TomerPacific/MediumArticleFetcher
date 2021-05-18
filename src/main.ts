
import { Article } from "./article";
import { ServerResponse } from "./serverResponse";

const GET_REQUEST: string = "GET";
const READY_STATE_OK: Number = 4;
const RESPONSE_STATUS_OK: Number = 200;
const ENTER_KEY_CODE: Number = 13;
const ENDPOINT: string = "https://medium-fetcher.herokuapp.com/medium/";

let request: XMLHttpRequest = null;
let articles: Article[] = [];

let userProfileDiv: HTMLElement = document.getElementById('userProfile');
let articlesList:HTMLElement = document.getElementById('articles');
let spinner: HTMLElement = document.getElementById('spinner');
let username: HTMLElement = document.getElementById('username');
let errorHeader: HTMLElement = document.getElementById('errorMessage');

username.addEventListener("keyup", function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
        event.preventDefault();
        fetchMediumRSSFeed();
    }
});

function fetchArticles() {
    request = new XMLHttpRequest();
    let url = ENDPOINT + (<HTMLInputElement>username).value;
    request.open(GET_REQUEST, url);
    request.setRequestHeader("Content-Type", "application/json");
    try {
        request.send(null);
    } catch(exception) {
        console.error(exception);
    }

    return new Promise(function(resolve, reject) {
        request.onreadystatechange = function() {
            if (this.readyState === READY_STATE_OK && this.status === RESPONSE_STATUS_OK) {
                let text = JSON.parse(this.responseText);
                resolve(text);
            } else if (this.status !== RESPONSE_STATUS_OK) {
                let errorMsg = this.statusText ? this.statusText : "Error in response";
                reject(errorMsg);
            }
        }
    });
    
}

function fetchMediumRSSFeed() {

    if ((<HTMLInputElement>username).value.length === 0) {
        return;
    }

    resetContent();
    fetchArticles()
    .then(function(response: ServerResponse) {
        let userData = getUserDataFromResponse(response);
        getArticlesFromResponse(response.message.items);
        populateUserData(userData);
        populateArticles();
        spinner.style.display = 'none';
    })
    .catch(function(errorMessage) {
        spinner.style.display = 'none';
        errorHeader.innerHTML = errorMessage.message ? errorMessage.message : "An error has occurred.";
        errorHeader.style.display = 'inline-block';
    });
}

function resetContent() {
    errorHeader.style.display = 'none';
    spinner.style.display = 'inline-block';
    userProfileDiv.innerHTML = '';
    articlesList.innerHTML = '';
    articles = [];
}

function getUserDataFromResponse(response: ServerResponse) {
    return {
        profileLink : response.message.link,
        profileImg : response.message.image
    };
}

function getArticlesFromResponse(mediumArticles: Article[]) {
    
    for(let index = 0; index < mediumArticles.length; index++) {
        let mediumArticle = mediumArticles[index];

        //If an item does not have a category attribute it is not an article
        if (!mediumArticle.hasOwnProperty('category')) {
            continue;
        }

        articles.push(mediumArticle);
    }
}

function populateUserData(userData) {
    let anchorElement = document.createElement('a');
    let userAvatar = document.createElement('img'); 
    let userName = document.createElement('h2');

    userName.innerHTML = (<HTMLInputElement>username).value;
    userName.setAttribute('id', 'username');

    userAvatar.setAttribute('src', userData.profileImg);
    userAvatar.setAttribute('id', 'userAvatar');
    userAvatar.style.width = '200px';
    userAvatar.style.height = '200px';

    anchorElement.href = userData.profileLink;
    anchorElement.setAttribute('target', '_blank');
    anchorElement.appendChild(userAvatar);

    userProfileDiv.appendChild(userName);
    userProfileDiv.appendChild(anchorElement);
}

function populateArticles() {
    for(let index = 0; index < articles.length; index++) {

        let liElem = document.createElement('li');
        let anchorElem = document.createElement('a');

        let article = articles[index];
        
        anchorElem.href = article.link;
        anchorElem.title = article.title;
        anchorElem.setAttribute('target', '_blank');
        anchorElem.innerHTML = article.title;

        liElem.appendChild(anchorElem);
        articlesList.appendChild(liElem);
    }
}
