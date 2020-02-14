
const GET_REQUEST = "GET";
const READY_STATE_OK = 4;
const RESPONSE_STATUS_OK = 200;

let request = null;
let userData = {};
let articles = [];


let userProfileDiv = document.getElementById('userProfile');
let articlesList = document.getElementById('articles');

function fetchArticles() {
    request = new XMLHttpRequest();
    let url = "https://medium-fetcher.herokuapp.com/medium";
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

fetchArticles().then(function(response) {
    getUserDataFromResponse(response.message);
    getArticlesFromResponse(response.message.items);
    populateUserData();
});


function getUserDataFromResponse(response) {
    userData.profileLink = response.url;
    userData.profileImg = response.image;
}

function getArticlesFromResponse(mediumArticles) {
    let article = {};
    
    for(let index = 0; index < mediumArticles.length; index ++) {
        let mediumArticle = mediumArticles[index];

        //If an item does not have a category attribute it is not an article
        if (mediumArticle.hasOwnProperty('category')) {
            continue;
        }
        
        article.title = mediumArticle.title;
        article.link = mediumArticle.url;
        article.publishDate = mediumArticle.pubDate;

        articles.push(article);
        article = {};
    }
}


function populateUserData() {
    let userAvatar = document.getElementById('userAvatar');
    let userName = document.getElementById('username');

    userName.innerHTML = 'TomerPacific';
    userAvatar.setAttribute('src', userData.profileImg);
    userAvatar.style.width = '200px';
    userAvatar.style.height = '200px';
}
