import Vector from '@/shared/assets/icons/vector.svg';
import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './QuizPreparationPreview.module.css';

interface QuizSetupItem {
	id: string;
	title: string;
}

interface QuizPreparationPreviewProps {
	title: string;
	description: string;
	setupList: QuizSetupItem[];
	image: string;
	imageAlt?: string;
}

export const QuizPreparationPreview = ({
	title,
	description,
	setupList,
	image,
	imageAlt = '',
}: QuizPreparationPreviewProps) => {
	const { isMobile } = useScreenSize();

	return (
		<Flex gap="20" className={styles['preparation-empty']}>
			<div className={styles['inactive-description']}>
				<div className={styles['inactive-title']}>
					<Vector className={styles['vector-icon']} />
					<Text variant="body4">{title}</Text>
				</div>

				<Flex direction="column" gap="20">
					<Text variant="body3-accent">{description}</Text>

					<Flex componentType="ul" gap="16" direction="column" wrap="nowrap">
						{setupList.map(({ id, title }) => (
							<Flex key={id} gap="10">
								<Text variant="body4">{id}</Text>
								<Text variant="body3-accent">{title}</Text>
							</Flex>
						))}
					</Flex>
				</Flex>
			</div>

			{!isMobile && (
				<img
					className={styles['preparation-noactiveimage']}
					src={image}
					alt={imageAlt}
					loading="lazy"
				/>
			)}
		</Flex>
	);
};
