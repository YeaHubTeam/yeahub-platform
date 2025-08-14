import { useEffect } from 'react';

import { setUserContext } from '@/shared/config/sentry/context';
import { useAppSelector } from '@/shared/hooks';

import { getFullProfile } from '@/entities/profile';

const AppInitSentryUser = () => {
	const profile = useAppSelector(getFullProfile);
	useEffect(() => {
		if (profile && profile.id) {
			setUserContext({
				id: String(profile.id),
				email: profile.isVerified ? profile.email : undefined,
				role: profile.userRoles?.[0]?.name || 'unknown',
				metadata: {
					username: profile.username,
					company: profile.city,
				},
			});
		}
	}, [profile]);
	return null;
};

export default AppInitSentryUser;
