<script lang="ts">
	import { dev } from '$app/environment';
	import { Canvas, ContextBridge, type ThrelteContext } from '@threlte/core';
	import { Studio, Project, Sheet } from '@threlte/theatre';
	import Scene from '$lib/Scene.svelte';
	import UI_AddMesh from '$lib/UI_AddMesh.svelte';
	import UI_CodeView from '$lib/UI_CodeView.svelte';

	let ctx: ThrelteContext;
</script>

<div class="canvas-wrapper">
	<Studio enabled={dev} />

	<Canvas>
		<Project name="Threlte Scaffold">
			<Sheet name="Scene" on:instance={(e) => console.log('selectionchange')}>
				<Scene />
				<ContextBridge bind:ctx />
			</Sheet>
		</Project>
	</Canvas>
	<div class="actions-box">
		<UI_AddMesh />
	</div>
	<div class="code-view-box">
		<UI_CodeView {ctx} />
	</div>
</div>

<style>
	.canvas-wrapper {
		width: 100%;
		height: 100%;
		position: relative;
		top: 0;
		left: 0;
		background-color: #161616;
	}

	.actions-box {
		position: absolute;
		bottom: 1rem;
		left: 1rem;
		z-index: 10000000000;
	}
	.code-view-box {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
	}
</style>
