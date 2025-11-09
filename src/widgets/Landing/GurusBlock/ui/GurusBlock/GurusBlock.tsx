import React from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { gurus } from '@/entities/guru';

import GuruCard from '@/widgets/Landing/GurusBlock/ui/GuruCard/GurusCard';

import styles from './GurusBlock.module.css';

export const GurusBlock = () => {
	const { t } = useTranslation(i18Namespace.landing);

	const { isMobile } = useScreenSize();

	const gurusWithoutPractice = gurus.filter((guru) => !guru.hasPractice);

	return (
		<Card>
			<Flex direction="column" gap="20">
				<Flex direction={'column'} gap={'8'}>
					<Text variant={isMobile ? 'body5-accent' : 'head3'} className={styles.title}>
						{t(Landing.GURU_TITLE)}
					</Text>
					<Text variant={'body3'} className={styles.description}>
						{t(Landing.GURU_DESCRIPTION)}
					</Text>
				</Flex>

				<div className={styles.grid}>
					{gurusWithoutPractice.map((guru) => (
						<GuruCard key={guru.name} guru={guru} />
					))}
				</div>
			</Flex>
		</Card>
	);
};
