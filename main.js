
const GET_REQUEST = "GET";
const READY_STATE_OK = 4;
const RESPONSE_STATUS_OK = 200;
const ENTER_KEY_CODE = 13;
const ENDPOINT = "https://medium-fetcher.herokuapp.com/medium/";

let request = null;
let articles = [];

let userProfileDiv = document.getElementById('userProfile');
let articlesList = document.getElementById('articles');
let spinner = document.getElementById('spinner');
let username = document.getElementById('username');
let errorHeader = document.getElementById('errorMessage');

username.addEventListener("keyup", function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
        event.preventDefault();
        fetchMediumRSSFeed();
    }
});

function fetchArticles() {
    request = new XMLHttpRequest();
    let url = ENDPOINT + username.value;
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
                let errorMsg = this.status.statusText ? this.status.statusText : "Error in response";
                reject(errorMsg);
            }
        }
    });
    
}

function fetchMediumRSSFeed() {

    if (username.value.length === 0) {
        return;
    }

    resetContent();
    fetchArticles()
    .then(function(response) {
        let userData = getUserDataFromResponse(response.message);
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
        if (mediumArticle.description) {
            article.imgSrc = extractImageUrl(mediumArticle.description);
        }
       
        articles.push(article);
        article = {};
    }
}

function extractImageUrl(text) {
    let srcIndex = text.indexOf("src");
    let widthIndex = text.indexOf("width");
    let imageSoruce = text.substring(srcIndex + 5, widthIndex - 2);
    return imageSoruce;
}


function populateUserData(userData) {
    let anchorElement = document.createElement('a');
    let userAvatar = document.createElement('img'); 
    let userName = document.createElement('h2');

    userName.innerHTML = username.value;
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

        if (article.imgSrc) {
            let articleImage = document.createElement('img'); 
            articleImage.src = article.imgSrc;
            articleImage.setAttribute('class', 'articleImg');
            anchorElem.appendChild(articleImage);
        } else {
            anchorElem.innerHTML = article.title;
        }

        liElem.appendChild(anchorElem);
        articlesList.appendChild(liElem);
    }
}
