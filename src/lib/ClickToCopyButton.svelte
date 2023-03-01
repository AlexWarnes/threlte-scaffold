<script lang="ts">
	import { onMount } from 'svelte';
	export let elementID: string;
	let copyImportStatus: 'IDLE' | 'SUCCESS' = 'IDLE';
	let copyTemplateStatus: 'IDLE' | 'SUCCESS' = 'IDLE';

	let clickToCopy = (elementID: string): any => null;
	onMount(() => {
		if (window.navigator) {
			clickToCopy = (elementID: string): any => {
        console.log("copy from elementID:", elementID)
				window.navigator.clipboard
					//@ts-ignore
					.writeText(document.getElementById(elementID).innerText)
					.then(() => {
						console.log('Copied!');
						if (elementID.includes('imports')) {
							copyImportStatus = 'SUCCESS';
							setTimeout(() => (copyImportStatus = 'IDLE'), 4000);
						}
						if (elementID.includes('template')) {
							copyTemplateStatus = 'SUCCESS';
							setTimeout(() => (copyTemplateStatus = 'IDLE'), 4000);
						}
					})
					.catch((err) => console.log('Error copying code', err));
			};
		}
	});
</script>

<button
	on:click={() => clickToCopy(elementID)}
	class:primary={copyImportStatus === 'SUCCESS'}
	class:secondary={copyImportStatus !== 'SUCCESS'}
	class="copy-btn"
>
	<span>{copyImportStatus === 'SUCCESS' ? 'Copied!' : 'Copy'}</span>
</button>

<style>
	.copy-btn {
		border: 2px solid transparent;
		margin: 0 0 1rem 0;
		padding: 0.5rem 0.75rem;
		width: 9rem;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		cursor: pointer;
	}
	/* .copy-btn.success {
		border: 2px solid #fafbfc;
		background-color: darkcyan;
		color: #fafbfc;
	} */
</style>
