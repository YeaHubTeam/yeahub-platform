import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useAppSelector, useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { StatusChipVariant } from '@/shared/ui/StatusChip/StatusChip';

import { getIsEmailVerified } from '@/entities/profile';
import { ResourceRequestStatus, useGetResourceRequestByIdQuery } from '@/entities/resource';

import { DeleteMyResourceRequestButton } from '@/features/resources/deleteMyResourceRequest';

import { ResourceAdditionalInfo } from '@/widgets/resources/ResourceAdditionalInfo';
import { ResourceBody } from '@/widgets/resources/ResourceBody';
import { ResourceHeader } from '@/widgets/resources/ResourceHeader';

import styles from './RequestInfoPage.module.css';

const statusesText: Record<ResourceRequestStatus, string> = {
	approved: 'status.approved',
	pending: 'status.pending',
	rejected: 'status.rejected',
};

const statusesVariant: Record<ResourceRequestStatus, StatusChipVariant> = {
	approved: 'green',
	pending: 'yellow',
	rejected: 'red',
};

export const RequestInfoPage = () => {
	const { isMobile, isTablet } = useScreenSize();
	const navigate = useNavigate();
	const { requestId } = useParams<{ requestId: string }>();
	const { data: request } = useGetResourceRequestByIdQuery(requestId || '');
	const { t } = useTranslation([i18Namespace.marketplace, i18Namespace.translation]);
	const isEmailVerified = useAppSelector(getIsEmailVerified);

	useEffect(() => {
		if (!isEmailVerified) {
			navigate(ROUTES.wiki.resources.page);
		}
	}, [isEmailVerified, navigate]);

	if (!request) {
		return null;
	}

	const { requestPayload, status, specializations, skills, createdAt } = request;

	return (
		<Flex gap="20" align="start">
			<Card withOutsideShadow className={styles.main}>
				<Flex direction="column" gap="20">
					<ResourceHeader
						name={requestPayload.name}
						description={requestPayload.description}
						keywords={requestPayload.keywords}
						skills={skills}
						specializations={specializations}
					/>
					<ResourceBody
						name={requestPayload.name}
						imageSrc={requestPayload.imageSrc}
						type={requestPayload.type}
						url={requestPayload.url}
						createdAt={createdAt}
						status={{
							text: t(statusesText[status]),
							variant: statusesVariant[status],
						}}
					/>
					{status === 'pending' && (
						<Flex gap="20">
							<Button
								size="large"
								onClick={() => navigate(route(ROUTES.wiki.resources.my.edit.page, requestId || ''))}
							>
								{t(Translation.EDIT, { ns: i18Namespace.translation })}
							</Button>
							<DeleteMyResourceRequestButton requestId={requestId || ''} />
						</Flex>
					)}
				</Flex>
			</Card>
			{!isMobile && !isTablet && (
				<ResourceAdditionalInfo
					keywords={requestPayload.keywords || []}
					resourceSkills={skills}
					specializations={specializations}
					route={ROUTES.wiki.resources.requests.page}
				/>
			)}
		</Flex>
	);
};
