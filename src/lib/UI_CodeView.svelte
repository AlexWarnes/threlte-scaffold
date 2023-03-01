<script lang="ts">
	import type { ThrelteContext, ThrelteRootContext } from '@threlte/core';
	import { getContext, onDestroy, onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { addMesh, editablePropsByMaterial, updateScene } from '$lib/globalState';
	import type { Euler, Material, Vector3 } from 'three';
	import ClickToCopyButton from './ClickToCopyButton.svelte';

	export let ctx: ThrelteContext;
	let objects: any[] = [];
	let show = false;

	function filterObjects(ctx: ThrelteContext) {
		if (ctx?.scene) {
			return ctx?.scene.children.filter((obj: any) => obj.isMesh && !obj.userData.isThrelteGrid);
		} else {
			return [];
		}
	}
	const handleKeydown = (evt: any) => {
		if (evt && evt.key && evt.key === 'Enter') {
			show = !show;
		}
	};

	// TODO: global incrementer to trigger scene sync. Update on any changes
	// $: if (updateScene) objects = filterObjects(ctx);

	let intervalID: ReturnType<typeof setInterval>;
	onMount(() => {
		intervalID = setInterval(() => {
			// setTimeout(() => {
			objects = filterObjects(ctx);
		}, 250);
	});

	onDestroy(() => {
		if (intervalID) clearInterval(intervalID);
	});

	const v3ToPropString = (v3: Vector3 | Euler) => {
		return `[${v3.x.toFixed(2)}, ${v3.y.toFixed(2)}, ${v3.z.toFixed(2)}]`;
	};

	const materialPropsToString = (mat: Material | any) => {
		const propKeys = editablePropsByMaterial[mat.type];
		let matString = ``;
		// TODO: do not render if default value
		for (let key of propKeys) {
			if (typeof mat[key] === 'boolean') {
				matString += `\n\t${key}={${mat[key]}}`;
			} else if (typeof mat[key] === 'number') {
				matString += `\n\t${key}={${mat[key].toFixed(2)}}`;
			} else if (typeof mat[key] === 'string') {
				matString += `\n\t${key}="${mat[key]}"`;
			} else if (key === 'userData') {
				matString += `\n\t${key}={${JSON.stringify(mat[key], null, 2)}}`;
			} else if (key === 'color' || mat[key].isColor) {
				matString += `\n\t${key}="#${mat[key].getHexString()}"`;
			} else {
				matString += `\n\t${key}={${v3ToPropString(mat[key])}}`;
			}
		}
		return matString;
	};
</script>

<div class="panel">
	<div
		class="header"
		on:click={() => (show = !show)}
		role="button"
		aria-haspopup="menu"
		tabindex="0"
		on:keydown={handleKeydown}
	>
		<h2>Code Viewer</h2>
	</div>
	{#if show}
		<div class="content-box" transition:slide>
			<h3>Threlte</h3>
			<ClickToCopyButton elementID="scaffold-code" />
			<pre id="scaffold-code">
{`<Canvas>`}

    {#each objects as obj}
					{`
  <T.${obj.constructor.name}
    position={${v3ToPropString(obj.position)}}
    rotation={${v3ToPropString(obj.rotation)}}
    scale={${v3ToPropString(obj.scale)}}
  >
    <T.${obj.geometry.type} />
    <T.${obj.material.type} ${materialPropsToString(obj.material)}
    />

  </T.${obj.constructor.name}>
          `}
				{/each}

{`</Canvas>`}

  		</pre>
		</div>
	{/if}
</div>

<style>
	.panel {
		width: 50vw;
		max-width: 800px;
		max-height: 50vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		padding: 0;
	}
	.header {
		padding: 1.125rem;
		cursor: pointer;
	}
	.header h2 {
		margin: 0;
	}

	.content-box {
		padding: 1.125rem 1.125rem 0;
		transform-origin: bottom;
		overflow: hidden;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	pre {
		font-size: 16px;
		font-family: monospace;
		background-color: #000000b3;
		border-radius: 3px;
		box-shadow: var(--theater-shadow);
		padding: 0.5em;
		color: #fafbfc;
		overflow: auto;
	}
</style>
