<script lang="ts">
    import { articles } from './AppStore'
</script>

<main>
    
    <ul id="articles">
        {#each $articles as article}
        <li>
            <a href="{article.link}" title="{article.title}">
                {article.title}
            </a>
        </li>
        {/each}
    </ul>
</main>

<style>
    #articles {
        list-style: none;
        margin: 0;
        padding: 0;
        margin-top: 2%;
    }

    #articles > li {
        display: block;
    }

    #articles > li > a {
        text-decoration: none;
        color: black;
    }

    #articles > li > a:hover {
        color: lightslategrey;
        font-weight: bold;
    }
</style>