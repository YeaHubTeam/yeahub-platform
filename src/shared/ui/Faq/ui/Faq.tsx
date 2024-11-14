import styles from './Faq.module.css';
import { FaqItem } from './FaqItem';

interface FaqItem {
	id: number;
	question: string;
	answer: string;
}

interface FaqListProps {
	faqList: FaqItem[];
}

export const Faq = ({ faqList }: FaqListProps) => {
	return (
		<div>
			<h1 className={styles['faq-title']}>Часто задаваемые вопросы</h1>
			<ul className={styles['faq-items']}>
				{faqList.map((item: FaqItem) => (
					<FaqItem key={item.id} item={item} />
				))}
			</ul>
		</div>
	);
};
