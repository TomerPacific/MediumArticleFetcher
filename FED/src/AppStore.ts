import { writable } from 'svelte/store'
import type { Article } from './article'

export let shouldShowSpinner = writable(false)
export let errorMessage = writable("")
export let userProfile = writable(undefined)
export let userName = writable("")
export let articles = writable([])