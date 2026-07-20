'use client';

import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';
import { getFormatSalary, useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Text } from '@/shared/ui/Text';

import { Vacancy } from '../../model/types/vacancy';

import styles from './VacancyHeader.module.css';

interface VacancyHeaderProps {
	company: Vacancy['company'];
	title: Vacancy['title'];
	salary: Vacancy['salary'];
}
export const VacancyHeader = ({ company, title, salary }: VacancyHeaderProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);
	const { isMobile } = useScreenSize();

	const newSalary = getFormatSalary(salary?.from, salary?.to, salary?.currency, t);
	// eslint-disable-next-line no-console
	console.log('newSalary', newSalary);

	const content = (
		<Flex justify="between">
			<Flex gap="16" align="start">
				<ImageWithWrapper
					src={company?.imageSrc}
					alt={company?.title}
					className={styles['company-logo']}
				/>
				<Flex gap="8" direction="column" className={styles['vacancy-info']}>
					<Text isMainTitle variant="body6" color="black-900" className={styles.title}>
						{title}
					</Text>
					<Flex gap="8" align="center">
						<Icon
							icon="tickWithBackground"
							color="purple-700"
							size={18}
							className={styles['tick-icon']}
						/>
						<Text variant="body5-accent" color="black-900" className={styles['company-title']}>
							{company?.title}
						</Text>
					</Flex>
				</Flex>
			</Flex>

			<Flex gap="20" direction="column" align="end">
				{newSalary && (
					<Text variant="body6" color="black-900" className={styles.salary}>
						{newSalary}
					</Text>
				)}
			</Flex>
		</Flex>
	);

	if (isMobile) {
		return content;
	}

	return (
		<Card withOutsideShadow className={styles.content}>
			{content}
		</Card>
	);
};
