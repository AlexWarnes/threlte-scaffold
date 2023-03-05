import { derived, writable } from 'svelte/store';
import type {
	ProtoGeometry,
	ProtoGeometryType,
	ProtoLight,
	ProtoLightType,
	ProtoMaterial,
	ProtoSettings
} from './models';

const defaultSettings: ProtoSettings = {
	showGrid: true
};
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
const defaultLights: ProtoLight[] = [
	{
		id: '001',
		type: 'Directional',
		props: {
			args: [],
			position: [5, 5, 5],
			userData: {}
		}
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
export const editablePropsByLight: { [key: string]: string[] } = {
	AmbientLight: ['color', 'intensity', 'userData'],
	DirectionalLight: ['color', 'intensity', 'userData', 'position'],
	PointLight: ['color', 'intensity', 'distance', 'decay', 'userData', 'position'],
	HemisphereLight: ['color', 'groundColor', 'intensity', 'position', 'userData']
};

let geoCount = defaultGeometries.length;
let matCount = defaultMaterials.length;
let lightCount = defaultLights.length;

export const settings = writable(defaultSettings);
export const lights = writable(defaultLights);
export const geometries = writable<ProtoGeometry[]>(defaultGeometries);
export const materials = writable(defaultMaterials);
export const meshes = derived([geometries, materials], ([geoList, matLib]) => {
	return geoList.map((geo) => {
		return {
			id: 'mesh-' + geo.id,
			geometry: geo,
			userData: {},
			material: matLib[geo.materialID] || '001'
		};
	});
});
export const selected = writable(null);
export const updateScene = writable<number>(1);

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

export function addLight(lightType: ProtoLightType) {
	lightCount += 1;
	const newLight: ProtoLight = {
		id: lightCount.toString().padStart(3, '0'),
		type: lightType,
		props: {
			args: [],
			position: [5, 5, 5],
			userData: {}
		}
	};
	lights.update((current) => [newLight, ...current]);
}

export function syncSceneToCode() {
	updateScene.update((n) => n + 1);
}

export function deleteLight(id: string) {
	lights.update((current) => current.filter((l) => l.id !== id));
}

export function deleteMesh(id: string) {
	geometries.update((current) => current.filter((geo) => geo.id !== id));
}
