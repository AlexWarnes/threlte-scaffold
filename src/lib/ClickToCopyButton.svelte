<script lang="ts">
	import { onMount } from 'svelte';
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
</button>

<style>
	.copy-btn {
		/* border: 2px solid transparent; */
		/* margin: 0 0 1rem 0; */
		/* padding: 0.5rem 0.75rem; */
		width: 9rem;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		/* cursor: pointer; */
	}
	/* .copy-btn.success {
		border: 2px solid #fafbfc;
		background-color: var(--primary);
		color: #fafbfc;
	} */
</style>
