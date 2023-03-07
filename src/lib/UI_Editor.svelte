<script lang="ts">
	import type { ThrelteContext } from '@threlte/core';
	import { slide } from 'svelte/transition';
	import {
		deleteLight,
		deleteMesh,
		editablePropsByLight,
		editablePropsByMaterial,
		selection,
		selectionDetails,
		selectionRef,
		syncSceneToCode,
		updateScene,
		duplicateMesh
	} from './globalState';
	import { onMount } from 'svelte';
	import Tweakpane from './Tweakpane.svelte';
	import type { ProtoMesh } from './models';
	export let ctx: ThrelteContext;

	let propKeys: string[] = [];
	let matKeys: string[] = [];
	let details: any = null;

	const isMesh = (type: string) => type.toLowerCase().includes('mesh');
	const isLight = (type: string) => type.toLowerCase().includes('light');

	function handleDelete() {
		if (!details) return;
		if (isMesh(details.type)) {
			deleteMesh(($selectionDetails as ProtoMesh).geometry.id);
		} else if (isLight(details.type)) {
			deleteLight($selection as string);
		}
	}
	function handleDuplicate() {
		if (!details) return;
		if (isMesh(details.type)) {
			duplicateMesh($selectionDetails as ProtoMesh, $selectionRef);
		} else if (isLight(details.type)) {
			// deleteLight($selection as string);
		}
	}

	$: if ($updateScene) {
		details = ctx?.scene.children.find((obj) => obj.uuid === $selectionRef?.uuid);
	}

	$: if (details) {
		if (isMesh(details.type)) {
			propKeys = ['position', 'rotation', 'scale'];
			matKeys = editablePropsByMaterial[details.material.type];
		} else if (isLight(details.type)) {
			matKeys = [];
			propKeys = editablePropsByLight[details.type];
		}
	}
</script>

{#if $selection && $selectionRef && details}
	<div id="editor-panel" class="container panel">
		{#key $selection}
			<Tweakpane
				{ctx}
				objectData={details}
				{propKeys}
				{matKeys}
				title={$selection}
				on:duplicate={handleDuplicate}
				on:delete={handleDelete}
			/>
		{/key}
	</div>
{/if}

<style>
	.container {
		width: 33vw;
		max-width: 500px;
		max-height: 50vh;
		/* display: flex;
		flex-direction: column;
		padding: 0; */
	}
</style>
