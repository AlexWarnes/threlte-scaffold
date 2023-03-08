<script lang="ts">
	import { T, type ThreltePointerEvent } from '@threlte/core';
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
	<T.AmbientLight {...light.props} bind:ref />
{:else if light.type === 'Directional'}
	<T.DirectionalLight {...light.props} let:ref={lightRef} bind:ref>
		<T.DirectionalLightHelper args={[lightRef, 5]} />
	</T.DirectionalLight>
{:else if light.type === 'Point'}
	<T.PointLight {...light.props} let:ref={lightRef} bind:ref>
		<T.PointLightHelper args={[lightRef, 2]} />
	</T.PointLight>
{:else if light.type === 'Hemisphere'}
	<T.HemisphereLight {...light.props} let:ref={lightRef} bind:ref>
		<T.HemisphereLightHelper args={[lightRef, 5]} />
	</T.HemisphereLight>
{/if}
