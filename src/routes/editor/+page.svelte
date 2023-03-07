<script lang="ts">
	import { dev } from '$app/environment';
	import { Canvas, ContextBridge, type ThrelteContext } from '@threlte/core';
	import { Studio, Project, Sheet } from '@threlte/theatre';
	import Scene from '$lib/Scene.svelte';
	import UI_CodeView from '$lib/UI_CodeView.svelte';
	import UI_Settings from '$lib/UI_Settings.svelte';
	import UI_SceneGraph from '$lib/UI_SceneGraph.svelte';
	import UI_Editor from '$lib/UI_Editor.svelte';
	import ActionsBar from '$lib/ActionsBar.svelte';
	import { selectionRef, selection, syncSceneToCode, setSelectionRef } from '$lib/globalState';
	import { KeyboardControls } from 'svelte-kbc';
	import { keyConfig } from '$lib/shortcuts';
	let ctx: ThrelteContext;

	$: if ($selection === null) {
		setSelectionRef(null);
	}
</script>

<KeyboardControls config={keyConfig}>
	<div class="canvas-wrapper">
		<Canvas>
			<Scene />
			<ContextBridge bind:ctx />
		</Canvas>
		<div class="scene-graph-box">
			<UI_SceneGraph />
		</div>
		<div class="actions-box" on:click={syncSceneToCode}>
			<ActionsBar />
		</div>
		<div class="code-view-box">
			<UI_CodeView {ctx} />
		</div>
		<div class="settings-box">
			<UI_Settings />
		</div>
		<div class="editor-box">
			<UI_Editor {ctx} />
		</div>
	</div>
</KeyboardControls>

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
	.scene-graph-box {
		position: absolute;
		top: 1rem;
		left: 1rem;
	}
	.editor-box {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}
</style>
