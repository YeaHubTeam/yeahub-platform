import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Text } from '@/shared/ui/Text';

import { Resource } from '../../model/types/resource';

import styles from './ResourceCard.module.css';

type ResourceCardProps = {
	resource: Resource;
};

export const ResourceCard = ({ resource }: ResourceCardProps) => {
	const { name, description, url, iconBase64 } = resource;

	return (
		<Card withOutsideShadow className={styles.content}>
			<a href={url} target="_blank" rel="noopener noreferrer" className={styles.wrapper}>
				<ImageWithWrapper
					src={iconBase64 ?? undefined}
					alt={name}
					className={styles['image-wrapper']}
				/>

				<Flex direction="column" gap="12" maxWidth={true}>
					<Text variant="body2" color="purple-700" className={styles.hostname}>
						{url}
					</Text>

					<Text variant="body3-accent" className={styles.title} maxRows={2}>
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
