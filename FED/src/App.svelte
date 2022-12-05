<script lang="ts">
  import Spinner from './Spinner.svelte';
  import UserInput from './UserInput.svelte';
  import ErrorMessage from './ErrorMessage.svelte';
  import UserProfile from './UserProfile.svelte';
  import Articles from './Articles.svelte';
</script>

<main id="container">
    <UserInput />
    <Spinner />
    <ErrorMessage />
    <UserProfile />
    <Articles />
  </main>