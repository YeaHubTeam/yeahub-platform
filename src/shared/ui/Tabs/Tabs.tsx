import classNames from 'classnames';
import { Dispatch, Key, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './Tabs.module.css';

export interface Tab<T> {
	id: T;
	label: string;
	count?: number;
	Component: () => JSX.Element;
}

export interface TabsProps<T> {
	tabs: Tab<T>[];
	activeTab: Tab<T>;
	color?: 'default' | 'gray';
	setActiveTab: Dispatch<SetStateAction<Tab<T>>>;
}

export const Tabs = <T,>({ tabs, activeTab, setActiveTab, color = 'default' }: TabsProps<T>) => {
	const navigate = useNavigate();

	const onTabToggle = (tab: Tab<T>) => {
		setActiveTab(tab);
		navigate(`#${tab.id}`, { replace: true });
	};

	return (
		<Flex direction="column" gap="28" className={styles['tab-container']} data-testid="Tabs">
			<Flex
				componentType="ul"
				gap="24"
				className={classNames(styles['tab-list'], {
					[styles[color]]: color === 'default',
					[styles.gray]: color === 'gray',
				})}
				role="tablist"
				data-testid="Tabs_List"
			>
				{tabs.map((tab) => (
					// eslint-disable-next-line jsx-a11y/click-events-have-key-events
					<li
						key={tab.id as Key}
						className={classNames(styles['tab-item'], {
							[styles.active]: activeTab.id === tab.id,
							[styles.hoverable]: color === 'gray',
						})}
						onClick={() => onTabToggle(tab)}
						role="tab"
						tabIndex={0}
						data-testid={`Tabs_Item_${tab.id}`}
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
