import { writable } from 'svelte/store'

export let appStore = writable({
    shouldShowSpinner: false,
    errorMessage: "",
})