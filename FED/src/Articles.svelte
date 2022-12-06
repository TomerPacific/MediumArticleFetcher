<script lang="ts">
    import { articles } from './AppStore'
    import { onMount, onDestroy } from 'svelte';
    import {Article} from './article'

    let articlesList
    let unsubscribe

    onMount(() => {

        unsubscribe = articles.subscribe(articlesJSON => {
            if (articlesJSON.length > 0 ) {
            for (let articleJSON of articlesJSON) {
                    let article: Article = new Article(articleJSON);
                    articlesList.appendChild(article.createArticleMarkup());
                }
            }
        })
    })

    onDestroy(unsubscribe)
    
</script>

<main>
    <ul id="articles" bind:this={articlesList}>

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

    .articleImg {
        width: 200px;
        height: 200px;
    }
</style>