import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { ReferralLink } from '../../model/types/referralLinks';

import styles from './ReferralLinkSum.module.css';

interface ReferralLinkSumProps {
	amountSum: ReferralLink['amountSum'];
}

export const ReferralLinkSum = ({ amountSum }: ReferralLinkSumProps) => {
	if (amountSum === undefined || amountSum === null) {
		return null;
	}

	return (
		<Flex direction="column" gap="16">
			<Text variant="body3" color="black-700">
				Сумма:
			</Text>
			<Chip className={styles.chip} label={`${amountSum}₽`} />
		</Flex>
	);
};
