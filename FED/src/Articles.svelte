<script lang="ts">
    import { articles } from './AppStore'
    import { onMount } from 'svelte';
    import {Article} from './article'

    let articlesList

    onMount(() => {

        articles.subscribe(data => {
            if (data.length > 0) {
                for (let articleJSON of data) {
                    let article: Article = new Article(articleJSON);
                    articlesList.appendChild(article.createArticleMarkup());
                }
            }
        })
    })
    
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