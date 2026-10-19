import classNames from 'classnames';

import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { TextSkeleton } from '@/shared/ui/Text';

import { GradeListSkeleton } from '../GradeList';

import styles from './PreviewListItem.module.css';

export const PreviewListItemSkeleton = () => {
	const { isMobileS, isMobileM } = useScreenSize();
	return (
		<li>
			<Card withOutsideShadow size="small">
				<div className={styles.link}>
					{!isMobileS && <ImageWithWrapperSkeleton className={styles.image} />}
					<Flex direction="column" gap="8">
						<TextSkeleton
							variant="body3-accent"
							width={isMobileM ? '100%' : 320}
							className={classNames(styles.title, styles['title-skeleton'])}
						/>
						<GradeListSkeleton className={styles.params} size="small" />
					</Flex>
				</div>
			</Card>
		</li>
	);
};
