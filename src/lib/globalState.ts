import { derived, writable } from 'svelte/store';
import type { Scene } from 'three';
import { generateUUID } from 'three/src/math/MathUtils';
import type { ProtoGeometry, ProtoGeometryType, ProtoMaterial } from './models';

const defaultGeometries: ProtoGeometry[] = [
	{
		id: '001',
		type: 'Box',
		props: {
			args: [],
			userData: {}
		},
		materialID: '002'
	}
];

const defaultMaterials: { [key: string]: ProtoMaterial } = {
	'001': {
		id: '001',
		type: 'Basic',
		props: {
			color: 'green',
			userData: {}
		}
	},
	'002': {
		id: '002',
		type: 'Standard',
		props: {
			color: 'red',
			metalness: 0.1,
			roughness: 0.9,
			// color: '#ff3e00',
			userData: {}
		}
	}
};

export const editablePropsByMaterial: { [key: string]: string[] } = {
	MeshBasicMaterial: ['color', 'transparent', 'opacity', 'wireframe', 'toneMapped'],
	MeshStandardMaterial: [
		'color',
		'metalness',
		'roughness',
		'emissive',
		'emissiveIntensity',
		'transparent',
		'opacity',
		'wireframe',
		'flatShading',
		'toneMapped',
		'userData'
	]
};

let geoCount = defaultGeometries.length;
let matCount = defaultMaterials.length;

export const geometries = writable<ProtoGeometry[]>(defaultGeometries);
export const materials = writable(defaultMaterials);
export const meshes = derived([geometries, materials], ([geoList, matLib]) => {
	return geoList.map((geo) => {
		return {
			id: 'mesh-' + geo.id,
			geometry: geo,
			material: matLib[geo.materialID] || '001'
		};
	});
});
export const selected = writable(null);
export const updateScene = writable<number>(0);

export function addMesh(geometryType: ProtoGeometryType, materialID: string) {
	geoCount += 1;
	const newGeo: ProtoGeometry = {
		id: geoCount.toString().padStart(3, '0'),
		type: geometryType,
		props: {
			args: [],
			userData: {}
		},
		materialID
	};
	geometries.update((current) => [newGeo, ...current]);
}
