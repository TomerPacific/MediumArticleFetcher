<script lang="ts">
    import { userProfile, userName } from './AppStore';
</script>

<main>
    <div class="userProfile" class:show="{$userProfile}">
        {#if $userProfile !== undefined}
            <img id="userAvatar" 
            src="{$userProfile.profileImg}" 
            alt="Avatar" 
            height="200px" 
            width="200px"/>
            <h2 id="username">
                {$userName}
            </h2>
            <a href="{$userProfile.profileLink}" target="_blank" rel="noreferrer">
            </a>
        {/if}
    </div>
</main>

<style>
    .userProfile {
        display: none;
    }

    .userProfile.show {
        display: inline-block;
        margin-top: 5%;
    }
</style>