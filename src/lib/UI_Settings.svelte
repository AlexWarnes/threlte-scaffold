<script lang="ts">
	import { settings } from './globalState';
</script>

<div class="settings panel">
	<label>
		Grid
		<input type="checkbox" bind:checked={$settings.showGrid} />
	</label>
  <!-- <button on:click={() => localStorage.clear()}>CLEAR</button> -->
</div>
