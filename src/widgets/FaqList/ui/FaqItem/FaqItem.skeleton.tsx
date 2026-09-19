import classNames from 'classnames';

import { useScreenSize } from '@/shared/libs';

import { ButtonSkeleton } from '../../../../shared/ui/Button';
import { TextSkeleton } from '../../../../shared/ui/Text';

import styles from './FaqItem.module.css';

export const FaqItemSkeleton = () => {
	const { isMobile } = useScreenSize();
	return (
		<li className={styles['faq-item']}>
			<ButtonSkeleton className={styles['faq-header']}>
				<TextSkeleton width={150} variant={isMobile ? 'body3-strong' : 'body5-accent'} />
				<div className={classNames(styles['faq-show'])}></div>
			</ButtonSkeleton>
			<div className={classNames(styles['faq-collapse'])}>
				<div className={styles['faq-body']}>
					<TextSkeleton variant="body3" width={150} />
				</div>
			</div>
		</li>
	);
};
