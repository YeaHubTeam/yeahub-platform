import { StatInfoItem } from '../../StatInfoItem';

import styles from './PassedQuestionStatInfo.module.css';

interface PassedQuestionStatInfoProps {
	stats: {
		title: string;
		value: string;
	}[];
}

export const PassedQuestionStatInfo = ({ stats }: PassedQuestionStatInfoProps) => {
	return (
		<div className={styles.info}>
			{stats.map((stat, index) => (
				<StatInfoItem key={index} {...stat} />
			))}
		</div>
	);
};
