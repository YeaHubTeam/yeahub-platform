import classNames from 'classnames';
import { Key } from 'react';

import { Flex } from '@/shared/ui/Flex';
import { TabsProps } from '@/shared/ui/Tabs/Tabs';
import styles from '@/shared/ui/Tabs/Tabs.module.css';
import { TextSkeleton } from '@/shared/ui/Text';

export const TabsSkeleton = <T,>({ tabs }: Partial<TabsProps<T>>) => {
	return (
		<Flex direction="column" gap="28" className={styles['tab-container']}>
			<Flex componentType="ul" gap="24" className={styles['tab-list']}>
				{tabs?.map((tab) => (
					<li
						key={tab.id as Key}
						className={classNames(styles['tab-item'])}
						role="tab"
						tabIndex={0}
					>
						<TextSkeleton variant="body4" width={200} />
					</li>
				))}
			</Flex>
			<div className={styles['line-indicator']} />
		</Flex>
	);
};
