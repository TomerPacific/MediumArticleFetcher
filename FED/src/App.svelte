<script lang="ts">
  import Spinner from './Spinner.svelte';
  import UserInput from './UserInput.svelte';
  import ErrorMessage from './ErrorMessage.svelte';
</script>

<main id="container">
    <UserInput />
    <Spinner />
    <ErrorMessage />
  </main>