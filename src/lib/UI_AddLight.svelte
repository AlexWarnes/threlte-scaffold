<script lang="ts">
	import { onDestroy } from 'svelte';
	import { addLight, deleteLight, lights } from './globalState';
	import type { ProtoLightType } from './models';
	import CarbonAdd from '~icons/carbon/add'

	let showDeleteMenu = false;
	let lightType: ProtoLightType = 'Ambient';
	let lightOptions: ProtoLightType[] = ['Ambient', 'Directional', 'Point', 'Hemisphere'];

	onDestroy(() => {
		showDeleteMenu = false;
	});
</script>

<div class="container">
	<div class="add-light-row panel">
		<label
			>Light
			<select bind:value={lightType}>
				{#each lightOptions as opt}
					<option value={opt}>{opt}</option>
				{/each}
			</select>
		</label>
		<button class="primary" on:click={() => addLight(lightType)}>
			<CarbonAdd />
			Add Light</button>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 0.125rem;
	}

	.add-light-row {
		display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1rem;
	}
	
	button {
		cursor: pointer;
		transition: background-color 0.2s ease;
	}
	label {
		margin: 0 0.5rem;
	}

	select {
		display: block;
	}

	button {
		white-space: nowrap;
	}
</style>
