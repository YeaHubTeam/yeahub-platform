import classNames from 'classnames';

import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { TextSkeleton } from '@/shared/ui/Text';

import { QuestionGradeListSkeleton } from '../QuestionGradeList/QuestionGradeList.skeleton';

import styles from './PreviewQuestionsItem.module.css';

export const PreviewQuestionsItemSkeleton = () => {
	const { isMobileS } = useScreenSize();
	return (
		<li>
			<Card withOutsideShadow size="small">
				<Flex gap="8">
					{!isMobileS && <ImageWithWrapperSkeleton className={styles.image} />}
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
