<script lang="ts">
	import { useThrelte } from '@threlte/core';
	import {
		ACESFilmicToneMapping,
		CineonToneMapping,
		LinearToneMapping,
		NoToneMapping,
		ReinhardToneMapping,
		sRGBEncoding
	} from 'three';

	const { renderer } = useThrelte();
	$: if (renderer) {
		renderer.outputEncoding = sRGBEncoding;
		renderer.toneMapping = LinearToneMapping;
	}
</script>
