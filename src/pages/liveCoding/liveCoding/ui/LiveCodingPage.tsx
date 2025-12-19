import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { Loader } from '@/shared/ui/Loader';
import { Text } from '@/shared/ui/Text';

import { ChallengeCard, useGetChallengesListQuery } from '@/entities/challenge';

import styles from './LiveCodingPage.module.css';

const LiveCodingPage: FC = () => {
	const { t } = useTranslation([i18Namespace.translation]);
	const { data, isLoading } = useGetChallengesListQuery({ limit: 10 });

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={styles.page}>
			<Text variant="head1" className={styles.title}>
				{t(Translation.SIDEBAR_MENU_LIVE_CODING_TITLE)}
			</Text>
			<div className={styles.list}>
				{data?.data.map((challenge) => <ChallengeCard key={challenge.id} challenge={challenge} />)}
			</div>
		</div>
	);
};

export default LiveCodingPage;
