import { GET_REQUEST, READY_STATE_OK, RESPONSE_STATUS_OK, ENDPOINT } from "./constants";

export function fetchMediumRSSFeed(username: String) {
    if (username.length === 0) {
        return;
    }

    return fetchArticles(username)
}

function fetchArticles(username: String) {
    let request: XMLHttpRequest = new XMLHttpRequest();
    let url = ENDPOINT + username;
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