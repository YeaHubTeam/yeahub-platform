import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { i18Namespace, ROUTES, Translation } from '@/shared/config';
import { route } from '@/shared/libs';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { type ReferralLink, ReferralLinkCard } from '@/entities/referralLink';

import { DeleteReferralLinkButton } from '@/features/referralLinks/deleteReferralLink';

import { ReferralLinkAdditionalInfo } from '@/widgets/referralLink/ReferralLinkAdditionalInfo';

interface ReferralLinkDetailPageContentProps {
	referralLink: ReferralLink;
}

export const ReferralLinkDetailPageContent = ({
	referralLink,
}: ReferralLinkDetailPageContentProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	return (
		<>
			<BackHeader>
				<DeleteReferralLinkButton id={referralLink.id} isDetailPage={true} />
				<NavLink
					style={{ marginLeft: 'auto' }}
					to={route(ROUTES.admin.referralLinks.edit.page, referralLink.id)}
				>
					<Button>{t(Translation.EDIT)}</Button>
				</NavLink>
			</BackHeader>
			<Flex gap="20" align="start">
				<ReferralLinkCard code={referralLink.refCode} link={referralLink.url} />
				<ReferralLinkAdditionalInfo
					ownerId={referralLink.ownerId}
					ownerUsername={referralLink.ownerUsername}
					linkedCount={referralLink.linkedCount}
					amountSum={referralLink.amountSum}
					createdAt={referralLink.createdAt}
					updatedAt={referralLink.createdAt}
				/>
			</Flex>
		</>
	);
};
