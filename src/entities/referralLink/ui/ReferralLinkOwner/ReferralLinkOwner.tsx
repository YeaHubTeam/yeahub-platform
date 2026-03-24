import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { route } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { ReferralLink } from '../../model/types/referralLinks';

interface ReferralLinkSumProps {
	ownerUsername: ReferralLink['ownerUsername'];
	ownerId: ReferralLink['ownerId'];
}

export const ReferralLinkOwner = ({ ownerUsername, ownerId }: ReferralLinkSumProps) => {
	const path = ROUTES.admin.users.detail.page;
	if (!ownerUsername) {
		return null;
	}

	return (
		<Flex>
			<Text variant="body2-accent" color="black-700">
				Владелец:{' '}
			</Text>
			<Link to={route(path, ownerId)}>
				<Text variant="body2-accent" color="purple-700">
					{ownerUsername}
				</Text>
			</Link>
		</Flex>
	);
};
