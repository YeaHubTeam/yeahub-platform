import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import type { HhAnalyticsMode } from '../../model/types/types';

import styles from './HhAnalyticsModeTabs.module.css';

type HhAnalyticsModeTabsProps = {
	mode: HhAnalyticsMode;
	onChange: (mode: HhAnalyticsMode) => void;
};
type TabsType = { id: HhAnalyticsMode; translationKey: Analytics };

const TABS: TabsType[] = [
	{
		id: 'skills',
		translationKey: Analytics.HH_ANALYTICS_TAB_SKILLS,
	},
	{
		id: 'keywords',
		translationKey: Analytics.HH_ANALYTICS_TAB_KEYWORDS,
	},
];
export const HhAnalyticsModeTabs = ({ mode, onChange }: HhAnalyticsModeTabsProps) => {
	const { isMobile } = useScreenSize();

	const { t } = useTranslation(i18Namespace.analytics);

	return (
		<Flex direction={isMobile ? 'column' : 'row'} gap="14">
			{TABS.map(({ id, translationKey }) => {
				return (
					<Button
						key={id}
						size="large"
						variant={id === mode ? 'secondary' : 'outline'}
						onClick={() => onChange(id)}
						fullWidth={isMobile}
						className={classNames(!isMobile && styles['mode-button'])}
					>
						{t(translationKey)}
					</Button>
				);
			})}
		</Flex>
	);
};
