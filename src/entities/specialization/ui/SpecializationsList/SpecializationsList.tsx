import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Specialization } from '@/entities/specialization';

import styles from './SpecializationsList.module.css';

interface SpecializationsListProps {
	specializations?: Specialization[];
}

export const SpecializationsList = ({ specializations }: SpecializationsListProps) => {
	const { t } = useTranslation(i18Namespace.collection);

	return (
		<>
			{specializations && (
				<Flex direction="column" gap="8">
					<Text variant="body3" color="black-700">
						{t(Collections.SPECIALIZATION_TITLE)}
					</Text>
					<ul className={styles['param-wrapper']}>
						{specializations?.map((spec) => (
							<li key={spec.id}>
								<Chip className={styles.chip} label={spec.title} />
							</li>
						))}
					</ul>{' '}
				</Flex>
			)}
		</>
	);
};
