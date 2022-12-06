<script lang="ts">
    import { errorMessage } from './AppStore';
    import { onMount } from 'svelte';

    let errorMessageDiv

    onMount(() => {
        if ($errorMessage.length > 0) {
            errorMessageDiv.style.display = "inline-block"
            errorMessageDiv.innerHTML = $errorMessage
        } else {
            errorMessageDiv.style.display = "none"
        }
      })
</script>


<main>
    <h3 id="errorMessage" bind:this={errorMessageDiv}>
    </h3>
</main>