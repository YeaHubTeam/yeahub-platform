import classNames from 'classnames';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { TextSkeleton } from '@/shared/ui/Text';

import { QuestionGradeListSkeleton } from '@/entities/question';

import styles from './PreviewQuestionsItem.module.css';

export const PreviewQuestionsItemSkeleton = () => {
	return (
		<li>
			<Card withOutsideShadow size="small">
				<Flex gap="8">
					<ImageWithWrapperSkeleton className={styles.image} />
					<Flex direction="column" gap="8">
						<TextSkeleton
							variant="body3-accent"
							width={380}
							className={classNames(styles.title, styles['title-skeleton'])}
						/>
						<QuestionGradeListSkeleton className={styles.params} size="small" />
					</Flex>
				</Flex>
			</Card>
		</li>
	);
};
