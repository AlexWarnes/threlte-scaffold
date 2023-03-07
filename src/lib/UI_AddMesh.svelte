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
    align-items: flex-end;
    gap: 1rem;
	}
	button {
    cursor: pointer;
    transition: background-color .2s ease;
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
