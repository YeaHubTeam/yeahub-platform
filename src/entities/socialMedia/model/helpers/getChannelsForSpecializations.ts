import { Specialization } from '@/entities/specialization/@x/socialMedia';

import { mediaLinks } from '../constants/media';

export const getChannelsForSpecialization = (
	specializationsOrId: number | Specialization[] | undefined,
) => {
	if (typeof specializationsOrId === 'number') {
		return mediaLinks.find((link) => link.specializations.includes(specializationsOrId));
	}

	if (Array.isArray(specializationsOrId) && specializationsOrId.length > 0) {
		return mediaLinks.find((link) => link.specializations.includes(specializationsOrId[0].id));
	}

	return undefined;
};
