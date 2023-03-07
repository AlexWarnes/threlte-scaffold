<script>
	import { T, OrbitControls } from '@threlte/core';
	import { Grid } from '@threlte/extras';

	import Effects from './Effects.svelte';
	import { meshes, lights, settings, transformMode, transformSnap } from './globalState';
	import MeshConverter from './MeshConverter.svelte';
	import LightConverter from './LightConverter.svelte';
	import { Editable } from '@threlte/theatre';
	import { useKeyboardControls } from 'svelte-kbc';
	const { t, r, s, shift } = useKeyboardControls();

	$: if ($t) transformMode.set('translate');
	$: if ($r) transformMode.set('rotate');
	$: if ($s) transformMode.set('scale');
	$: if ($shift) {
		transformSnap.set(0.5);
	} else {
		transformSnap.set(null);
	}
</script>

<T.PerspectiveCamera makeDefault position={[0, 5, 15]}>
	<OrbitControls />
	<Effects />
</T.PerspectiveCamera>

<!-- <T.Mesh>
	<T.IcosahedronGeometry />
	<T.MeshStandardMaterial color="red" />
</T.Mesh> -->
<T.Mesh userData={{ name: 'background' }}>
	<T.SphereGeometry args={[500]} />
	<T.MeshBasicMaterial color="black" side={1} let:ref>
		<!-- <Editable name="Background" color /> -->
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
		cellColor="#bbbcc4"
		sectionColor="#006a6a"
		userData={{ isThrelteGrid: true }}
	/>
{/if}
