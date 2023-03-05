<script lang="ts">
	import {
		// InteractiveObject,
		T
		// type ThreltePointerEvent
	} from '@threlte/core';
	import { Editable } from '@threlte/theatre';
	import GeometryConverter from './GeometryConverter.svelte';
	import { syncSceneToCode } from './globalState';
	import MaterialConverter from './MaterialConverter.svelte';

	export let mesh: any;

	// function handleClick(evt: CustomEvent<ThreltePointerEvent>) {
	// 	selected.update(currentID => currentID === mesh.meshID ? null : mesh.meshID)
	// }

	const meshEditorLabel = `Mesh_${mesh.geometry.type}_${mesh.geometry.id} / mesh`;
	const materialEditorLabel = `Mesh_${mesh.geometry.type}_${mesh.geometry.id} / material`;
</script>

<T.Mesh>
	<Editable name={meshEditorLabel} transform controls on:change={syncSceneToCode} />

	<GeometryConverter geometry={mesh.geometry} />
	<MaterialConverter material={mesh.material} {materialEditorLabel} />

	<!-- <InteractiveObject interactive object={meshRef} on:click={handleClick} /> -->
</T.Mesh>
