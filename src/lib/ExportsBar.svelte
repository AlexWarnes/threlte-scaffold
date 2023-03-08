<script lang="ts">
	import CarbonCode from '~icons/carbon/code';
	import UI_CodeView from '$lib/UI_CodeView.svelte';
	import type { ThrelteContext } from '@threlte/core';

	export let ctx: ThrelteContext;

	type Action = string | null;
	let showActionsFor: Action = null;
	const handleActionClick = (type: Action) =>
		(showActionsFor = showActionsFor === type ? null : type);
</script>

<div class="button-row panel">
	<button
		class="tertiary"
		class:active={showActionsFor === 'CODE'}
		on:click={() => handleActionClick('CODE')}
	>
		<CarbonCode />
		CODE</button
	>
</div>

<div class="action-panel">
	{#if showActionsFor === 'CODE'}
		<div class="tx-wrapper">
			<!-- TODO: in next Svelte release <div class="tx-wrapper" transition:slide={{ axis: 'x' }}> -->
			<UI_CodeView bind:showActionsFor {ctx} />
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
		right: 0;
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
