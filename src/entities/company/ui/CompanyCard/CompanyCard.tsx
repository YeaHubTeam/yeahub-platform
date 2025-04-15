import { useTranslation } from 'react-i18next';

import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';

import { Company } from '../../model/types/company';

import styles from './CompanyCard.module.css';

interface CompanyCardProps {
	company: Company;
}

export const CompanyCard = ({ company }: CompanyCardProps) => {
	const { t } = useTranslation();

	return (
		<Flex className={styles.wrap}>
			<Card withOutsideShadow className={styles.card}>
				<Flex gap="16">
					<div className={styles['card-image-wrapper']}>
						<ImageWithWrapper
							src={company.imageSrc}
							alt={`${t(Translation.LOGO)} ${company.title}`}
							className={styles['card-image']}
						/>
					</div>
					<h2 className={styles.title}>{company.legalName}</h2>
				</Flex>
			</Card>
		</Flex>
	);
};
