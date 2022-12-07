<script lang="ts">
    import { errorMessage } from './AppStore';
</script>

<main>
    <h3 class="errorMessage" class:show="{$errorMessage}">
        {$errorMessage}
    </h3>
</main>

<style>
    .errorMessage {
        display: none;
    }

    .errorMessage.show {
        display: inline-block;
    }
</style>