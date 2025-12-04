import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { ButtonSkeleton } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TabsSkeleton } from '@/shared/ui/Tabs';
import { TextSkeleton } from '@/shared/ui/Text';

import { EditProfileTab } from '../../model/types/editProfileTypes';
import { AboutMeTabFormSkeleton } from '../AboutMeTabForm/AboutMeTabForm.skeleton';
import { PersonalInformationTabFormSkeleton } from '../PersonalInformationTabForm/PersonalInformationTabForm.skeleton';
import { SkillsTabFormSkeleton } from '../SkillsTabForm/SkillsTabForm.skeleton';

import styles from './EditProfileForm.module.css';

export const EditProfileFormSkeleton = () => {
	const location = useLocation();
	const currentTab = location.hash.replace('#', '') as EditProfileTab;
	const tabs: Record<EditProfileTab, ReactNode> = {
		'about-me': <AboutMeTabFormSkeleton />,
		skills: <SkillsTabFormSkeleton />,
		'personal-information': <PersonalInformationTabFormSkeleton />,
	};

	return (
		<Card>
			<TextSkeleton width={400} variant="body5-strong" isMainTitle className={styles.title} />
			<TabsSkeleton tabs={Object.keys(tabs)} />
			{tabs[currentTab] || <PersonalInformationTabFormSkeleton />}
			<Flex direction="column" align="end" className={styles['btn-container']}>
				<ButtonSkeleton />
			</Flex>
		</Card>
	);
};
