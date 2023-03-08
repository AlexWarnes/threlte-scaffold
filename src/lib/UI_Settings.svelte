<script lang="ts">
	import { settings } from './globalState';
</script>

<div class="settings panel">
	<!-- TODO: Tweakpane wrapper <Tweakpane>
		<Input bind:value={$settings.showGrid} label="Grid" />
		<Input bind:value={$settings.bgColor} label="Background" />
	</Tweakpane> -->
	<label>
		Grid
		<input type="checkbox" bind:checked={$settings.showGrid} />
	</label>
	<label>
		Background
		<input type="color" bind:value={$settings.bgColor} />
	</label>
  <!-- <button on:click={() => localStorage.clear()}>CLEAR</button> -->
</div>

<style>
	.settings {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
	}
</style>