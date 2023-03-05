<script lang="ts">
	import { onDestroy } from 'svelte';
	import { addMesh, materials, meshes, deleteMesh } from './globalState';
	import type { ProtoGeometryType, ProtoMaterial } from './models';

	let showDeleteMenu = false;
	let geoType: ProtoGeometryType = 'Box';
	let matID: string = '001';
	let geoOptions: ProtoGeometryType[] = [
		'Box',
		'Sphere',
		'Octahedron',
		'Dodecahedron',
		'Icosahedron',
		'Torus',
		'Torus Knot'
	];
	let matOptions: ProtoMaterial[] = Object.values($materials);

	onDestroy(() => {
		showDeleteMenu = false;
	});
</script>

<div class="container">
	<div class="delete-mesh-row panel">
		<button on:click={() => (showDeleteMenu = !showDeleteMenu)} class="delete-menu">Delete ></button
		>
		{#if showDeleteMenu}
			<div class="current-meshes panel">
				{#each $meshes as mesh (mesh.id)}
					<button class="delete-mesh" on:click={() => deleteMesh(mesh.geometry.id)}>x {mesh.id}</button>
				{:else}
					<span>No Lights</span>
				{/each}
			</div>
		{/if}
	</div>

	<div class="add-mesh-row panel">
		<label
			>Geometry
			<select bind:value={geoType}>
				{#each geoOptions as opt}
					<option value={opt}>{opt}</option>
				{/each}
			</select>
		</label>
		<label
			>Material
			<select bind:value={matID}>
				{#each matOptions as opt}
					<option value={opt.id}>{opt.type}</option>
				{/each}
			</select>
		</label>
		<button class="primary" on:click={() => addMesh(geoType, matID)}>Add Mesh</button>
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
	.add-mesh-row {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.delete-mesh-row {
		width: 100%;
	}
	.current-meshes {
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
		transition: background-color 0.2s ease;
	}
	button.delete-mesh {
		border: none;
		background-color: #ff000028;
		color: inherit;
		padding: 0.375rem;
	}
	button.delete-mesh:hover {
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
