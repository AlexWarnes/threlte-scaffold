<script>
	import { T, OrbitControls } from '@threlte/core';
	import { Grid } from '@threlte/extras';

	import Effects from './Effects.svelte';
	import { meshes } from './globalState';
	import MeshConverter from './MeshConverter.svelte';
</script>

<T.DirectionalLight />
<T.AmbientLight />

<T.PerspectiveCamera makeDefault position={[0, 5, 15]}>
	<OrbitControls />
	<Effects />
</T.PerspectiveCamera>

<!-- <T.Mesh>
	<T.IcosahedronGeometry />
	<T.MeshStandardMaterial color="red" />
</T.Mesh> -->

<Grid
	infiniteGrid
	fadeDistance={50}
	cellColor="#fafbfc"
	sectionColor="darkcyan"
	userData={{ isThrelteGrid: true }}
/>
{#each $meshes as mesh, idx (mesh.id)}
	<MeshConverter {mesh} />
{/each}
