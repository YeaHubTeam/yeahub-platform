import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Marketplace, Resources, i18Namespace } from '@/shared/config';
import { formatDate } from '@/shared/libs';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { StatusChip, StatusChipItem } from '@/shared/ui/StatusChip';
import { Text } from '@/shared/ui/Text';

import styles from './ResourceBody.module.css';

type ResourceCardProps = {
	name: string;
	imageSrc?: string;
	type: string;
	url: string;
	createdAt: string;
	status?: StatusChipItem;
};

export const ResourceBody = ({
	name,
	imageSrc,
	type,
	url,
	createdAt,
	status,
}: ResourceCardProps) => {
	const { t } = useTranslation([i18Namespace.resources, i18Namespace.marketplace]);
	const formattedDate = formatDate(new Date(createdAt), 'dd.MM.yyyy');

	return (
		<Flex className={styles['resource-body']} maxWidth>
			<ImageWithWrapper
				src={imageSrc ?? undefined}
				alt={name}
				className={styles['image-wrapper']}
			/>

			<Flex direction="column" gap="20">
				{status && (
					<Flex wrap="nowrap">
						<Text variant="body2" width={110} color="black-700">
							{t(Marketplace.STATUS_TITLE)}
						</Text>
						<StatusChip
							status={{
								text: status.text,
								variant: status.variant,
							}}
						/>
					</Flex>
				)}

				<Flex wrap="nowrap">
					<Text variant="body2" width={110} color="black-700">
						{t(Resources.LINK)}
					</Text>
					<Link to={url}>
						<Text variant="body2" color="purple-700">
							{url}
						</Text>
					</Link>
				</Flex>

				<Flex align="center" wrap="nowrap">
					<Text variant="body2" width={110} color="black-700">
						{t(Resources.TYPE)}
					</Text>
					<Chip
						variant="small"
						active
						label={t(`resourceTypes.${type}`, { ns: i18Namespace.marketplace })}
					/>
				</Flex>

				<Flex wrap="nowrap">
					<Text variant="body2" width={110} color="black-700">
						{t(Resources.DATE)}
					</Text>
					<Text variant="body2-accent">{formattedDate}</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
