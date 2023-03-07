<script lang="ts">
	import UI_AddMesh from '$lib/UI_AddMesh.svelte';
	import UI_AddLight from '$lib/UI_AddLight.svelte';
	import { slide } from 'svelte/transition';

	type Action = 'MESH' | 'LIGHT' | 'SCENE' | null;
	let showActionsFor: Action = null;
	const handleActionClick = (type: Action) =>
		(showActionsFor = showActionsFor === type ? null : type);
</script>

<div class="button-row panel">
	<button
		class="tertiary"
		class:active={showActionsFor === 'MESH'}
		on:click={() => handleActionClick('MESH')}>MESH</button
	>
	<button
		class="tertiary"
		class:active={showActionsFor === 'LIGHT'}
		on:click={() => handleActionClick('LIGHT')}>LIGHT</button
	>
	<button
		class="tertiary"
		class:active={showActionsFor === 'SCENE'}
		on:click={() => handleActionClick('SCENE')}>SCENE</button
	>
</div>

<div class="action-panel">
	{#if showActionsFor === 'MESH'}
		<div class="tx-wrapper" in:slide>
			<!-- TODO: in next Svelte release <div class="tx-wrapper" transition:slide={{ axis: 'x' }}> -->
			<UI_AddMesh />
		</div>
	{/if}
	{#if showActionsFor === 'LIGHT'}
		<div class="tx-wrapper" in:slide>
			<!-- TODO: in next Svelte release <div class="tx-wrapper" transition:slide={{ axis: 'x' }}> -->
			<UI_AddLight />
		</div>
	{/if}
</div>

<style>
	.button-row {
		position: relative;
	}
	button.active {
		background-color: var(--active-dark);
		border-color: var(--primary);
	}

	.action-panel {
		position: absolute;
		bottom: 105%;
		left: 0;
	}

	button {
		/* background-color: var(--tweak-bg-dark); */
		filter: unset;
		color: #b1b1b1;
		border: 1px solid transparent;
	}

	button:not(.active):hover {
		background-color: var(--active-dark);
		border-color: #ffffff59;
	}
</style>
