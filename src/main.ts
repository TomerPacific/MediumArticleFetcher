
import { Article } from "./article";
import { ServerResponse } from "./serverResponse";
import { UserProfile } from "./userProfile";
import { GET_REQUEST, READY_STATE_OK, RESPONSE_STATUS_OK, ENTER_KEY, ENDPOINT } from "./constants";

let userProfileDiv: HTMLElement = document.getElementById('userProfile');
let articlesList:HTMLElement = document.getElementById('articles');
let spinner: HTMLElement = document.getElementById('spinner');
let username: HTMLElement = document.getElementById('username');
let errorHeader: HTMLElement = document.getElementById('errorMessage');
let searchBtn: HTMLElement = document.getElementById('search');

username.addEventListener("keyup", function(event: KeyboardEvent) {
    if (event.key === ENTER_KEY) {
        event.preventDefault();
        fetchMediumRSSFeed();
    }
});

searchBtn.addEventListener("click", function(event: MouseEvent) {
    fetchMediumRSSFeed();
});

function fetchMediumRSSFeed() {
    if ((<HTMLInputElement>username).value.length === 0) {
        return;
    }

    resetContent();
    let articles: Article[] = [];

    fetchArticles()
    .then(function(response: ServerResponse) {
        spinner.style.display = 'none';
        let userData: UserProfile = new UserProfile(response.message.link, response.message.image);
        articles = filterArticlesFromResponse(response.message.items);
        populateUserData(userData);
        populateArticles(articles);
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
}

function fetchArticles() {
    let request: XMLHttpRequest = new XMLHttpRequest();
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

function filterArticlesFromResponse(mediumArticles: Article[]) : Article[] {
    
    //If an item does not have a category attribute it is not an article
    let filteredArticles = mediumArticles.filter(function(article: Article) {
        return article.hasOwnProperty('category');
    });

    return filteredArticles;
}

function populateUserData(userData: UserProfile) {
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

function populateArticles(articles: Article[]) {
    for(let index = 0; index < articles.length; index++) {
        let article: Article = new Article(articles[index]);
        articlesList.appendChild(article.createArticleMarkup());
    }
}
