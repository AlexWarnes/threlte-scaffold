<script lang="ts">
	import { T, type ThreltePointerEvent } from '@threlte/core';
	import { onMount } from 'svelte';
	import { setSelection, selection, setSelectionRef } from './globalState';
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
	</T.DirectionalLight>
{:else if type === 'Point'}
	<T.PointLight {...props} let:ref={lightRef} bind:ref>
		<T.PointLightHelper args={[lightRef, 2]} />
	</T.PointLight>
{:else if type === 'Hemisphere'}
	<T.HemisphereLight {...props} let:ref={lightRef} bind:ref>
		<T.HemisphereLightHelper args={[lightRef, 5]} />
	</T.HemisphereLight>
{/if}
