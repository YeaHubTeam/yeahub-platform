import classNames from 'classnames';
import { Dispatch, Key, SetStateAction, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './Tabs.module.css';

export interface Tab<T> {
	id: T;
	label: string;
	Component: () => JSX.Element;
}

export interface TabsProps<T> {
	tabs: Tab<T>[];
	activeTab: Tab<T>;
	setActiveTab: Dispatch<SetStateAction<Tab<T>>>;
}

export const Tabs = <T,>({ tabs, activeTab, setActiveTab }: TabsProps<T>) => {
	const lineRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	const onTabToggle = (e: React.MouseEvent<HTMLLIElement>, tab: Tab<T>) => {
		const tabElement = e.target as HTMLLIElement;
		const tabRect = tabElement.offsetLeft;

		setActiveTab(tab);
		navigate(`#${tab.id}`, { replace: true });

		if (lineRef.current) {
			lineRef.current.style.width = tabElement.offsetWidth + 'px';
			lineRef.current.style.left = `${tabRect}px`;
		}
	};

	useEffect(() => {
		const tabElement = document.querySelector(
			`.${styles['tab-item']}.${styles.active}`,
		) as HTMLLIElement | null;
		if (tabElement && lineRef.current) {
			const tabRect = tabElement.offsetLeft;
			lineRef.current.style.width = `${tabElement.offsetWidth}px`;
			lineRef.current.style.left = `${tabRect}px`;
		}
	}, [activeTab]);

	return (
		<Flex direction="column" gap="28" className={styles['tab-container']} data-testid="Tabs">
			<Flex
				componentType="ul"
				gap="24"
				className={styles['tab-list']}
				role="tablist"
				data-testid="Tabs_List"
			>
				{tabs.map((tab) => (
					// eslint-disable-next-line jsx-a11y/click-events-have-key-events
					<li
						key={tab.id as Key}
						className={classNames(styles['tab-item'], { [styles.active]: activeTab.id === tab.id })}
						onClick={(e) => onTabToggle(e, tab)}
						role="tab"
						tabIndex={0}
						data-testid={`Tabs_Item_${tab.id}`}
					>
						<Text variant="body4" color={activeTab.id === tab.id ? 'black-800' : 'black-500'}>
							{tab.label}
						</Text>
					</li>
				))}
			</Flex>
			<div ref={lineRef} className={styles['line-indicator']} data-testid="Tabs_Line" />
		</Flex>
	);
};
