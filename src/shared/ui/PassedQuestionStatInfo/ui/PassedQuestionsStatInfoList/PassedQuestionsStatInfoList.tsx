import { Link } from 'react-router-dom';

import { Flex } from '@/shared/ui/Flex';

import { PassedQuestionsStatInfoItem } from '../PassedQuestionsStatInfoItem/PassedQuestionsStatInfoItem';

import styles from './PassedQuestionsStatInfoList.module.css';

interface PassedQuestionStatInfoProps {
	stats: {
		title: string;
		value: string;
		route?: string;
	}[];
}

export const PassedQuestionsStatInfoList = ({ stats }: PassedQuestionStatInfoProps) => {
	return (
		<Flex gap="12" className={styles.info}>
			{stats.map(({ route, title, value }, index) =>
				route ? (
					<Link to={route} key={index}>
						<PassedQuestionsStatInfoItem title={title} value={value} />
					</Link>
				) : (
					<PassedQuestionsStatInfoItem title={title} value={value} key={index} />
				),
			)}
		</Flex>
	);
};
