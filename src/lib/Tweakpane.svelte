<script lang="ts">
	import type { ThrelteContext } from '@threlte/core';
	import {
		syncSceneToCode,
	} from './globalState';
	import { Pane } from 'tweakpane';
	import { onDestroy, onMount, } from 'svelte';

	import { ColorGUIHelper } from './Helpers';
	export let ctx: ThrelteContext;
	export let objectData: any;
	export let propKeys: any[] = [];
	export let matKeys: any[] = [];
	export let title: string = '';

  let preventSync = false;
	let containerRef: HTMLElement;
	let pane: Pane;

	const matWillNeedUpdate: any = {
		transparent: true,
		flatShading: true
	};

	onMount(() => {
		initPane(containerRef);
	});

	function initPane(container: HTMLElement) {
		// console.log('initPane:', { objectData, propKeys, matKeys, title });
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

		// Add material inputs if present
		if (matKeys.length) {
			const mat = pane.addFolder({
				title: 'Material',
				expanded: true
			});

			// Add the inputs to the mat folder
			matKeys.forEach((key) => {
				if (objectData.material[key]?.isColor) {
					mat.addInput(new ColorGUIHelper(objectData.material, key), 'value', { label: key });
				} else if (matWillNeedUpdate[key]) {
					mat
						.addInput(objectData.material, key, { step: 0.1 })
						.on('change', () => (objectData.material.needsUpdate = true));
				} else {
					mat.addInput(objectData.material, key, { step: 0.1 });
				}
			});
		}

		pane.addSeparator();
		pane.on('change', handleChange);
	}

	function handleChange() {
    if (preventSync) return;
		ctx.invalidate();
		syncSceneToCode();
	}

	$: if (objectData && pane) {
    preventSync = true;
		pane.refresh();
    setTimeout(() => preventSync = false)
	}

	onDestroy(() => {
		pane.dispose();
	});
</script>

<div id="tweakpane-container" bind:this={containerRef} />
