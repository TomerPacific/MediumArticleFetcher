<script lang="ts">

    import { fetchMediumRSSFeed } from './fetchService';
    import { ServerResponse } from '../../../src/serverResponse';
    import { appStore } from './AppStore';

    let username = "";

    function fetchArticlesByUsername() {
        if (username.length === 0) {
            return;
        }

        appStore.set({shouldShowSpinner: true})
        
        fetchMediumRSSFeed(username)
        .then(function(response) {
            appStore.set({shouldShowSpinner: false})
        })
        .catch(function(errorMessage) {
            appStore.set({shouldShowSpinner: false})
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