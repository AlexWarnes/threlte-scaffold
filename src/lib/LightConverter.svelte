<script lang="ts">
	import {
		T,
		type ThreltePointerEvent,
		TransformControls,
		TransformableObject
	} from '@threlte/core';
	import { afterUpdate, onMount } from 'svelte';
	import { Vector3 } from 'three';
	import {
		setSelection,
		selection,
		setSelectionRef,
		syncSceneToCode,
		transformSnap,
		allowInteractions
	} from './globalState';
	import type { ProtoLight, ProtoLightType } from './models';
	export let id: string;
	export let type: ProtoLightType;
	export let initialProps: any;
	export let props: any;

	let ref: any;

	onMount(() => {
		// Set new lights as selected
		setSelection(id);

		// Set initial values on light ref
		const { position } = initialProps;
		if (position) ref.position.set(position[0], position[1], position[2]);
	});

	$: if ($selection === id) {
		setSelectionRef(ref);
	}
</script>

{#if type === 'Ambient'}
	<T.AmbientLight {...props} bind:ref />
{:else if type === 'Directional'}
	<T.DirectionalLight {...props} let:ref={lightRef} bind:ref>
		<T.DirectionalLightHelper args={[lightRef, 5]} />
		{#if $selection === id}
			<TransformControls
				on:objectChange={syncSceneToCode}
				on:mouseDown={() => allowInteractions.set(false)}
				on:mouseUp={() => setTimeout(() => allowInteractions.set(true))}
				mode="translate"
				translationSnap={$transformSnap}
			/>
		{/if}
	</T.DirectionalLight>
{:else if type === 'Point'}
	<T.PointLight {...props} let:ref={lightRef} bind:ref>
		<T.PointLightHelper args={[lightRef, 2]} />
		{#if $selection === id}
			<TransformControls
				on:objectChange={syncSceneToCode}
				on:mouseDown={() => allowInteractions.set(false)}
				on:mouseUp={() => setTimeout(() => allowInteractions.set(true))}
				mode="translate"
				translationSnap={$transformSnap}
			/>
		{/if}
	</T.PointLight>
{:else if type === 'Hemisphere'}
	<T.HemisphereLight {...props} let:ref={lightRef} bind:ref>
		<T.HemisphereLightHelper args={[lightRef, 5]} />
		{#if $selection === id}
			<TransformControls
				on:objectChange={syncSceneToCode}
				on:mouseDown={() => allowInteractions.set(false)}
				on:mouseUp={() => setTimeout(() => allowInteractions.set(true))}
				mode="translate"
				translationSnap={$transformSnap}
			/>
		{/if}
	</T.HemisphereLight>
{/if}
