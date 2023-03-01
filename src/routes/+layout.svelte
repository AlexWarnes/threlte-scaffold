<script lang="ts">
	import './app.css';
</script>

<div class="view-wrapper">
	<nav>
		<a href="/">HOME</a>
		<a href="/editor">EDITOR</a>
	</nav>
	<main>
		<slot />
	</main>
</div>

<style uno:preflights uno:safelist global>
  .view-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    width: 100%;
    height: 100%;
  }

  main {
    flex-grow: 1;
    overflow: hidden;
    background-color: cyan;
  }
</style>
