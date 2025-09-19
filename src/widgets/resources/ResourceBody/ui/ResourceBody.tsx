import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Resources } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { formatDate } from '@/shared/helpers/formatDate';
import { route } from '@/shared/helpers/route';
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
	const { name, iconBase64, type, createdAt, id } = resource;

	const { t } = useTranslation(i18Namespace.resources);
	const resourceUrl = route(ROUTES.admin.resources.details.page, id);
	const formattedDate = formatDate(new Date(createdAt), 'dd.MM.yyyy');

	return (
		<Flex gap="20" className={styles['resource-body']} maxWidth>
			<ImageWithWrapper
				src={iconBase64 ?? undefined}
				alt={name}
				className={styles['image-wrapper']}
			/>

			<Flex direction="column" gap="12">
				<Flex gap="8" wrap="nowrap">
					<Text variant="body3">{t(Resources.LINK)}</Text>
					<Link to={resourceUrl}>
						<Text variant="body3-accent" color="purple-700">
							{resourceUrl}
						</Text>
					</Link>
				</Flex>

				<Flex gap="8" align="center" wrap="nowrap">
					<Text variant="body3">{t(Resources.TYPE)}</Text>
					<Chip variant="small" label={type.description}></Chip>
				</Flex>

				<Flex gap="8" wrap="nowrap">
					<Text variant="body3">{t(Resources.DATE)}</Text>
					<Text variant="body3-accent">{formattedDate}</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
