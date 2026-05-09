import { Specialization } from '@/entities/specialization/@x/guru';

import { newGurus } from '../constants/gurus';
import { NewGuru } from '../types/guru';

export const getNewGuruWithMatchingSpecialization = (
	specializations?: Specialization[],
): NewGuru | undefined => {
	if (!newGurus || newGurus.length === 0) {
		return undefined;
	}

	if (!specializations || specializations.length === 0) {
		return undefined;
	}

	for (const guru of newGurus) {
		for (const specialization of specializations) {
			if (guru.specializations.includes(specialization.id)) {
				return guru;
			}
		}
	}

	return undefined;
};
