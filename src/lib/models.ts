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
	geometry: ProtoGeometry;
	userData: any;
	material: ProtoMaterial;
}

export interface ProtoGeometry {
	id: string;
	type: ProtoGeometryType;
	props: {
		args: any[];
		userData: any;
	};
	meshProps: {
		[key: string]: any;
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
