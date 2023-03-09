import { writable } from 'svelte/store';
import type { ProtoMaterial } from './models';

export const defaultMaterial = {
	basic: {
		// 'color', 'transparent', 'opacity', 'wireframe', 'toneMapped'
		color: '#00ff00',
		transparent: false,
		opacity: 1.0,
		wireframe: false,
		toneMapped: true
	},
	standard: {
		color: '#00ff00',
		metalness: 0.1,
		roughness: 0.9,
		emissive: '#000000',
		emissiveIntensity: '1.0',
		transparent: false,
		opacity: 1.0,
		wireframe: false,
		toneMapped: true,
		flatShading: false
	}
};

export const defaultMaterials: { [key: string]: ProtoMaterial } = {
	'mat-001': { id: 'mat-001', type: 'Basic', name: 'Basic', props: { ...defaultMaterial.basic } },
	'mat-002': {
		id: 'mat-002',
		type: 'Standard',
		name: 'Standard',
		props: { ...defaultMaterial.standard }
	}
};

export let matCount = defaultMaterials.length;

export function updateMaterialByID(matID: string, key: keyof ProtoMaterial, value: any) {
	materials.update((current) => {
		current[matID][key] = value;
		return current;
	});
}

export const materials = writable(defaultMaterials);
