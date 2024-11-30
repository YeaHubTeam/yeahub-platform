import classNames from 'classnames';
import { useState } from 'react';

import { FaqProps } from '../../model/types/types';

import styles from './FaqItem.module.css';

interface FaqItemProps {
	item: FaqProps;
}

export const FaqItem = ({ item }: FaqItemProps) => {
	const [isShowFaqItemContent, setIsShowFaqItemContent] = useState(false);

	const onToggleFaqItem = () => {
		setIsShowFaqItemContent((prev) => !prev);
	};

	return (
		<li className={styles['faq-item']}>
			<button onClick={onToggleFaqItem} className={styles['faq-header']}>
				<p>{item.question}</p>
				<div
					className={classNames(styles['faq-show'], {
						[styles['faq-show-active']]: isShowFaqItemContent,
					})}
				></div>
			</button>
			<div
				className={classNames(styles['faq-collapse'], { [styles['open']]: isShowFaqItemContent })}
			>
				<div className={styles['faq-body']}>{item.answer}</div>
			</div>
		</li>
	);
};
