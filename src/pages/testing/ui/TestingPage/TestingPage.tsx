import { useAppSelector } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { getProfiles } from '@/entities/profile';
import { useGetActiveTestQuery } from '@/entities/testing';

import { TestingPreparation } from '@/widgets/testing/TestingPreparation';

export const TestingPage = () => {
	const profiles = useAppSelector(getProfiles);
	const activeProfile = profiles?.find((profile) => profile.isActive);
	const profileId = activeProfile?.id ?? '';

	const { data, isLoading, isError } = useGetActiveTestQuery(
		{ profileId, page: 1, limit: 10 },
		{ skip: !profileId },
	);

	if (isLoading) {
		return null;
	}
	if (isError) {
		return null;
	}

	return (
		<Flex wrap="wrap" justify="between" gap="20">
			<TestingPreparation activeTest={data} />
		</Flex>
	);
};
