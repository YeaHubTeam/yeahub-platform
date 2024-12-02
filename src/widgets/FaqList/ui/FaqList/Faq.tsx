import { Flex } from '@/shared/ui/Flex';

import { FaqProps } from '../../model/types/types';
import { FaqItem } from '../FaqItem/FaqItem';

import styles from './FaqList.module.css';

interface FaqListProps {
	faqList: FaqProps[];
}

export const FaqList = ({ faqList }: FaqListProps) => {
	return (
		<Flex direction="column">
			<h1 className={styles['faq-title']}>Часто задаваемые вопросы</h1>
			<ul className={styles['faq-items']}>
				{faqList.map((faqItem: FaqProps) => (
					<FaqItem key={faqItem.id} item={faqItem} />
				))}
			</ul>
		</Flex>
	);
};
