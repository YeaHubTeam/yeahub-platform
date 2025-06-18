import classnames from 'classnames';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Text } from '@/shared/ui/Text';

import { Resource } from '@/entities/marketplace';

import styles from './ResourceCard.module.css';

type ResourceCardProps = {
	resource: Resource;
};

export const ResourceCard = ({ resource }: ResourceCardProps) => {
	const { title, description, url, image } = resource;
	const hostname = new URL(url).hostname;

	return (
		<Card withOutsideShadow className={styles.content}>
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className={classnames(styles.wrapper)}
			>
				<ImageWithWrapper
					src={image ?? undefined}
					alt={title}
					className={styles['image-wrapper']}
				/>

				<Flex direction="column" gap="12">
					<Text variant="body2" color="purple-700" className={styles.hostname}>
						{hostname}
					</Text>

					<Text variant="body3-accent" className={styles.title} maxRows={2}>
						{title}
					</Text>

					<Text variant="body2" color="black-700" maxRows={3}>
						{description}
					</Text>
				</Flex>
			</a>
		</Card>
	);
};
