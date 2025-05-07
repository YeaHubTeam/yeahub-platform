import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewHistory, Profile } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/constants/customRoutes';
import { useScreenSize, useAppSelector } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { getFullProfile, getProfileId } from '@/entities/profile';
import { QuizWithoutQuestions, useGetHistoryQuizQuery } from '@/entities/quiz';

import { PreviewPassedQuizzesItem } from '../PreviewPassedQuizzesItem/PreviewPassedQuizzesItem';

import styles from './PreviewPassedQuizzesList.module.css';

export interface InterviewHistoryListProps {
	className?: string;
}

export const PreviewPassedQuizzesList = ({ className }: InterviewHistoryListProps) => {
	const [uniqueData, setUniqueData] = useState<QuizWithoutQuestions[] | []>([]);
	const [startTimeBefore, setStartTimeBefore] = useState<Date | undefined>(undefined);
	const fullProfile = useAppSelector(getFullProfile);
	const profileId = useAppSelector(getProfileId);
	const isVerified = fullProfile?.isEmailVerified;
	const { t } = useTranslation([i18Namespace.interviewHistory, i18Namespace.profile]);
	const { data, isSuccess } = useGetHistoryQuizQuery({
		profileId,
		startAfter: new Date(0).toISOString(),
		startBefore: startTimeBefore?.toISOString(),
		limit: 3,
		uniqueKey: 'interviewPreviewHistory',
	});

	const { isMobile } = useScreenSize();

	const isEmptyData = isSuccess && data.data.length === 0;

	const isShowShadow = !isMobile || !isVerified;

	const actionRoute = isVerified ? ROUTES.interview.history.page : EMAIL_VERIFY_SETTINGS_TAB;
	const actionTitle = isVerified
		? t(InterviewHistory.LINK)
		: t(Profile.EMAIL_VERIFICATION_VERIFY_STUB_LINK, { ns: i18Namespace.profile });

	useEffect(() => {
		setStartTimeBefore(new Date());
	}, []);

	useEffect(() => {
		if (data?.data) {
			const seen = new Set<string>();
			const filtered = data.data.filter((item) => {
				if (seen.has(item.id)) return false;
				seen.add(item.id);
				return true;
			});
			setUniqueData(filtered);
		}
	}, [data?.data]);

	return (
		<Card
			className={className}
			actionRoute={actionRoute}
			actionTitle={actionTitle}
			title={t(InterviewHistory.TITLE)}
			withShadow={isShowShadow}
			actionDisabled={isEmptyData}
		>
			{!isVerified && (
				<Text variant="body4" color="black-700" className={styles['no-history']}>
					{t(InterviewHistory.UNVERIFIED)}
				</Text>
			)}
			{isEmptyData && isVerified && (
				<Text variant="body4" color="black-700" className={styles['no-history']}>
					{t(InterviewHistory.EMPTY)}
				</Text>
			)}
			{!isEmptyData && isVerified && (
				<Flex componentType="ul" direction="column" gap="8" className={styles.list}>
					{uniqueData.map((interview) => (
						<PreviewPassedQuizzesItem key={interview.id} interview={interview} />
					))}
				</Flex>
			)}
		</Card>
	);
};
