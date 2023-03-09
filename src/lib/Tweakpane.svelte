<script lang="ts">
	import type { ThrelteContext } from '@threlte/core';
	import { lights, meshes, selectionDetails, syncSceneToCode } from './globalState';
	import { materials } from './materialHelpers';
	import { Pane } from 'tweakpane';
	import { onDestroy, onMount } from 'svelte';

	import type { ProtoGeometry, ProtoLight } from './models';
	export let ctx: ThrelteContext;
	export let objectData: any;
	export let sceneGraphKeys: any[] = [];
	export let stateKeys: any[] = [];
	export let title: string = '';
	export let materialID: string;

	let preventSync = false;
	let containerRef: HTMLElement;
	let pane: Pane;

	onMount(() => {
		initPane(containerRef);
	});

	function initPane(container: HTMLElement) {
		// console.log('initPane:', { objectData, stateKeys, sceneGraphKeys, materialID, title });
		pane = new Pane({
			container,
			title
		});

		// Add top level inputs
		sceneGraphKeys.forEach((key) => {
			pane
				.addInput(objectData, key, {
					step: 0.1,
					x: { step: 0.1 },
					y: { step: 0.1 },
					z: { step: 0.1 }
				})
				.on('change', handleChange);
		});
		stateKeys.forEach((key) => {
			pane
				.addInput(($selectionDetails as ProtoLight | ProtoGeometry).props, key, {
					step: 0.1,
					x: { step: 0.1 },
					y: { step: 0.1 },
					z: { step: 0.1 }
				})
				.on('change', () => {
					if (objectData.isLight) $lights = $lights;
					if (objectData.isMesh) $meshes = $meshes;
					handleChange();
				});
		});

		if (materialID) {
			const mat = pane.addFolder({
				title: 'Material',
				expanded: true
			});

			Object.keys($materials[materialID].props).forEach((key) => {
				mat.addInput($materials[materialID].props, key, { step: 0.1 }).on('change', () => {
					$materials = $materials;
					handleChange();
				});
			});
		}

		pane.addSeparator();
	}

	function handleChange() {
		if (preventSync) return;
		// invalidate to register scene graph mutations
		setTimeout(() => {
			ctx.invalidate();
			syncSceneToCode();
		});
	}

	$: if (objectData && pane) {
		// Refresh pane when data changes in scene graph (like when TransformControls move)
		preventSync = true;
		pane.refresh();
		setTimeout(() => (preventSync = false));
	}

	onDestroy(() => {
		pane.dispose();
	});
</script>

<div id="tweakpane-container" bind:this={containerRef} />
