import { useTranslation } from 'react-i18next';

import styles from './Faq.module.css';
import { FaqItem } from './FaqItem';

interface FaqItem {
	id: number;
	question: string;
	answer: string;
}

interface FaqListProps {
	title: string;
	faqList: {
		questions: FaqItem[];
	};
}

export const Faq = ({ faqList, title }: FaqListProps) => {
	const { t } = useTranslation();

	return (
		<div>
			<h1 className={styles['faq-title']}>{t(title)}</h1>
			<ul className={styles['faq-items']}>
				{faqList.questions.map((item: FaqItem) => (
					<FaqItem key={item.id} item={item} />
				))}
			</ul>
		</div>
	);
};
