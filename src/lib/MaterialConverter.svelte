<script lang="ts">
	import { T, } from '@threlte/core';
  import { Editable } from '@threlte/theatre';
	import type { ProtoMaterial } from './models';
	export let material: ProtoMaterial;
  export let materialEditorLabel: string;

  function handleChange(evt: any){
    console.log('Material Change:', evt)
  }
</script>


{#if material.type === 'Basic'}
<T.MeshBasicMaterial {...material.props}>
  <Editable
    name={materialEditorLabel}
    transparent
    opacity
    wireframe
    toneMapped
    userData
    on:change={handleChange}
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
    on:change={handleChange}
  />
</T.MeshStandardMaterial>
{/if}