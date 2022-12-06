<script lang="ts">
    import { errorMessage } from './AppStore';
    import { onDestroy, onMount } from 'svelte';

    let errorMessageDiv
    let unsubscribe

    onMount(() => {
        unsubscribe = errorMessage.subscribe(errMsg => {
            if (errMsg.length > 0) {
                errorMessageDiv.style.display = "inline-block"
                errorMessageDiv.innerHTML = errMsg
            } else {
                errorMessageDiv.style.display = "none"
            }
        })
      })

    onDestroy(unsubscribe)
</script>


<main>
    <h3 id="errorMessage" bind:this={errorMessageDiv}>
    </h3>
</main>