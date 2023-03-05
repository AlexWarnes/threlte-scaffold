<script lang="ts">
	import { onDestroy } from 'svelte';
	import { addLight, deleteLight, lights } from './globalState';
	import type { ProtoLightType } from './models';

	let showDeleteMenu = false;
	let lightType: ProtoLightType = 'Ambient';
	let lightOptions: ProtoLightType[] = ['Ambient', 'Directional', 'Point', 'Hemisphere'];

	onDestroy(() => {
		showDeleteMenu = false;
	});
</script>

<div class="container">
	<div class="delete-light-row panel">
		<button on:click={() => (showDeleteMenu = !showDeleteMenu)} class="delete-menu"
			>Delete ></button
		>
		{#if showDeleteMenu}
			<div class="current-lights panel">
				{#each $lights as light (light.id)}
					<button class="delete-light" on:click={() => deleteLight(light.id)}>x {light.id}</button>
				{:else}
					<span>No Lights</span>
				{/each}
			</div>
		{/if}
	</div>
	<div class="add-light-row panel">
		<label
			>Light
			<select bind:value={lightType}>
				{#each lightOptions as opt}
					<option value={opt}>{opt}</option>
				{/each}
			</select>
		</label>
		<button class="primary" on:click={() => addLight(lightType)}>Add Light</button>
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
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.delete-light-row {
		width: 100%;
	}
	.current-lights {
		position: absolute;
		left: 105%;
		bottom: 25%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
	}
  button {
    cursor: pointer;
    transition: background-color .2s ease;
  }
  button.delete-light {
    border: none;
    background-color: #ff000028;
    color: inherit;
    padding: 0.375rem;
  }
  button.delete-light:hover {
    background-color: #ff0000aa;
  }
  button.delete-menu {
    border: 1px solid #ff0000;
    background-color: inherit;
    color: inherit;
    width: 100%;
    text-align: left;
    padding: 0.5rem;
    border: none;
  }
  button.delete-menu:hover {
    background-color: #00000058;
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
