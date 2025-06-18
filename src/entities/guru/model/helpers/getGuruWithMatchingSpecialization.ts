// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Specialization } from '@/entities/specialization';

import { gurus } from '../constants/gurus';
import { Guru } from '../types/guru';

export const getGuruWithMatchingSpecialization = (
	specializations?: Specialization[],
): Guru | undefined => {
	if (!gurus || gurus.length === 0) {
		return undefined;
	}

	if (!specializations || specializations.length === 0) {
		return undefined;
	}

	for (const guru of gurus) {
		for (const specialization of specializations) {
			if (guru.specializationId === specialization.id) {
				return guru;
			}
		}
	}

	return undefined;
};
