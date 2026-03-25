import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace, ReferralLinks, ROUTES } from '@/shared/config';
import { route } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { ReferralLink } from '../../model/types/referralLinks';

interface ReferralLinkSumProps {
	ownerUsername: ReferralLink['ownerUsername'];
	ownerId: ReferralLink['ownerId'];
}

export const ReferralLinkOwner = ({ ownerUsername, ownerId }: ReferralLinkSumProps) => {
	const { t } = useTranslation(i18Namespace.referralLink);
	const path = ROUTES.admin.users.detail.page;

	return (
		<Flex gap="8">
			<Text variant="body2-accent" color="black-700">
				{t(ReferralLinks.DETAIL_OWNER)}:
			</Text>
			<Link to={route(path, ownerId)}>
				<Text variant="body2-accent" color="purple-700">
					{ownerUsername}
				</Text>
			</Link>
		</Flex>
	);
};
