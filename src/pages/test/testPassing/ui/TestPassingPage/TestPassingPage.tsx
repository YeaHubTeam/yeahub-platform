import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, ROUTES, TestPassing } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';

import { getHasPremiumAccess, getIsVerified, getProfiles } from '@/entities/profile';
import { useGetActiveTestsQuery } from '@/entities/test';

import { PageWrapper } from '@/widgets/PageWrapper';

import { TestPassingContent } from '../TestPassingContent/TestPassingContent';

const TestPassingPage = () => {
	const { t } = useTranslation(i18Namespace.testPassing);
	const navigate = useNavigate();
	const profiles = useAppSelector(getProfiles);
	const profileId = profiles?.find((profile) => profile.isActive)?.id;
	const hasPremium = useAppSelector(getHasPremiumAccess);
	const isVerified = useAppSelector(getIsVerified);
	const isProfileLoading = useAppSelector((state) => state.profile.fullProfile === null);
	const canLoadTest = !!profileId && hasPremium && isVerified;
	const { currentData, isFetching, isError, refetch } = useGetActiveTestsQuery(
		{ profileId: profileId ?? '', page: 1, limit: 1 },
		{ skip: !canLoadTest, refetchOnMountOrArgChange: true },
	);
	const activeTest = currentData?.data[0];
	const hasQuestions = !!activeTest?.questions?.length;

	return (
		<PageWrapper
			shouldVerify
			shouldPremium
			isLoading={isProfileLoading || (canLoadTest && isFetching)}
			hasError={isError}
			hasData={hasQuestions}
			stubs={{
				error: { onClick: refetch },
				empty: {
					title: t(TestPassing.EMPTY_TITLE),
					subtitle: t(TestPassing.EMPTY_SUBTITLE),
					buttonText: t(TestPassing.CREATE),
					onClick: () => navigate(ROUTES.test.page),
				},
			}}
			content={
				activeTest && profileId && hasQuestions ? (
					<TestPassingContent
						key={`${profileId}:${activeTest.id}`}
						test={activeTest}
						profileId={profileId}
					/>
				) : null
			}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default TestPassingPage;
