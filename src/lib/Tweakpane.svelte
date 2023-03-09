<script lang="ts">
	import type { ThrelteContext } from '@threlte/core';
	import { selectionDetails, syncSceneToCode } from './globalState';
	import { materials, updateMaterialByID } from './materialHelpers';
	import { Pane } from 'tweakpane';
	import { onDestroy, onMount } from 'svelte';

	import { ColorGUIHelper } from './Helpers';
	import type { ProtoGeometry, ProtoMaterial, ProtoMesh } from './models';
	export let ctx: ThrelteContext;
	export let objectData: any;
	export let propKeys: any[] = [];
	export let title: string = '';
	export let materialID: string;

	let preventSync = false;
	let containerRef: HTMLElement;
	let pane: Pane;

	onMount(() => {
		initPane(containerRef);
	});

	function initPane(container: HTMLElement) {
		console.log('initPane:', { objectData, propKeys, materialID, title });
		pane = new Pane({
			container,
			title
		});

		// Add top level inputs
		propKeys.forEach((key) => {
			if (objectData[key]?.isColor) {
				pane.addInput(new ColorGUIHelper(objectData, key), 'value', { label: key });
			} else {
				pane.addInput(objectData, key, {
					step: 0.1,
					x: { step: 0.1 },
					y: { step: 0.1 },
					z: { step: 0.1 }
				});
			}
		});

		if (materialID) {
			const mat = pane.addFolder({
				title: 'Material',
				expanded: true
			});

			Object.keys($materials[materialID].props).forEach((key) => {
				mat.addInput($materials[materialID].props, key, { step: 0.1 }).on('change', (evt) => {
					updateMaterialByID(materialID, evt.presetKey as keyof ProtoMaterial, evt.value);
				});
			});
		}

		pane.addSeparator();
		pane.on('change', handleChange);
	}

	function handleChange() {
		if (preventSync) return;
		// TODO: remove after updating light props in state
		ctx.invalidate();
		syncSceneToCode();
	}

	$: if (objectData && pane) {
		// Refresh pane when data changes in scene graph (like when TransformControls move)
		console.log('refresh pane');
		preventSync = true;
		pane.refresh();
		setTimeout(() => (preventSync = false));
	}

	onDestroy(() => {
		pane.dispose();
	});
</script>

<div id="tweakpane-container" bind:this={containerRef} />
