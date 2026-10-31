import { useAppSelector } from '@/shared/libs';

import { getProfiles } from '@/entities/profile';
import { useGetActiveTestQuery } from '@/entities/testing';

const TestingPage = () => {
	const profiles = useAppSelector(getProfiles);
	const activeProfile = profiles?.find((profile) => profile.isActive);
	const profileId = activeProfile?.id ?? '';

	const { data, isLoading, isError } = useGetActiveTestQuery(
		{ profileId, page: 1, limit: 10 },
		{ skip: !profileId },
	);

	console.log({ data, isLoading, isError });

	return <div>Testing</div>;
};

export default TestingPage;
