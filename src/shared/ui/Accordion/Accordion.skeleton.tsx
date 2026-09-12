import classNames from 'classnames';

import { useScreenSize } from '@/shared/libs';
import styles from '@/shared/ui/Accordion/Accordion.module.css';
import { IconSkeleton } from '@/shared/ui/Icon';
import { TextSkeleton } from '@/shared/ui/Text';

interface AccordionSkeletonProps {
	className?: string;
}

export const AccordionSkeleton = ({ className }: AccordionSkeletonProps) => {
	const { isMobileS } = useScreenSize();

	return (
		<div className={classNames(styles.accordion, className)}>
			<div className={styles.heading}>
				<button className={styles.button}>
					<TextSkeleton
						width="70%"
						variant={isMobileS ? 'body3-accent' : 'body5-accent'}
						className={classNames(styles.title, styles.skeleton)}
					/>
					<IconSkeleton size={24} className={styles.icon} />
				</button>
			</div>
		</div>
	);
};
