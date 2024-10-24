import { useMemo } from 'react';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { GetProfileResponse } from '@/entities/auth';

export const useCheckSpecialization = (profile: GetProfileResponse | undefined): boolean => {
	const isSpecializationEmpty = useMemo(() => {
		return profile?.profiles?.[0]?.specializationId === 0;
	}, [profile]);

	return isSpecializationEmpty;
};
