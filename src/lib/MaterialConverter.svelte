<script lang="ts">
	import { T } from '@threlte/core';
	import { Editable } from '@threlte/theatre';
	import { syncSceneToCode } from './globalState';
	import type { ProtoMaterial } from './models';
	export let material: ProtoMaterial;
	export let materialEditorLabel: string;
</script>

{#if material.type === 'Basic'}
	<T.MeshBasicMaterial {...material.props}>
		<Editable
			name={materialEditorLabel}
			color
			transparent
			opacity
			wireframe
			toneMapped
			userData
			on:change={syncSceneToCode}
		/>
	</T.MeshBasicMaterial>
{:else if material.type === 'Standard'}
	<T.MeshStandardMaterial {...material.props}>
		<Editable
			name={materialEditorLabel}
			color
			metalness
			roughness
			emissive
			emissiveIntensity
			transparent
			opacity
			wireframe
			flatShading
			toneMapped
			userData
			on:change={syncSceneToCode}
		/>
	</T.MeshStandardMaterial>
{/if}
