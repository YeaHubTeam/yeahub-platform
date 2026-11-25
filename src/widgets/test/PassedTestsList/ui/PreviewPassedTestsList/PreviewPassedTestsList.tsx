import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, ROUTES, TestHistory, Profile, Subscription } from '@/shared/config';
import {
	EMAIL_VERIFY_SETTINGS_TAB,
	SELECT_TARIFF_SETTINGS_TAB,
	useAppSelector,
} from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { getFullProfile, getHasPremiumAccess, getProfileId } from '@/entities/profile';
import { useGetTestsHistoryQuery, TestHistoryItem } from '@/entities/test';

import { PreviewPassedTestsItem } from '../PreviewPassedTestsItem/PreviewPassedTestsItem';

import styles from './PreviewPassedTestsList.module.css';

interface PreviewPassedTestsListProps {
	className?: string;
}

export const PreviewPassedTestsList = ({ className }: PreviewPassedTestsListProps) => {
	const [uniqueTests, setUniqueTests] = useState<TestHistoryItem[] | []>([]);
	const [startBefore] = useState(() => new Date().toISOString());
	const fullProfile = useAppSelector(getFullProfile);
	const profileId = useAppSelector(getProfileId);
	const hasPremium = useAppSelector(getHasPremiumAccess);
	const isVerified = fullProfile?.isVerified;
	const { t } = useTranslation([
		i18Namespace.testHistory,
		i18Namespace.profile,
		i18Namespace.subscription,
	]);
	const { data, isSuccess, isError } = useGetTestsHistoryQuery(
		{
			profileId,
			startAfter: new Date(0).toISOString(),
			startBefore,
			page: 1,
			limit: 3,
		},
		{ skip: !hasPremium },
	);

	const isEmptyData = isSuccess && data?.data.length === 0;

	const actionRoute = !isVerified
		? EMAIL_VERIFY_SETTINGS_TAB
		: !hasPremium
			? SELECT_TARIFF_SETTINGS_TAB
			: ROUTES.testing.history.page;

	const actionTitle = !isVerified
		? t(Profile.EMAIL_VERIFICATION_VERIFY_STUB_LINK, { ns: i18Namespace.profile })
		: !hasPremium
			? t(Subscription.CHANGE_TARIFF_PLAN, { ns: i18Namespace.subscription })
			: t(TestHistory.LINK);

	useEffect(() => {
		if (data?.data) {
			const seen = new Set<string>();
			const filtered = data.data.filter((item) => {
				if (seen.has(item.id)) return false;
				seen.add(item.id);
				return true;
			});

			setUniqueTests(filtered);
		}
	}, [data]);

	return (
		<Card
			className={classNames(styles.card, className)}
			actionRoute={actionRoute}
			actionTitle={actionTitle}
			title={t(TestHistory.TITLE)}
			actionDisabled={isEmptyData || isError}
		>
			{!isVerified && (
				<Text variant="body4" color="black-700" className={styles['no-history']}>
					{t(TestHistory.UNVERIFIED)}
				</Text>
			)}
			{isEmptyData && isVerified && (
				<Text variant="body4" color="black-700" className={styles['no-history']}>
					{t(TestHistory.EMPTY)}
				</Text>
			)}
			{!hasPremium && isVerified && (
				<Text variant="body4" color="black-700" className={styles['no-history']}>
					{t(TestHistory.NO_PREMIUM)}
				</Text>
			)}
			{!isEmptyData && isVerified && hasPremium && (
				<Flex componentType="ul" direction="column" gap="12" className={styles.list}>
					{uniqueTests.map((test) => (
						<PreviewPassedTestsItem key={test.id} test={test} />
					))}
				</Flex>
			)}
		</Card>
	);
};
