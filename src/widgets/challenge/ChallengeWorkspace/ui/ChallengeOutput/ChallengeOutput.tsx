import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Challenge as ChallengeTranslations } from '@/shared/config';
import { Tab, Tabs } from '@/shared/ui/Tabs';

import { useChallengeOutputQuery } from '../../model/hooks/useChallengeOutputQuery';
import type { ChallengeOutputProps, OutputTabId } from '../../model/types/types';

import styles from './ChallengeOutput.module.css';
import { ChallengeOutputResult } from './ChallengeOutputResult/ChallengeOutputResult';
import { ChallengeOutputTests } from './ChallengeOutputTests/ChallengeOutputTests';

export const ChallengeOutput = ({ result }: ChallengeOutputProps) => {
	const { t } = useTranslation(i18Namespace.challenge);

	const tabs: Tab<OutputTabId>[] = useMemo(
		() => [
			{
				id: 'result',
				label: t(ChallengeTranslations.OUTPUT_RESULT_TAB_TITLE),
				Component: () => <ChallengeOutputResult result={result} />,
			},
			{
				id: 'tests',
				label: t(ChallengeTranslations.OUTPUT_TESTS_TAB_TITLE),
				Component: () => <ChallengeOutputTests result={result} />,
			},
		],
		[result, t],
	);

	const { activeTab, setActiveTab } = useChallengeOutputQuery(tabs);

	if (!activeTab) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} disableHashUpdate />
			<div className={styles.content}>{activeTab.Component()}</div>
		</div>
	);
};
