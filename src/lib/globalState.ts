import { derived, get, writable, type Readable } from 'svelte/store';
import type {
	ProtoGeometry,
	ProtoGeometryType,
	ProtoLight,
	ProtoLightType,
	ProtoMaterial,
	ProtoMesh,
	ProtoSettings,
	TransformMode
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
		meshProps: {},
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
		'toneMapped'
		// 'userData'
	]
};
export const editablePropsByLight: { [key: string]: string[] } = {
	AmbientLight: ['color', 'intensity'],
	DirectionalLight: ['color', 'intensity', 'position'],
	PointLight: ['color', 'intensity', 'distance', 'decay', 'position'],
	HemisphereLight: ['color', 'groundColor', 'intensity', 'position']
};

let geoCount = defaultGeometries.length;
let matCount = defaultMaterials.length;
let lightCount = defaultLights.length;

export const settings = writable(defaultSettings);
export const lights = writable(defaultLights);
export const geometries = writable<ProtoGeometry[]>(defaultGeometries);
export const materials = writable(defaultMaterials);
export const meshes: Readable<ProtoMesh[]> = derived(
	[geometries, materials],
	([geoList, matLib]) => {
		return geoList.map((geo) => {
			return {
				id: 'mesh-' + geo.id,
				geometry: geo,
				userData: {},
				material: matLib[geo.materialID] || '001'
			};
		});
	}
);
export const selection = writable<string | null>(null);
export const selectionRef = writable<any | null>(null);
export const transformMode = writable<TransformMode>('translate');
export const transformSnap = writable<number | null>(null);
export const updateScene = writable<number>(1);
export const selectionDetails = derived(
	[selection, meshes, lights],
	([$selection, $meshes, $lights]) => {
		if (!selection) return null;

		return [...$meshes, ...$lights].find((obj) => obj.id === $selection);
	}
);
export function addMesh(geometryType: ProtoGeometryType, materialID: string) {
	geoCount += 1;
	const newGeo: ProtoGeometry = {
		id: geoCount.toString().padStart(3, '0'),
		type: geometryType,
		props: {
			args: [],
			userData: {}
		},
		meshProps: {},
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
	if (get(selection) === id) {
		clearSelection();
	}
	lights.update((current) => current.filter((l) => l.id !== id));
}

export function deleteMesh(id: string) {
	if (get(selection) === id) {
		clearSelection();
	}
	geometries.update((current) => current.filter((geo) => geo.id !== id));
}

export function setSelection(id: string | null): void {
	selection.update((currentSelection) => (currentSelection === id ? null : id));
}

export function setSelectionRef(ref: any) {
	selectionRef.update((currentRef) => (currentRef?.uuid === ref?.uuid ? null : ref));
}

function clearSelection() {
	selection.set(null);
	selectionRef.set(null);
}

export function duplicateMesh(protoMesh: ProtoMesh, meshRef: any) {
	// add material to library
	// duplicate geo with attributes
	//
	geoCount += 1;
	const newGeo: ProtoGeometry = {
		id: geoCount.toString().padStart(3, '0'),
		type: protoMesh.geometry.type,
		props: {
			args: [],
			userData: {}
		},
		meshProps: {
			// position: meshRef.position.clone().setX(meshRef.position.x + 1),
			// rotation: meshRef.rotation.clone(),
			// scale: meshRef.scale.clone()
		},
		materialID: protoMesh.geometry.materialID
	};
	console.log("dupe:", newGeo)
	geometries.update((current) => [newGeo, ...current]);
}
