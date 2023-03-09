<script lang="ts">
	import { T } from '@threlte/core';
	import { materials } from './materialHelpers';
	export let materialID: string;

	// TODO: bug - why doesn't transparent/opacity/flatShading do anything until toneMapped is toggled?

	// $: console.log('selectMat:', materialID, $materials[materialID].props);
</script>

{#if $materials[materialID].type === 'Basic'}
	<T.MeshBasicMaterial {...$materials[materialID].props} />
{:else if $materials[materialID].type === 'Standard'}
	<T.MeshStandardMaterial {...$materials[materialID].props} />
{/if}
