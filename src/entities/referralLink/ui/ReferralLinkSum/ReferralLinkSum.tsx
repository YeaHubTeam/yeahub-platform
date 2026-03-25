import { useTranslation } from 'react-i18next';

import { i18Namespace, ReferralLinks } from '@/shared/config';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { ReferralLink } from '../../model/types/referralLinks';

interface ReferralLinkSumProps {
	amountSum: ReferralLink['amountSum'];
}

export const ReferralLinkSum = ({ amountSum }: ReferralLinkSumProps) => {
	const { t } = useTranslation(i18Namespace.referralLink);

	return (
		<Flex direction="column" gap="16">
			<Text variant="body3" color="black-700">
				{t(ReferralLinks.DETAIL_AMOUNT_SUM)}:
			</Text>
			<Chip activeInverse label={`${amountSum}₽`} />
		</Flex>
	);
};
