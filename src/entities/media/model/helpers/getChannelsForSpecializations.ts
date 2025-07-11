// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Specialization } from '@/entities/specialization';

import { mediaLinks } from '../constants/media';

export const getChannelsForSpecialization = (
	specializationsOrId: number | Specialization[] | undefined,
) => {
	if (typeof specializationsOrId === 'number') {
		return mediaLinks.find((link) => link.specializationId === specializationsOrId);
	}

	if (Array.isArray(specializationsOrId) && specializationsOrId.length > 0) {
		return mediaLinks.find((link) => link.specializationId === specializationsOrId[0].id);
	}

	return undefined;
};
