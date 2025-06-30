// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Specialization } from '@/entities/specialization';

import { mediaLinks } from '../constants/media';

export const getChannelsForSpecializations = (specializations: Specialization[]) => {
	if (!specializations.length || !mediaLinks.length) {
		return [];
	}
	const specializationIds = specializations.map((s) => s.id);
	return mediaLinks.filter((link) => specializationIds.includes(link.specializationId as number));
};
