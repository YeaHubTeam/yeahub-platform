import classNames from 'classnames';

import { ButtonSkeleton } from '@/shared/ui/Button';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './FaqItem.module.css';

export const FaqItemSkeleton = () => {
	return (
		<li className={styles['faq-item']}>
			<ButtonSkeleton className={styles['faq-header']} />
			<div className={classNames(styles['faq-collapse'])}>
				<div className={styles['faq-body']}>
					<TextSkeleton variant="body3" width={150} />
				</div>
			</div>
		</li>
	);
};
