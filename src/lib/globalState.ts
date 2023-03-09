import { derived, get, writable, type Readable } from 'svelte/store';
import { rxWritable } from 'svelte-fuse-rx';
import { throttleTime } from 'rxjs';
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
import { defaultMaterial, defaultMaterials } from './materialHelpers';

const defaultSettings: ProtoSettings = {
	showGrid: true,
	bgColor: '#000000'
};
const defaultMeshList: ProtoMesh[] = [
	{
		id: 'mesh-001',
		name: 'mesh-001',
		initialProps: {
			position: [0, 0, 0],
			rotation: [0, 0, 0],
			scale: [1, 1, 1]
		},
		geometry: {
			id: 'geo-001',
			type: 'Box',
			props: {
				args: []
			}
		},
		materialID: 'mat-002'
	}
];
const defaultLightList: ProtoLight[] = [
	{
		id: 'Directional_Light 001',
		type: 'Directional',
		props: {
			color: '#ffffff',
			intensity: 1
		},
		initialProps: {
			position: [5, 5, 5]
		}
	},
	{
		id: 'Ambient_Light 002',
		type: 'Ambient',
		props: {
			color: '#ffffff',
			intensity: 0.25
		},
		initialProps: {}
	}
];

export const editablePropsByLight: { [key: string]: string[] } = {
	AmbientLight: ['color', 'intensity'],
	DirectionalLight: ['color', 'intensity', 'position'],
	PointLight: ['color', 'intensity', 'distance', 'decay', 'position'],
	HemisphereLight: ['color', 'groundColor', 'intensity', 'position']
};

let meshCount = defaultMeshList.length;
let lightCount = defaultLightList.length;

export const settings = writable<ProtoSettings>(defaultSettings);
export const lights = writable<ProtoLight[]>(defaultLightList);
export const meshes = writable<ProtoMesh[]>(defaultMeshList);

// SELECTION STATE
export const selection = writable<string | null>(null);
export const selectionRef = writable<any | null>(null);
export const selectionDetails = derived(
	[selection, meshes, lights],
	([$selection, $meshes, $lights]) => {
		if (!selection) return null;

		return [...$meshes, ...$lights].find((obj) => obj.id === $selection);
	}
);

// TRANSFORM STATE
export const transformMode = writable<TransformMode>('translate');
export const transformSnap = writable<number | null>(null);
export const allowInteractions = writable<boolean>(true);

// SCENE GRAPH SYNCING FOR CODE GEN
export const updateSceneTrigger = rxWritable(1);
export const updateScene = updateSceneTrigger.pipe(throttleTime(350));
export function addMesh(geometryType: ProtoGeometryType, materialID: string) {
	meshCount += 1;
	const newMesh = generateMeshSkeleton(meshCount, geometryType, materialID);
	meshes.update((current) => [newMesh, ...current]);
}

export function addLight(lightType: ProtoLightType) {
	lightCount += 1;
	const newLight: ProtoLight = {
		id: `${lightType}_light ${lightCount.toString().padStart(3, '0')}`,
		type: lightType,
		initialProps: {},
		props: {}
	};
	lights.update((current) => [newLight, ...current]);
}

export function deleteLight(id: string) {
	if (get(selection) === id) {
		clearSelection();
	}
	lights.update((current) => current.filter((l) => l.id !== id));
}

export function syncSceneToCode() {
	updateSceneTrigger.update((n: number) => n + 1);
}

export function deleteMesh(id: string) {
	if (get(selection) === id) {
		clearSelection();
	}
	meshes.update((current) => current.filter((mesh) => mesh.id !== id));
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
	const initialPosition = meshRef.position.clone().addScalar(1);
	meshCount += 1;

	const newMesh = generateMeshSkeleton(meshCount, protoMesh.geometry.type, protoMesh.materialID);
	newMesh.initialProps = {
		position: initialPosition,
		rotation: meshRef.rotation.clone(),
		scale: meshRef.scale.clone()
	};
	meshes.update((current) => [newMesh, ...current]);
}

function generateMeshSkeleton(idNum: number, geoType: ProtoGeometryType, matID: string): ProtoMesh {
	const id = idNum.toString().padStart(3, '0');
	return {
		id: `mesh-${id}`,
		name: `mesh-${id}`,
		initialProps: {},
		geometry: {
			id: `geo-${id}`,
			type: geoType,
			props: {
				args: []
			}
		},
		materialID: matID
	};
}
