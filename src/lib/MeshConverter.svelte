<script lang="ts">
	import { InteractiveObject, T, TransformControls, type ThreltePointerEvent } from '@threlte/core';
	import { onMount } from 'svelte';
	import GeometryConverter from './GeometryConverter.svelte';
	import {
		selection,
		setSelection,
		syncSceneToCode,
		selectionRef,
		setSelectionRef,
		transformMode,
		transformSnap,
		allowInteractions
	} from './globalState';
	import MaterialConverter from './MaterialConverter.svelte';
	export let id: string;
	export let name: string;
	export let initialProps: any;
	export let geometry: any;
	export let materialID: any;

	let ref: any;

	function handleClick(evt: CustomEvent<ThreltePointerEvent>) {
		if ($allowInteractions) {
			setSelection(id);
		}
	}

	$: if ($selection === id) {
		setSelectionRef(ref);
	}

	onMount(() => {
		// Set new meshes as selected
		setSelection(id);

		// Set initial values on mesh ref
		const { position, rotation, scale } = initialProps;
		if (position) ref.position.set(position[0], position[1], position[2]);
		if (rotation) ref.rotation.set(rotation[0], rotation[1], rotation[2]);
		if (scale) ref.scale.set(scale[0], scale[1], scale[2]);
	});
</script>

<T.Mesh let:ref={meshRef} bind:ref>
	<GeometryConverter {geometry} />
	<MaterialConverter {materialID} />

	<InteractiveObject interactive object={meshRef} on:click={handleClick} />
	{#if $selection === id}
		<TransformControls
			on:objectChange={syncSceneToCode}
			on:mouseDown={() => allowInteractions.set(false)}
			on:mouseUp={() => setTimeout(() => allowInteractions.set(true))}
			mode={$transformMode}
			translationSnap={$transformSnap}
			scaleSnap={$transformSnap}
			rotationSnap={$transformSnap}
		/>
	{/if}
</T.Mesh>
