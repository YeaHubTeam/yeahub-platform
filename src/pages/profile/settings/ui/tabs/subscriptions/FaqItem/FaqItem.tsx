import classNames from 'classnames';
import { useState } from 'react';

import { useScreenSize } from '@/shared/libs';
import { Text } from '@/shared/ui/Text';

import { FaqProps } from '../../../../model/types/faq';

import styles from './FaqItem.module.css';

interface FaqItemProps {
	item: FaqProps;
}

export const FaqItem = ({ item }: FaqItemProps) => {
	const [isShowFaqItemContent, setIsShowFaqItemContent] = useState(false);
	const { isMobile } = useScreenSize();

	const onToggleFaqItem = () => {
		setIsShowFaqItemContent((prev) => !prev);
	};

	return (
		<li className={styles['faq-item']}>
			<button onClick={onToggleFaqItem} className={styles['faq-header']}>
				<Text variant={isMobile ? 'body3-strong' : 'body5-accent'}>{item.question}</Text>
				<div
					className={classNames(styles['faq-show'], {
						[styles['faq-show-active']]: isShowFaqItemContent,
					})}
				></div>
			</button>
			<div
				className={classNames(styles['faq-collapse'], { [styles['open']]: isShowFaqItemContent })}
			>
				<div className={styles['faq-body']}>
					<Text variant="body3">{item.answer}</Text>
				</div>
			</div>
		</li>
	);
};
