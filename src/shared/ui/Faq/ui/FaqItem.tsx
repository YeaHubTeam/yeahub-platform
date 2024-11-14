import { useState } from 'react';

import styles from './Faq.module.css';

interface FaqItem {
	id: number;
	question: string;
	answer: string;
}

interface FaqItemProps {
	item: FaqItem;
}

export const FaqItem = ({ item }: FaqItemProps) => {
	const [showHidden, setShowHidden] = useState(false);

	return (
		<li key={item.id} className={styles['faq-item']}>
			<button onClick={() => setShowHidden(!showHidden)} className={styles['faq-header']}>
				<p>{item.question}</p>
				<div
					className={`${styles['faq-show']} ${showHidden ? styles['faq-show-active'] : ''}`}
				></div>
			</button>
			<div className={`${styles['faq-collapse']} ${showHidden ? styles['open'] : ''}`}>
				<div className={styles['faq-body']}>{item.answer}</div>
			</div>
		</li>
	);
};
