import classNames from 'classnames';

import { useScreenSize } from '@/shared/hooks';
import styles from '@/shared/ui/Accordion/ui/Accordion.module.css';
import { IconSkeleton } from '@/shared/ui/Icon';
import { TextSkeleton } from '@/shared/ui/Text';

export const AccordionSkeleton = () => {
	const { isMobileS } = useScreenSize();

	return (
		<div className={styles.accordion}>
			<div className={styles.heading}>
				<button className={styles.button}>
					<TextSkeleton
						width="70%"
						variant={isMobileS ? 'body2-accent' : 'body5-accent'}
						className={classNames(styles.title, styles.skeleton)}
					/>
					<IconSkeleton size={24} className={styles.icon} />
				</button>
			</div>
		</div>
	);
};
