import { mediaLinks } from '../constants/media';

export const getChannelsForSpecializationById = (id: number) => {
	return mediaLinks.find((link) => link.specializationId === id);
};
