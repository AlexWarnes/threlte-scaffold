<script lang="ts">
	import { lights, meshes, selection, setSelection } from './globalState';

	const handleKeydown = (evt: KeyboardEvent, id: string) => {
		if (evt && evt.key && evt.key === 'Enter') {
			setSelection(id);
		}
	};
</script>

<div class="container">
	<ul>
		{#each $lights as light}
			<li
				on:click={() => setSelection(light.id)}
				on:keydown={(evt) => handleKeydown(evt, light.id)}
				class:selected={$selection === light.id}
				class="panel"
				role="button"
				tabindex="0"
			>
				{light.type}
			</li>
		{/each}
		{#each $meshes as mesh}
			<li
				on:click={() => setSelection(mesh.id)}
				on:keydown={(evt) => handleKeydown(evt, mesh.id)}
				class:selected={$selection === mesh.id}
				class="panel"
				role="button"
				tabindex="0"
			>
				{mesh.id}
			</li>
		{/each}
	</ul>
</div>

<style>
	ul {
		list-style: none;
		padding: 0;
	}

  li {
    border: 1px solid transparent;
    margin: 0.125rem 0;
    
  }

  li.selected {
    border-color: darkcyan;
  }
</style>
