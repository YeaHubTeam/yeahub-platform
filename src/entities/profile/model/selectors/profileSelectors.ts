import { State } from '@/shared/config/store/State';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { FullProfile } from '@/entities/auth';

export const getProfileIsEmailSent = (state: State) => {
	return state.profile.isEmailSent;
};
export const getFullProfile = (state: State) => {
	return state.profile.fullProfile || ({} as FullProfile);
};
export const getProfileId = (state: State) => {
	return state.profile.fullProfile?.profiles[0].id ?? '';
};
export const getSpecializationId = (state: State) => {
	return state.profile.fullProfile?.profiles[0].specializationId || 0;
};
export const getIsEmptySpecialization = (state: State) => {
	return getSpecializationId(state) === 0;
};

export const getIsEmailVerified = (state: State) => {
	return state.profile.fullProfile?.isEmailVerified ?? false;
};

export const getIsEdit = (state: State) => {
	return state.profile.isEdit;
};
