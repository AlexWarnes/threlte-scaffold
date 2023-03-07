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
    margin: 0.125rem 0;
    padding: 0.375rem 0.75rem;
    background-color: var(--theater-bg);
    filter: unset;
    color: #b1b1b1;
		border: 1px solid transparent;
    cursor: pointer;
  }

  li.selected {
		background-color: #10101042;
		border-color: darkcyan;
  }

	li:not(.selected):hover {
		background-color: #10101042;
		border-color: #ffffff59;
	}

</style>
