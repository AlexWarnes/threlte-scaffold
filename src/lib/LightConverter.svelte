<script lang="ts">
	import { T } from '@threlte/core';
	import { Editable } from '@threlte/theatre';
	import { editablePropsByLight, syncSceneToCode } from './globalState';
	import type { ProtoLight } from './models';
	export let light: ProtoLight;
	let lightEditorLabel: string = `Light_${light.type}_${light.id}`;

  const editableProps = Object.fromEntries(editablePropsByLight[`${light.type}Light`].map(name => [name, true]))
</script>

{#if light.type === 'Ambient'}
	<T.AmbientLight {...light.props}>
		<Editable name={lightEditorLabel} color intensity userData on:change={syncSceneToCode} />
	</T.AmbientLight>
{:else if light.type === 'Directional'}
	<T.DirectionalLight {...light.props} let:ref>
		<!-- TODO: PR for controls mode prop (don't need scale/rotation here) -->
		<Editable
			name={lightEditorLabel}
			transform
			controls
			color
			intensity
			on:change={syncSceneToCode}
		/>
		<T.DirectionalLightHelper args={[ref, 5]} />
	</T.DirectionalLight>
{:else if light.type === 'Point'}
	<T.PointLight {...light.props} let:ref>
		<!-- TODO: PR for controls mode prop (don't need scale/rotation here) -->
		<Editable
			name={lightEditorLabel}
			transform
			controls
      {...editableProps}
			on:change={syncSceneToCode}
		/>
		<T.PointLightHelper args={[ref, 2]} />
	</T.PointLight>
{:else if light.type === 'Hemisphere'}
	<T.HemisphereLight {...light.props} let:ref>
		<!-- TODO: PR for controls mode prop (don't need scale/rotation here) -->
		<Editable
			name={lightEditorLabel}
			color
      groundColor
			intensity
      position
			on:change={syncSceneToCode}
		/>
		<T.HemisphereLightHelper args={[ref, 5]} />
	</T.HemisphereLight>
{/if}
