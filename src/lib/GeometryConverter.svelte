<script lang="ts">
	import { T } from '@threlte/core';
	import type { ProtoGeometry } from './models';
	export let geometry: ProtoGeometry;
</script>

{#if geometry.type === 'Box'}
	<T.BoxGeometry {...geometry.props} />
{:else if geometry.type === 'Sphere'}
	<T.SphereGeometry {...geometry.props} />
{:else if geometry.type === 'Torus'}
	<T.TorusGeometry {...geometry.props} />
{:else if geometry.type === 'Torus Knot'}
	<T.TorusKnotGeometry {...geometry.props} />
{:else if geometry.type === 'Octahedron'}
	<T.OctahedronGeometry {...geometry.props} />
{:else if geometry.type === 'Dodecahedron'}
	<T.DodecahedronGeometry {...geometry.props} />
{:else if geometry.type === 'Icosahedron'}
	<T.IcosahedronGeometry {...geometry.props} />
{/if}
