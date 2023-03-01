export type ProtoGeometryType =
	| 'Box'
	| 'Sphere'
	| 'Torus'
	| 'Torus Knot'
	| 'Icosahedron'
	| 'Dodecahedron'
	| 'Octahedron';
export type ProtoMaterialType = 'Basic' | 'Standard';
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
