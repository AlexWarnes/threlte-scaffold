export type ProtoGeometryType =
	| 'Box'
	| 'Sphere'
	| 'Torus'
	| 'Torus Knot'
	| 'Icosahedron'
	| 'Dodecahedron'
	| 'Octahedron';
export type ProtoLightType = 'Ambient' | 'Directional' | 'Point' | 'Hemisphere'
export type ProtoMaterialType = 'Basic' | 'Standard';

export interface ProtoSettings {
	showGrid: boolean;
}

export interface ProtoGeometry {
	id: string;
	type: ProtoGeometryType;
	props: {
		args: any[];
		userData: any;
	};
	materialID: string;
}
export interface ProtoMaterial {
	id: string;
	type: ProtoMaterialType;
	props: {
		userData: any;
		[key: string]: any;
	};
}
export interface ProtoLight {
	id: string;
	type: ProtoLightType;
	props: {
		userData: any;
		[key: string]: any;
	};
}
