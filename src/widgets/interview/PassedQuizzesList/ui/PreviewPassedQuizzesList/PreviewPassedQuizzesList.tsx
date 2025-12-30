import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, ROUTES, InterviewHistory, Profile, Subscription } from '@/shared/config';
import {
	EMAIL_VERIFY_SETTINGS_TAB,
	SELECT_TARIFF_SETTINGS_TAB,
	useAppSelector,
} from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { getFullProfile, getHasPremiumAccess, getProfileId } from '@/entities/profile';
import { useGetHistoryQuizQuery, QuizWithoutQuestions } from '@/entities/quiz';

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
	const hasPremium = useAppSelector(getHasPremiumAccess);
	const isVerified = fullProfile?.isVerified;
	const { t } = useTranslation([
		i18Namespace.interviewHistory,
		i18Namespace.profile,
		i18Namespace.subscription,
	]);
	const { data, isSuccess } = useGetHistoryQuizQuery(
		{
			profileId,
			startAfter: new Date(0).toISOString(),
			startBefore: startTimeBefore?.toISOString(),
			limit: 3,
			uniqueKey: 'interviewPreviewHistory',
		},
		{ skip: !hasPremium },
	);

	const isEmptyData = isSuccess && data.data.length === 0;

	const actionRoute = !isVerified
		? EMAIL_VERIFY_SETTINGS_TAB
		: !hasPremium
			? SELECT_TARIFF_SETTINGS_TAB
			: ROUTES.interview.history.page;

	const actionTitle = !isVerified
		? t(Profile.EMAIL_VERIFICATION_VERIFY_STUB_LINK, { ns: i18Namespace.profile })
		: !hasPremium
			? t(Subscription.CHANGE_TARIFF_PLAN, { ns: i18Namespace.subscription })
			: t(InterviewHistory.LINK);

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
			className={classNames(styles.card, className)}
			actionRoute={actionRoute}
			actionTitle={actionTitle}
			title={t(InterviewHistory.TITLE)}
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
			{!hasPremium && isVerified && (
				<Text variant="body4" color="black-700" className={styles['no-history']}>
					{t(InterviewHistory.NO_PREMIUM)}
				</Text>
			)}
			{!isEmptyData && isVerified && hasPremium && (
				<Flex componentType="ul" direction="column" gap="12" className={styles.list}>
					{uniqueData.map((interview) => (
						<PreviewPassedQuizzesItem key={interview.id} interview={interview} />
					))}
				</Flex>
			)}
		</Card>
	);
};
