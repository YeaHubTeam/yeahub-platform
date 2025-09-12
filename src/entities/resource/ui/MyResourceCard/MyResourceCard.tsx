import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { StatusChip } from '@/shared/ui/StatusChip';
import { StatusChipVariant } from '@/shared/ui/StatusChip/StatusChip';
import { Text } from '@/shared/ui/Text';

import { ResourceRequest, ResourceRequestStatus } from '@/entities/resource';

import styles from './MyResourceCard.module.css';

type ResourceRequestCard = {
	resource: ResourceRequest;
};

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

export const MyResourceCard = ({ resource }: ResourceRequestCard) => {
	const {
		requestPayload: { name, description, url, iconBase64 },
		specializations,
		status,
	} = resource;

	const { t } = useTranslation(i18Namespace.marketplace);

	const resourceHostname = url?.replace(/^(https?:\/\/)?(www\.)?([^/]+).*$/, '$3');

	return (
		<Card withOutsideShadow className={styles.content}>
			<Flex direction="row" className={styles.wrapper}>
				<ImageWithWrapper
					src={iconBase64 ?? undefined}
					alt={name}
					className={styles['image-wrapper']}
				/>

				<Flex direction="column" gap="12" flex={1}>
					<Flex justify="between" wrap="wrap">
						<Text variant="body2" color="purple-700">
							{resourceHostname}
						</Text>
						<Flex gap="8">
							<Flex gap="8">
								<StatusChip
									status={{
										text: t(statusesText[status]),
										variant: statusesVariant[status],
									}}
								/>
							</Flex>
							<StatusChip
								status={{
									text: t(`resourceTypes.${resource.requestPayload.type}`),
									variant: 'purple',
								}}
							/>
						</Flex>
					</Flex>

					<Text variant="body3-accent" maxRows={2}>
						{name}
					</Text>

					<Text variant="body2" color="black-700" maxRows={3}>
						{description}
					</Text>

					<Flex gap="14">
						{specializations.map((specialization) => (
							<Text
								variant="body3"
								color="black-500"
								key={specialization.id}
								className={styles.specialization}
							>
								{specialization.title}
							</Text>
						))}
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
};
