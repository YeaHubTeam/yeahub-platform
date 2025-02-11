import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { QuestionParamSkeleton } from '@/shared/ui/QuestionParam';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './PreviewQuestionsItem.module.css';

export const PreviewQuestionsItemSkeleton = () => {
	return (
		<Flex componentType="li" gap="8" className={classNames(styles.item, styles.link)}>
			<ImageWithWrapperSkeleton className={styles.image} />
			<Flex direction="column" gap="8">
				<TextSkeleton
					variant="body2-accent"
					width={280}
					className={classNames(styles.title, styles['title-skeleton'])}
				/>
				<Flex componentType="ul" gap="24" className={styles.params}>
					<QuestionParamSkeleton />
					<QuestionParamSkeleton />
				</Flex>
			</Flex>
		</Flex>
	);
};
