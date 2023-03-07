<script lang="ts">
	import { T, type ThreltePointerEvent } from '@threlte/core';
	import { Editable } from '@threlte/theatre';
	import { setSelection, selection, setSelectionRef } from './globalState';
	import type { ProtoLight } from './models';
	export let light: ProtoLight;
	let ref: any;

	// let preventClickHandler = false;
	// function handleClick(evt: CustomEvent<ThreltePointerEvent>) {
	// 	if (preventClickHandler) return;
	// 	setSelection(light.id);
	// }

	$: if ($selection === light.id) {
		setSelectionRef(ref);
	}
</script>

{#if light.type === 'Ambient'}
	<T.AmbientLight {...light.props} bind:ref>
		<!-- <Editable name={lightEditorLabel} color intensity userData on:change={syncSceneToCode} /> -->
	</T.AmbientLight>
{:else if light.type === 'Directional'}
	<T.DirectionalLight {...light.props} let:ref={lightRef} bind:ref>
		<!-- TODO: PR for controls mode prop (don't need scale/rotation here) -->
		<!-- <Editable
			name={lightEditorLabel}
			transform
			controls
			color
			intensity
			on:change={syncSceneToCode}
		/> -->
		<T.DirectionalLightHelper args={[lightRef, 5]} />
	</T.DirectionalLight>
{:else if light.type === 'Point'}
	<T.PointLight {...light.props} let:ref={lightRef} bind:ref>
		<!-- TODO: PR for controls mode prop (don't need scale/rotation here) -->
		<!-- <Editable
			name={lightEditorLabel}
			transform
			controls
      {...editableProps}
			on:change={syncSceneToCode}
		/> -->
		<T.PointLightHelper args={[lightRef, 2]} />
	</T.PointLight>
{:else if light.type === 'Hemisphere'}
	<T.HemisphereLight {...light.props} let:ref={lightRef} bind:ref>
		<!-- TODO: PR for controls mode prop (don't need scale/rotation here) -->
		<!-- <Editable
			name={lightEditorLabel}
			color
      groundColor
			intensity
      position
			on:change={syncSceneToCode}
		/> -->
		<T.HemisphereLightHelper args={[lightRef, 5]} />
	</T.HemisphereLight>
{/if}
