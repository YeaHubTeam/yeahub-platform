import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { TextSkeleton } from '@/shared/ui/Text';

import { QuestionGradeListSkeleton } from '@/entities/question';

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
				<QuestionGradeListSkeleton className={styles.params} />
			</Flex>
		</Flex>
	);
};
