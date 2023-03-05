<script>
	import { T, OrbitControls } from '@threlte/core';
	import { Grid } from '@threlte/extras';

	import Effects from './Effects.svelte';
	import { meshes, lights, settings } from './globalState';
	import MeshConverter from './MeshConverter.svelte';
	import LightConverter from './LightConverter.svelte';
	import { Editable } from '@threlte/theatre';
</script>

<T.PerspectiveCamera makeDefault position={[0, 5, 15]}>
	<OrbitControls />
	<Effects />
</T.PerspectiveCamera>

<!-- <T.Mesh>
	<T.IcosahedronGeometry />
	<T.MeshStandardMaterial color="red" />
</T.Mesh> -->
<T.Mesh>
	<T.SphereGeometry args={[500]} />
	<T.MeshBasicMaterial color="black" side={1} let:ref>
		<Editable name="Background" color />
	</T.MeshBasicMaterial>
</T.Mesh>
{#each $meshes as mesh, idx (mesh.id)}
	<MeshConverter {mesh} />
{/each}

{#each $lights as light (light.id)}
	<LightConverter {light} />
{/each}

{#if $settings.showGrid}
	<Grid
		infiniteGrid
		fadeDistance={50}
		cellColor="#fafbfc"
		sectionColor="darkcyan"
		userData={{ isThrelteGrid: true }}
	/>
{/if}
