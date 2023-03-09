import { writable } from 'svelte/store';
import type { ProtoMaterial, ProtoMaterialType } from './models';

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

export let matCount: number = Object.keys(defaultMaterials).length;

export function duplicateMaterialByID(id: string) {
	matCount += 1;
	const newIDNum = matCount.toString().padStart(3, '0');
	const newID = `mat-${newIDNum}`;
	materials.update((current) => {
		const targetMaterial = current[id] || defaultMaterials['mat-001'];
		const matCopy = {
			...JSON.parse(JSON.stringify(targetMaterial)),
			id: newID
		};

		current[newID] = matCopy;
		return current;
	});
	return newID;
}

export const materials = writable(defaultMaterials);
