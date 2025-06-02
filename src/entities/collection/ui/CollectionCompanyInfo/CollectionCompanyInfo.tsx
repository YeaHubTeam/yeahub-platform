import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Collection } from '../../model/types/collection';

import styles from './CollectionCompanyInfo.module.css';

interface CollectionCompanyInfoProps {
	company: Collection['company'];
}

export const CollectionCompanyInfo = ({ company }: CollectionCompanyInfoProps) => {
	const { t } = useTranslation(i18Namespace.collection);

	if (!company) {
		return null;
	}

	return (
		<Flex direction="column" gap="8">
			<Text variant="body3" color="black-700">
				{t(Collections.COMPANY_TITLE)}
			</Text>
			<Chip
				variant="big"
				label={company.title}
				prefix={company.imageSrc && <img src={company.imageSrc} alt={company.title} />}
				className={styles.chip}
			/>
		</Flex>
	);
};
