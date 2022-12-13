<script lang="ts">
    import { articles } from './AppStore'

    function convertTimestampToDate(timestamp:number): string {
        const date:Date = new Date(timestamp)
        const day = date.getDate()
        const month = date.getMonth()
        const year = date.getFullYear()
        return month + "/" + day + "/" + year
        
    }

</script>

<main>
    <div id="grid-container">
        {#each $articles as article}
        <div class="grid-item">
            <h4>
                <a href="{article.link}" title="{article.title}">{article.title}</a>
            </h4>
            <h5>Published on: {convertTimestampToDate(article.published)}</h5>
            <p>
                Article Categories: {article.category}
            </p>
        </div>
        {/each}
    </div>
</main>

<style>
    #articles {
        list-style: none;
        margin: 0;
        padding: 0;
        margin-top: 2%;
    }

    #grid-container {
        display: grid;
        grid-template-columns: auto auto auto;
        grid-gap: 10px;
        padding: 10px;
    }

    .grid-item {
        border: 2px solid black;
        margin: 1%;
    }

</style>