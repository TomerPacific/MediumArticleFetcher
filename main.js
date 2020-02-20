
const GET_REQUEST = "GET";
const READY_STATE_OK = 4;
const RESPONSE_STATUS_OK = 200;

let request = null;
let articles = [];


let userProfileDiv = document.getElementById('userProfile');
let articlesList = document.getElementById('articles');
let spinner = document.getElementById('spinner');
let username = document.getElementById('username');

function fetchArticles() {
    request = new XMLHttpRequest();
    let url = "https://medium-fetcher.herokuapp.com/medium/" + username.value;
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
            }
        }
    });
    
}

function fetchMediumRSSFeed() {
    spinner.style.display = 'inline-block';
    fetchArticles().then(function(response) {
        let userData = getUserDataFromResponse(response.message);
        getArticlesFromResponse(response.message.items);
        populateUserData(userData);
        populateArticles();
        spinner.style.display = 'none';
    });
}


function getUserDataFromResponse(response) {
    return {
        profileLink : response.url,
        profileImg : response.image
    };
}

function getArticlesFromResponse(mediumArticles) {
    let article = {};
    
    for(let index = 0; index < mediumArticles.length; index++) {
        let mediumArticle = mediumArticles[index];

        //If an item does not have a category attribute it is not an article
        if (!mediumArticle.hasOwnProperty('category')) {
            continue;
        }
        
        article.title = mediumArticle.title;
        article.link = mediumArticle.url;
        article.publishDate = mediumArticle.pubDate;

        articles.push(article);
        article = {};
    }
}


function populateUserData(userData) {
    let anchorElement = document.createElement('a');
    let userAvatar = document.createElement('img'); 
    let userName = document.createElement('h2');

    userName.innerHTML = 'TomerPacific';
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
    let liElem = null;
    let anchorElem = null;
    for(let index = 0; index < articles.length; index++) {

        let liElem = document.createElement('li');
        let anchorElem = document.createElement('a');

        let article = articles[index];
        anchorElem.href = article.link;
        anchorElem.innerHTML = article.title;
        anchorElem.setAttribute('target', '_blank');

        liElem.appendChild(anchorElem);
        articlesList.appendChild(liElem);
    }
}
