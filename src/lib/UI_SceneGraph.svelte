<script lang="ts">
	import CarbonChevronDown from '~icons/carbon/chevron-down';
	import CarbonChevronUp from '~icons/carbon/chevron-up';
	import CarbonList from '~icons/carbon/list';
	import { lights, meshes, selection, setSelection } from './globalState';

	let isOpen = true;
	const handleKeydown = (evt: KeyboardEvent, id: string) => {
		if (evt && evt.key && evt.key === 'Enter') {
			setSelection(id);
		}
	};
	const handleHeaderKeydown = (evt: KeyboardEvent) => {
		if (evt && evt.key && evt.key === 'Enter') {
			isOpen = !isOpen;
		}
	};
</script>

<div class="panel">
	<div
		class="header"
		on:click={() => (isOpen = !isOpen)}
		role="button"
		aria-haspopup="menu"
		tabindex="0"
		on:keydown={handleHeaderKeydown}
	>
		<CarbonList />
		<h2>Scene Objects</h2>
		<span class="flex-spacer" />
		{#if isOpen}
			<CarbonChevronUp />
		{:else}
			<CarbonChevronDown />
		{/if}
	</div>
	{#if isOpen}
		<ul class="container">
			{#each $lights as light}
				<li
					on:click={() => setSelection(light.id)}
					on:keydown={(evt) => handleKeydown(evt, light.id)}
				>
					<button class="tertiary" class:selected={$selection === light.id}>
						{light.id}
					</button>
				</li>
			{/each}
			{#each $meshes as mesh}
				<li
					on:click={() => setSelection(mesh.id)}
					on:keydown={(evt) => handleKeydown(evt, mesh.id)}
				>
					<button class="tertiary" class:selected={$selection === mesh.id}>
						{mesh.id}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.panel {
		width: 200px;
		max-height: 50vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		padding: 0;
	}
	/* TODO: Componentize headers */
	.header {
		padding: 0.625rem;
		cursor: pointer;
		background-color: var(--tweak-bg-light);
		display: flex;
		justify-content: space-between;
		align-items: center;
		transition: background 0.2s ease;
	}
	.header:hover {
		/* LIGHTER EFFECT */
		background-color: var(--tweak-bg-light-hover);

		/* DARKER EFFECT */
		/* background-color: var(--active-dark); */
		/* border-color: #00000059; */
	}
	.header h2 {
		margin: 0 0 0 0.5rem;
		font-size: 0.75rem;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0.5rem;
		max-height: 100%;
		overflow: auto;
	}

	button {
		color: #b1b1b1;
		width: 100%;
		border: 1px solid transparent;
	}

	li + li {
		margin: 0.5rem 0 0;
		padding: 0;
	}

	button.selected {
		background-color: var(--active-dark);
		border-color: var(--primary);
	}

	button:not(.selected):hover {
		background-color: var(--active-dark);
		border-color: #ffffff59;
	}
</style>
