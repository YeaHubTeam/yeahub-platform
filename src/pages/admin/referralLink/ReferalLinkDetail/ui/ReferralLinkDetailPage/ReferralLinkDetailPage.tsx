import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

import { i18Namespace, ROUTES, Translation } from '@/shared/config';
import { route } from '@/shared/libs';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { ReferralLinkCard, useGetReferralLinkByIdQuery } from '@/entities/referralLink';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { ReferralLinkAdditionalInfo } from '@/widgets/referralLink/ReferralLinkAdditionalInfo';

const ReferralLinkDetailPage = () => {
	const { t } = useTranslation(i18Namespace.translation);
	const { referralLinkId } = useParams<{ referralLinkId: string }>();

	const {
		data: referralLink,
		isLoading,
		isError,
		refetch,
	} = useGetReferralLinkByIdQuery({ id: referralLinkId! });
	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
	};
	const content = referralLink ? (
		<>
			<Flex align="center" justify="between" style={{ marginBottom: 24 }}>
				<BackButton />
				<Flex gap="10">
					<NavLink to={route(ROUTES.admin.referralLinks.details.page, referralLink.id)}>
						<Button variant="destructive">{t(Translation.DELETE)}</Button>
					</NavLink>
					<NavLink to={route(ROUTES.admin.referralLinks.details.page, referralLink.id)}>
						<Button>{t(Translation.EDIT)}</Button>
					</NavLink>
				</Flex>
			</Flex>
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
	) : null;

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={!!referralLink}
			roles={['admin']}
			stubs={stubs}
			content={content}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default ReferralLinkDetailPage;
