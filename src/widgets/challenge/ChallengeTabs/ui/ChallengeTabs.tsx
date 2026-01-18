import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Challenge as ChallengeTranslations } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Tabs, Tab } from '@/shared/ui/Tabs';

import { ChallengeDescription, ChallengeSolutions } from '@/entities/challenge';

import { useChallengeTabsQuery } from '../model/hooks/useChallengeTabsQuery';
import type { ChallengeTabId, ChallengeTabsProps } from '../model/types/types';

import styles from './ChallengeTabs.module.css';

export const ChallengeTabs = ({ challenge, solutions }: ChallengeTabsProps) => {
	const { t } = useTranslation(i18Namespace.challenge);

	const tabs: Tab<ChallengeTabId>[] = useMemo(
		() => [
			{
				id: 'description',
				label: t(ChallengeTranslations.DESCRIPTION_TAB_TITLE),
				Component: () => <ChallengeDescription challenge={challenge} />,
			},
			{
				id: 'solutions',
				label: t(ChallengeTranslations.SOLUTIONS_TAB_TITLE),
				Component: () => <ChallengeSolutions solutions={solutions} />,
			},
		],
		[challenge, solutions],
	);

	const { activeTab, setActiveTab } = useChallengeTabsQuery(tabs);

	if (!activeTab) {
		return null;
	}

	return (
		<Card className={styles.wrapper} withShadow>
			<Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} disableHashUpdate />
			<div className={styles.content}>{activeTab.Component()}</div>
		</Card>
	);
};
