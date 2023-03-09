<script>
	import { T, OrbitControls } from '@threlte/core';
	import { Grid } from '@threlte/extras';
	import { meshes, lights, settings, transformMode, transformSnap, setSelection } from './globalState';
	import { useKeyboardControls } from 'svelte-kbc';
	import Effects from './Effects.svelte';
	import MeshConverter from './MeshConverter.svelte';
	import LightConverter from './LightConverter.svelte';
	import { onMount } from 'svelte';
	import { materials } from './materialHelpers';

	/**
	 * TODO:
	 * - update light props in state
	 * - refactor tp for sgProps and stateProps
	 * - bring scene settings down to action menu
	 * - allow decoupled materials 
	 * - create new material on mesh 
	 * - allow for material switching on mesh
	 * - provide full material lib in action menu
	 * - provide input for renaming materials in lib
	*/

	onMount(() => {
		setSelection($meshes[0]?.id)
	})

	const { t, r, s, shift } = useKeyboardControls();
	$: if ($t) transformMode.set('translate');
	$: if ($r) transformMode.set('rotate');
	$: if ($s) transformMode.set('scale');
	$: if ($shift) {
		transformSnap.set(0.5);
	} else {
		transformSnap.set(null);
	}

	// $: console.log("$lights", $lights)
	// $: console.log("$meshes", $meshes)
	// $: console.log("$materials", $materials)
</script>

<T.PerspectiveCamera makeDefault position={[-8, 4, 8]} fov={55}>
	<OrbitControls />
	<Effects />
</T.PerspectiveCamera>

<T.Mesh userData={{ name: 'background' }}>
	<T.SphereGeometry args={[500]} />
	<T.MeshBasicMaterial color={$settings.bgColor} side={1} />
</T.Mesh>

{#each $meshes as mesh (mesh.id)}
	<MeshConverter {...mesh} />
{/each}

{#each $lights as light (light.id)}
	<LightConverter {...light} />
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
