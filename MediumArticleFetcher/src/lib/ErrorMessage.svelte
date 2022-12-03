<script lang="ts">
    import { appStore } from './AppStore';
    import { onMount } from 'svelte';

    let errorMessageDiv

    onMount(() => {
        appStore.subscribe(data => {
            if (data.errorMessage.length > 0) {
                errorMessageDiv.style.display = "inline-block"
                errorMessageDiv.innerHTML = data.errorMessage
            } else {
                errorMessageDiv.style.display = "none"
            }
      })
    })
</script>


<main>
    <h3 id="errorMessage" bind:this={errorMessageDiv}>
    </h3>
</main>