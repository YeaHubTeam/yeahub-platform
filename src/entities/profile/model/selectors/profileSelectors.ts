import { State } from '@/shared/config/store/State';

export const getProfileIsEmailSent = (state: State) => {
	return state.profile.isEmailSent;
};
export const getFullProfile = (state: State) => {
	return state.profile.fullProfile;
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
