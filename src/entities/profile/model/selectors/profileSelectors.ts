import { createSelector } from '@reduxjs/toolkit';

import { State } from '@/shared/config/store/State';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { FullProfile, Profile } from '@/entities/auth';

export const getProfileIsEmailSent = (state: State) => {
	return state.profile.isEmailSent;
};
export const getFullProfile = (state: State) => {
	return state.profile.fullProfile || ({} as FullProfile);
};

export const getProfiles = (state: State) => {
	return state.profile.fullProfile?.profiles;
};

export const getUserId = (state: State) => {
	return state.profile.fullProfile?.id || '';
};

export const getProfilesLength = createSelector(getProfiles, (profiles) => {
	return profiles?.length || 0;
});

export const getActiveProfile = (state: State) => {
	return (state.profile.fullProfile?.activeProfile || {}) as Profile;
};

export const getEmptySpecializationProfile = createSelector(getProfiles, (profiles) => {
	return profiles?.find((profile) => profile.specializationId === 0);
});

export const getProfileId = createSelector(getActiveProfile, (profile) => {
	return profile?.id ?? '';
});

export const getSpecializationId = createSelector(getActiveProfile, (profile) => {
	return profile?.specializationId || 0;
});

export const getIsEmptySpecialization = (state: State) => {
	return getSpecializationId(state) === 0;
};

export const getIsEmailVerified = (state: State) => {
	return state.profile.fullProfile?.isEmailVerified ?? false;
};

export const getIsEdit = (state: State) => {
	return state.profile.isEdit;
};

export const getHasPremiumAccess = (state: State) => {
	let isTrial = false;
	const fullProfile = state.profile?.fullProfile;
	if (fullProfile?.subscriptions?.length) {
		const activeSubscription = fullProfile.subscriptions.find(
			(i) =>
				'state' in i && i.state === 'active' && 'subscriptionId' in i && i.subscriptionId === 4,
		);
		isTrial = !!activeSubscription;
	}
	isTrial = false;
	return (
		(state.profile.fullProfile?.userRoles.some((role) => role.name === 'candidate-premium') ??
			false) ||
		isTrial
	);
};

export const getHasSubscriptions = (state: State) => {
	return (state.profile.fullProfile?.subscriptions?.length ?? 0) > 0;
};

export const getHasTrialSubscriptions = (state: State) => {
	const fullProfile = state.profile?.fullProfile;
	if (fullProfile?.subscriptions?.length) {
		const activeSubscription = fullProfile.subscriptions.find(
			(i) =>
				'state' in i && i.state === 'inactive' && 'subscriptionId' in i && i.subscriptionId === 4,
		);
		return !!activeSubscription;
	}
	return true;
};
