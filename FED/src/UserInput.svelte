<script lang="ts">

    import { fetchMediumRSSFeed } from './fetchService';
    import { ServerResponse } from '../../../src/serverResponse';
    import { shouldShowSpinner, errorMessage, userProfile, userName } from './AppStore';
    import { UserProfile } from './UserProfile';

    let username = "";

    function fetchArticlesByUsername() {
        if (username.length === 0) {
            return;
        }

        shouldShowSpinner.set(true)
        userName.set(username)
        
        fetchMediumRSSFeed(username)
        .then(function(response: ServerResponse) {
            shouldShowSpinner.set(false)
            let userData: UserProfile = new UserProfile(response.message.link, response.message.image);
            userProfile.set(userData)
        })
        .catch(function(errMessage) {
            shouldShowSpinner.set(false)
            errorMessage.set(errMessage)
        })
    }
</script>


<main>
    <div id="userInput">
        <input id="username" type="text" placeholder="Username?" bind:value={username}/><button id="search" on:click={fetchArticlesByUsername}>Search</button>
    </div>
</main>


<style>

</style>