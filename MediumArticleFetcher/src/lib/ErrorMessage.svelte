<script lang="ts">
    import { errorMessage } from './AppStore';
    import { onMount } from 'svelte';

    let errorMessageDiv

    onMount(() => {
        errorMessage.subscribe(errMsg => {
            if (errMsg.length > 0) {
                errorMessageDiv.style.display = "inline-block"
                errorMessageDiv.innerHTML = errMsg
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