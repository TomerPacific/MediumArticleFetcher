<script lang="ts">

    import { userProfile, userName } from './AppStore';
    import { onMount } from 'svelte';
    import { UserProfile } from './UserProfile';

    let userProfileDiv
    let username

    onMount(() => {
        userProfile.subscribe(profile => {
            if (profile !== undefined) {
                populateUserData(profile)
            }
        })

        userName.subscribe(name => {
            username = name
        })
    })

    function populateUserData(userData: UserProfile) {
    let anchorElement = document.createElement('a');
    let userAvatar = document.createElement('img'); 
    let userName = document.createElement('h2');

    userName.innerHTML = username;
    userName.setAttribute('id', 'username');

    userAvatar.setAttribute('src', userData.profileImg);
    userAvatar.setAttribute('id', 'userAvatar');
    userAvatar.style.width = '200px';
    userAvatar.style.height = '200px';

    anchorElement.href = userData.profileLink;
    anchorElement.setAttribute('target', '_blank');
    anchorElement.appendChild(userAvatar);

    userProfileDiv.appendChild(userName);
    userProfileDiv.appendChild(anchorElement);
}

</script>

<main>
    <div id="userProfile" bind:this={userProfileDiv}></div>
</main>