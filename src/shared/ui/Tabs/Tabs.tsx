import classNames from 'classnames';
import { Dispatch, Key, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { tabsTestIds } from './constants';
import styles from './Tabs.module.css';
import type { Tab, TabColor } from './types';

export interface TabsProps<T> {
	tabs: Tab<T>[];
	activeTab: Tab<T>;
	color?: TabColor;
	setActiveTab: Dispatch<SetStateAction<Tab<T>>>;
	disableHashUpdate?: boolean;
}

export const Tabs = <T,>({
	tabs,
	activeTab,
	setActiveTab,
	color = 'default',
	disableHashUpdate = false,
}: TabsProps<T>) => {
	const navigate = useNavigate();

	const onTabToggle = (tab: Tab<T>) => {
		setActiveTab(tab);
		if (!disableHashUpdate) {
			navigate(`#${tab.id}`, { replace: true });
		}
	};

	return (
		<Flex
			direction="column"
			gap="28"
			className={styles['tab-container']}
			data-testid={tabsTestIds.tabs}
		>
			<Flex
				componentType="ul"
				gap="10"
				className={classNames(styles['tab-list'], styles[color])}
				role="tablist"
				data-testid={tabsTestIds.list}
			>
				{tabs.map((tab) => (
					// eslint-disable-next-line jsx-a11y/click-events-have-key-events
					<li
						key={tab.id as Key}
						className={classNames(styles['tab-item'], styles[color], {
							[styles.active]: activeTab.id === tab.id,
						})}
						onClick={() => onTabToggle(tab)}
						role="tab"
						tabIndex={0}
						data-testid={tabsTestIds.item(String(tab.id))}
					>
						<Text variant="body4" color={activeTab.id === tab.id ? 'purple-700' : 'black-500'}>
							{tab.label} {(tab.count ?? 0) > 0 && `(${tab.count})`}
						</Text>
					</li>
				))}
			</Flex>
		</Flex>
	);
};
