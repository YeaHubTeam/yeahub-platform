import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace, Resources } from '@/shared/config/i18n/i18nTranslations';
import { formatDate } from '@/shared/helpers/formatDate';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { StatusChip } from '@/shared/ui/StatusChip';
import { StatusChipVariant } from '@/shared/ui/StatusChip/StatusChip';
import { Text } from '@/shared/ui/Text';

import styles from './ResourceBody.module.css';

type ResourceCardProps = {
	name: string;
	imageSrc?: string;
	type: string;
	url: string;
	createdAt: string;
	status?: {
		text: string;
		variant: StatusChipVariant;
	};
};

export const ResourceBody = ({
	name,
	imageSrc,
	type,
	url,
	createdAt,
	status,
}: ResourceCardProps) => {
	const { t } = useTranslation(i18Namespace.resources);
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
						<Link to={url}>
							<Text variant="body2" color="purple-700">
								<StatusChip
									status={{
										text: status.text,
										variant: status?.variant,
									}}
								/>
							</Text>
						</Link>
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
					<Chip variant="small" active label={type} />
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
