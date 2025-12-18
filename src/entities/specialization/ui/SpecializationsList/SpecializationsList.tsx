import { useTranslation } from 'react-i18next';

import { i18Namespace, Specializations } from '@/shared/config';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Specialization } from '../../model/types/specialization';

import styles from './SpecializationsList.module.css';

interface SpecializationsListProps {
	specializations?: Specialization[];
}

export const SpecializationsList = ({ specializations }: SpecializationsListProps) => {
	const { t } = useTranslation(i18Namespace.specialization);

	if (!specializations) {
		return null;
	}

	return (
		<Flex direction="column" gap="8">
			<Text variant="body3" color="black-700">
				{t(Specializations.TITLE_MAIN)}
			</Text>
			<ul className={styles['param-wrapper']}>
				{specializations?.map((spec) => (
					<li key={spec.id}>
						<Chip className={styles.chip} label={spec.title} />
					</li>
				))}
			</ul>
		</Flex>
	);
};
