<script lang="ts">
	import { onMount } from 'svelte';
	import CarbonCopy from '~icons/carbon/copy';
	export let elementID: string;
	let copyStatus: 'IDLE' | 'SUCCESS' = 'IDLE';
	let copyTemplateStatus: 'IDLE' | 'SUCCESS' = 'IDLE';

	let clickToCopy = (elementID: string): any => null;
	onMount(() => {
		if (window.navigator) {
			clickToCopy = (elementID: string): any => {
				console.log('copy from elementID:', elementID);
				window.navigator.clipboard
					//@ts-ignore
					.writeText(document.getElementById(elementID).innerText)
					.then(() => {
						console.log('Copied!');
						copyStatus = 'SUCCESS';
						setTimeout(() => (copyStatus = 'IDLE'), 4000);
					})
					.catch((err) => console.log('Error copying code', err));
			};
		}
	});
</script>

<button
	on:click={() => clickToCopy(elementID)}
	class:primary={copyStatus === 'SUCCESS'}
	class:secondary={copyStatus !== 'SUCCESS'}
	class="copy-btn"
>
	<span>{copyStatus === 'SUCCESS' ? 'Copied!' : 'Copy'}</span>
	<CarbonCopy />
</button>

<style>
	.copy-btn {
		width: 6rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
