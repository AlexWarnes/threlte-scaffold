<script lang="ts">
	import { InteractiveObject, T, TransformControls, type ThreltePointerEvent } from '@threlte/core';
	import type { Vector3Tuple } from 'three';
	import GeometryConverter from './GeometryConverter.svelte';
	import {
		selection,
		setSelection,
		syncSceneToCode,
		selectionRef,
		setSelectionRef,
		transformMode,
		transformSnap
	} from './globalState';
	import MaterialConverter from './MaterialConverter.svelte';
	export let mesh: any;
	let ref: any;

	let preventClickHandler = false;
	function handleClick(evt: CustomEvent<ThreltePointerEvent>) {
		if (preventClickHandler) return;
		setSelection(mesh.id);
	}

	$: if ($selection === mesh.id) {
		setSelectionRef(ref);
	}
</script>

<T.Mesh let:ref={meshRef} bind:ref>
	<GeometryConverter geometry={mesh.geometry} />
	<MaterialConverter material={mesh.material} />

	<InteractiveObject interactive object={meshRef} on:click={handleClick} />
	{#if $selection === mesh.id}
		<TransformControls
			on:change={syncSceneToCode}
			on:mouseDown={() => (preventClickHandler = true)}
			on:mouseUp={() => setTimeout(() => (preventClickHandler = false))}
			mode={$transformMode}
			translationSnap={$transformSnap}
			scaleSnap={$transformSnap}
			rotationSnap={$transformSnap}
		/>
	{/if}
</T.Mesh>
