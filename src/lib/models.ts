import type { Position, Rotation, Scale } from '@threlte/core';
import type { Vector3Tuple } from 'three';

export type ProtoGeometryType =
	| 'Box'
	| 'Sphere'
	| 'Torus'
	| 'Torus Knot'
	| 'Icosahedron'
	| 'Dodecahedron'
	| 'Octahedron';
export type ProtoLightType = 'Ambient' | 'Directional' | 'Point' | 'Hemisphere';
export type ProtoMaterialType = 'Basic' | 'Standard';
export type TransformMode = 'translate' | 'rotate' | 'scale';
export interface ProtoSettings {
	showGrid: boolean;
	bgColor: string;
}

export interface ProtoMesh {
	id: string;
	name: string;
	initialProps: {
		position?: Vector3Tuple;
		rotation?: Vector3Tuple;
		scale?: Vector3Tuple;
	};
	geometry: ProtoGeometry;
	materialID: string;
}

export interface ProtoGeometry {
	id: string;
	type: ProtoGeometryType;
	props: {
		args: any[];
	};
}
export interface ProtoMaterial {
	id: string;
	type: ProtoMaterialType;
	name: string;
	props: {
		[key: string]: any;
	};
}
export interface ProtoLight {
	id: string;
	type: ProtoLightType;
	initialProps: {
		position?: Vector3Tuple;
	};
	props: {
		[key: string]: any;
	};
}
