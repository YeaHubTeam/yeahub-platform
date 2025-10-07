import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Resources } from '@/shared/config/i18n/i18nTranslations';
import { formatDate } from '@/shared/helpers/formatDate';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Text } from '@/shared/ui/Text';

import { Resource } from '@/entities/resource';

import styles from './ResourceBody.module.css';

type ResourceCardProps = {
	resource: Resource;
};

export const ResourceBody = ({ resource }: ResourceCardProps) => {
	const { name, imageSrc, type, url, createdAt } = resource;

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
					<Chip variant="small" active label={type.description} />
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
