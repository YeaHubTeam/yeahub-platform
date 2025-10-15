import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Text } from '@/shared/ui/Text';

import { Resource } from '../../model/types/resource';

import styles from './ResourceCard.module.css';

type ResourceCardProps = {
	resource: Resource;
};

export const ResourceCard = ({ resource }: ResourceCardProps) => {
	const { name, description, url, imageSrc, type } = resource;

	const { t } = useTranslation(i18Namespace.marketplace);

	const resourceHostname = url?.replace(/^(https?:\/\/)?(www\.)?([^/]+).*$/, '$3');

	return (
		<Card withOutsideShadow className={styles.content}>
			<a href={url} target="_blank" rel="noopener noreferrer" className={styles.wrapper}>
				<ImageWithWrapper
					src={imageSrc ?? undefined}
					alt={name}
					className={styles['image-wrapper']}
				/>

				<Flex direction="column" gap="12" flex={1}>
					<Flex justify="between" wrap="wrap">
						<Text variant="body2" color="purple-700">
							{resourceHostname}
						</Text>
						{type && (
							<StatusChip
								status={{
									text: t(`resourceTypes.${resource.type.code}`),
									variant: 'purple',
								}}
							/>
						)}
					</Flex>

					<Text variant="body3-accent" maxRows={2}>
						{name}
					</Text>

					<Text variant="body2" color="black-700" maxRows={3}>
						{description}
					</Text>
				</Flex>
			</a>
		</Card>
	);
};
