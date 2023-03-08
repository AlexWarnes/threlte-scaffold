<script lang="ts">
	import { InteractiveObject, T, TransformControls, type ThreltePointerEvent } from '@threlte/core';
	import { afterUpdate, onMount } from 'svelte';
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
	export let mesh: any;
	let ref: any;

	// let preventClickHandler = false;
	function handleClick(evt: CustomEvent<ThreltePointerEvent>) {
		if ($allowInteractions) {
			setSelection(mesh.id);
		};
	}

	$: if ($selection === mesh.id) {
		setSelectionRef(ref);
	}

	onMount(() => {
		// console.log("onMount:", mesh.id)
		// Set new meshes as selected
		setSelection(mesh.id)
	})
	
	afterUpdate(() => {
		// console.log("afterUpdate:", mesh.id)
	})
</script>

<T.Mesh let:ref={meshRef} bind:ref>
	<GeometryConverter geometry={mesh.geometry} />
	<MaterialConverter material={mesh.material} />

	<InteractiveObject interactive object={meshRef} on:click={handleClick} />
	{#if $selection === mesh.id}
		<TransformControls
			on:change={syncSceneToCode}
			on:mouseDown={() => (allowInteractions.set(false))}
			on:mouseUp={() => setTimeout(() => (allowInteractions.set(true)))}
			mode={$transformMode}
			translationSnap={$transformSnap}
			scaleSnap={$transformSnap}
			rotationSnap={$transformSnap}
		/>
	{/if}
</T.Mesh>
