import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { ReferralLink } from '../../model/types/referralLinks';

interface ReferralLinkCountProps {
	count: ReferralLink['linkedCount'];
}

export const ReferralLinkCount = ({ count }: ReferralLinkCountProps) => {
	if (count === undefined || count === null) {
		return null;
	}

	return (
		<Flex direction="column" gap="16">
			<Text variant="body3" color="black-700">
				Количество:
			</Text>
			<Chip active label={count} />
		</Flex>
	);
};
