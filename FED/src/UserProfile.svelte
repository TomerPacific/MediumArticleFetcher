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
                <a href="{$userProfile.profileLink}" target="_blank" rel="noreferrer">{$userName}</a>
            </h2>
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