<script lang="ts">
	import { dev } from '$app/environment';
	import { Canvas, ContextBridge, type ThrelteContext } from '@threlte/core';
	import { Studio, Project, Sheet } from '@threlte/theatre';
	import Scene from '$lib/Scene.svelte';
	import UI_CodeView from '$lib/UI_CodeView.svelte';
	import UI_Settings from '$lib/UI_Settings.svelte';
	import ActionsBar from '$lib/ActionsBar.svelte';
	import { syncSceneToCode } from '$lib/globalState';

	let ctx: ThrelteContext;
</script>

<div class="canvas-wrapper">
	<Studio enabled={dev} />

	<Canvas>
		<Project name="Threlte Scaffold">
			<Sheet name="Scene">
				<Scene />
				<ContextBridge bind:ctx />
			</Sheet>
		</Project>
	</Canvas>
	<div class="actions-box" on:click={syncSceneToCode}>
    <ActionsBar />
	</div>
	<div class="code-view-box">
		<UI_CodeView {ctx} />
	</div>
	<div class="settings-box">
		<UI_Settings />
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
	.settings-box {
		position: absolute;
		top: 1rem;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
