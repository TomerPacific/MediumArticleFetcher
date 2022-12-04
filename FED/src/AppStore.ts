import { writable } from 'svelte/store'

export let shouldShowSpinner = writable(false)
export let errorMessage = writable("")
export let userProfile = writable(undefined)
export let userName = writable("")