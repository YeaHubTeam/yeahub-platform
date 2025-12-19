import { useTranslation } from 'react-i18next';

import Star from '@/shared/assets/icons/starsMinimalistic.svg';
import { i18Namespace, Collections } from '@/shared/config';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Collection } from '../../model/types/collection';

import styles from './CollectionAccessInfo.module.css';

interface CollectionAccessInfoProps {
	isFree: Collection['isFree'];
}

export const CollectionAccessInfo = ({ isFree }: CollectionAccessInfoProps) => {
	const { t } = useTranslation(i18Namespace.collection);

	const accessText = {
		free: t(Collections.TARIFF_FREE),
		paid: t(Collections.TARIFF_PAID),
	};
	return (
		<Flex direction="column" gap="8">
			<Text variant="body3" color="black-700">
				{t(Collections.ADDITIONAL_INFO_ACCESS)}
			</Text>
			{isFree ? (
				<Chip className={styles.chip} label={accessText.free} />
			) : (
				<Chip
					variant="big"
					label={accessText.paid}
					prefix={<Star style={{ width: '30px', height: '30px' }} />}
				/>
			)}
		</Flex>
	);
};
