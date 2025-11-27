import classNames from 'classnames';

import { useScreenSize } from '@/shared/hooks';
import styles from '@/shared/ui/Accordion/ui/Accordion.module.css';
import { IconSkeleton } from '@/shared/ui/Icon';
import { TextSkeleton } from '@/shared/ui/Text';

import { accordionTestIds } from '../model/constants';

export const AccordionSkeleton = () => {
	const { isMobileS } = useScreenSize();

	return (
		<div className={styles.accordion} data-testid={accordionTestIds.accordion}>
			<div className={styles.heading} data-testid={accordionTestIds.heading}>
				<button className={styles.button} data-testid={accordionTestIds.button}>
					<TextSkeleton
						width="70%"
						variant={isMobileS ? 'body2-accent' : 'body5-accent'}
						className={classNames(styles.title, styles.skeleton)}
						dataTestId={accordionTestIds.title}
					/>
					<IconSkeleton size={24} className={styles.icon} dataTestId={accordionTestIds.icon} />
				</button>
			</div>
		</div>
	);
};
