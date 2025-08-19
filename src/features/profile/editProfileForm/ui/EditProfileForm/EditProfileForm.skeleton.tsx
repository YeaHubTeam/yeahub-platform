import { ButtonSkeleton } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TabsSkeleton } from '@/shared/ui/Tabs';
import { TextSkeleton } from '@/shared/ui/Text';

import { useGetEditProfileTabs } from '../../model/hooks/useGetEditProfileTabs';

import styles from './EditProfileForm.module.css';

export const EditProfileFormSkeleton = () => {
	const { tabs, activeTab } = useGetEditProfileTabs(true);

	return (
		<Card>
			<TextSkeleton width={400} variant="body5-strong" isMainTitle className={styles.title} />
			<TabsSkeleton tabs={tabs} />
			{tabs.map(({ id, Component }) => activeTab.id === id && <Component key={id} />)}

			<Flex direction="column" align="end" className={styles['btn-container']}>
				<ButtonSkeleton />
			</Flex>
		</Card>
	);
};
