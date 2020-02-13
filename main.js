
const GET_REQUEST = "GET";
const READY_STATE_OK = 4;
const RESPONSE_STATUS_OK = 200;

let request = null;

function fetchArticles() {
    request = new XMLHttpRequest();
    let url = "https://medium.com/feed/@tomerpacific";
    request.open(GET_REQUEST, url);
    request.setRequestHeader("Access-Control-Allow-Origin", "*");
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
    console.log(response);
});