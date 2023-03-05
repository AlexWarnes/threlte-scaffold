<script lang="ts">
	import type { ThrelteContext } from '@threlte/core';
	import { slide } from 'svelte/transition';
	import { editablePropsByLight, editablePropsByMaterial, updateScene } from '$lib/globalState';
	import type { Euler, Light, Material, Mesh, Vector3 } from 'three';
	import ClickToCopyButton from './ClickToCopyButton.svelte';

	export let ctx: ThrelteContext;
	let meshes: any[] = [];
	let lights: any[] = [];
	let isOpen = false;

	function filterObjects(ctx: ThrelteContext): { meshes: any[]; lights: any[] } {
		let temp = {
			meshes: [] as any[],
			lights: [] as any[]
		};
		if (ctx?.scene) {
			for (let obj of ctx?.scene.children) {
				if ((obj as Mesh).isMesh && !obj.userData.isThrelteGrid) {
					temp.meshes.push(obj);
				} else if ((obj as Light).isLight) {
					temp.lights.push(obj);
				}
			}
		}

		return temp;
	}
	const handleKeydown = (evt: any) => {
		if (evt && evt.key && evt.key === 'Enter') {
			isOpen = !isOpen;
		}
	};

	$: if ($updateScene) {
		const objs = filterObjects(ctx);
		meshes = objs.meshes;
		lights = objs.lights;
	}

	const v3ToPropString = (v3: Vector3 | Euler) => {
		return `[${v3.x.toFixed(2)}, ${v3.y.toFixed(2)}, ${v3.z.toFixed(2)}]`;
	};

	const materialPropsToString = (mat: Material | any, prefix = '') => {
		const propKeys = editablePropsByMaterial[mat.type];
		return propsToString(mat, propKeys, prefix);
	};

	const lightPropsToString = (light: Light | any, prefix = '') => {
		const propKeys = editablePropsByLight[light.type];
		return propsToString(light, propKeys, prefix);
	};

	function propsToString(obj: any, propKeys: string[], _prefix: string) {
		const prefix = _prefix ? _prefix : `\n\t`;
		let str = ``;
		// TODO: do not render if default value
		for (let key of propKeys) {
			if (typeof obj[key] === 'boolean') {
				str += `${prefix}${key}={${obj[key]}}`;
			} else if (typeof obj[key] === 'number') {
				str += `${prefix}${key}={${obj[key].toFixed(2)}}`;
			} else if (typeof obj[key] === 'string') {
				str += `${prefix}${key}="${obj[key]}"`;
			} else if (key === 'userData') {
				if (Object.keys(obj[key]).length) {
					str += `${prefix}${key}={${JSON.stringify(obj[key], null, 2)}}`;
				}
			} else if (key === 'color' || obj[key].isColor) {
				str += `${prefix}${key}="#${obj[key].getHexString()}"`;
			} else {
				str += `${prefix}${key}={${v3ToPropString(obj[key])}}`;
			}
		}
		return str;
	}
</script>

<div class="panel">
	<div
		class="header"
		on:click={() => (isOpen = !isOpen)}
		role="button"
		aria-haspopup="menu"
		tabindex="0"
		on:keydown={handleKeydown}
	>
		<h2>Code Viewer</h2>
	</div>
	{#if isOpen}
		<div class="content-box" transition:slide>
			<h3>Threlte</h3>
			<ClickToCopyButton elementID="scaffold-code" />

			<!-- ********* CODE LOGIC ********* -->

			<pre id="scaffold-code">
{`<Canvas>`}

  {#each lights as light (light.id)}
					{`<T.${light.type} ${lightPropsToString(light, '\n\t\t')} \n\t/>\n\t`}
				{/each}

	{#each meshes as obj (obj.id)}
					{`
	<T.${obj.constructor.name}
		position={${v3ToPropString(obj.position)}}
		rotation={${v3ToPropString(obj.rotation)}}
		scale={${v3ToPropString(obj.scale)}}
	>
		<T.${obj.geometry.type} />
		<T.${obj.material.type} ${materialPropsToString(obj.material, '\n\t\t\t')} \n\t\t/>
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
		/* border: 1px solid transparent; */
		transition: background 0.2s ease;
	}
	.header:hover {
		/* LIGHTER EFFECT */
		background-color: #3b3f45cc;

		/* DARKER EFFECT */
		/* background-color: #10101042; */
		/* border-color: #00000059; */
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
		tab-size: 2;
	}
</style>
