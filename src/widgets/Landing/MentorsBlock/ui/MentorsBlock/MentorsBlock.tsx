import { useTranslation } from 'react-i18next';

import MentorsBanner from '@/shared/assets/images/landing/learning/mentor-banner.png';
import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { Banner } from '@/shared/ui/Banner';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { gurus } from '@/entities/guru';

import { MentorCard } from '../MentorCard/MentorCard';

import styles from './MentorsBlock.module.css';

export const MentorsBlock = () => {
	const { t } = useTranslation(i18Namespace.landing);

	const mentorsWithPractice = gurus.filter((guru) => guru.hasPractice);

	return (
		<Flex direction="column" gap="20">
			<Card>
				<Flex direction="column" gap="20">
					<Flex direction="column" gap="8">
						<Text variant="head3" className={styles['main-text']}>
							{t(Landing.MENTORS_TITLE)}
						</Text>
						<Text variant="body3">{t(Landing.MENTORS_DESCRIPTION)}</Text>
					</Flex>

					<div className={styles.grid}>
						{mentorsWithPractice.map((guru) => (
							<MentorCard key={guru.name} guru={guru} />
						))}
					</div>
				</Flex>
			</Card>
			<Banner img={MentorsBanner} color="violet" description={t(Landing.MENTORS_BANNER)} />
		</Flex>
	);
};
