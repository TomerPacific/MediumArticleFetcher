<script lang="ts">

    import { fetchMediumRSSFeed } from './fetchService';
    import type { ServerResponse } from './serverResponse';
    import { shouldShowSpinner, errorMessage, userProfile, userName, articles } from './AppStore';
    import { UserProfile } from './UserProfile';
    import type { Article } from './article'
    import { ENTER_KEY } from './constants'

    let username = "";

    function fetchArticlesByUsername() {
        if (username.length === 0) {
            return;
        }

        $shouldShowSpinner = true
        $userName = username
        
        fetchMediumRSSFeed(username)
        .then(function(response: ServerResponse) {
            $shouldShowSpinner = false
            let userData: UserProfile = new UserProfile(response.message.link, response.message.image);
            $userProfile = userData
            let filteredArticles = filterArticlesFromResponse(response.message.items)
            $articles = filteredArticles
        })
        .catch(function(errMessage) {
            $shouldShowSpinner = false
            $errorMessage = errMessage
        })
    }

    function filterArticlesFromResponse(mediumArticles: Article[]) : Article[] {
        //If an item does not have a category attribute it is not an article
        let filteredArticles = mediumArticles.filter(function(article: Article) {
            return article.hasOwnProperty('category');
        });

        return filteredArticles;
    } 

    function handleOnKeyDownPressed(event) {
        if (event.key === ENTER_KEY || event.code === ENTER_KEY) {
            fetchArticlesByUsername()
        }
    }

</script>

<svelte:window on:keydown={handleOnKeyDownPressed}/>


<main>
    <div id="userInput">
        <input id="username" type="text" placeholder="Username?" bind:value={username}/><button id="search" on:click={fetchArticlesByUsername}>Search</button>
    </div>
</main>


<style>

</style>