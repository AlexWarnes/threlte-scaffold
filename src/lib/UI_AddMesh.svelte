<script lang="ts">
	import { addMesh, materials } from './globalState';
	import type { ProtoGeometryType, ProtoMaterial, ProtoMaterialType } from './models';

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
</script>

<div class="add-mesh-container panel">
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

<style>
  .add-mesh-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
  }
  label {
    margin: 0 0.5rem;
  }

  select {
    display: block;
  }

</style>