<script lang="ts">
	import { T } from '@threlte/core';
	import { afterUpdate } from 'svelte';
	import { meshes } from './globalState';
	import { materials } from './materialHelpers';
	import type { ProtoMaterial } from './models';
	export let materialID: string;

	afterUpdate(() => {
		// console.log('MatConverter afterUpdate:', materialID);
	});

	$: console.log('mat', $materials[materialID]);
	$: console.log('meshes', $meshes);
</script>

{#if $materials[materialID].type === 'Basic'}
	<T.MeshBasicMaterial {...$materials[materialID].props} />
{:else if $materials[materialID].type === 'Standard'}
	<T.MeshStandardMaterial {...$materials[materialID].props} />
{/if}
