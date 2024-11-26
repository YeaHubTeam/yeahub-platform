import { Link } from 'react-router-dom';

import { StatInfoItem } from '../../StatInfoItem';

import styles from './PassedQuestionStatInfo.module.css';

interface PassedQuestionStatInfoProps {
	stats: {
		title: string;
		value: string;
		route?: string;
	}[];
}

export const PassedQuestionStatInfo = ({ stats }: PassedQuestionStatInfoProps) => {
	return (
		<div className={styles.info}>
			{stats.map((stat, index) =>
				stat.route ? (
					<Link to={stat.route} key={index}>
						<StatInfoItem {...stat} />
					</Link>
				) : (
					<StatInfoItem {...stat} key={index} className={styles.stat} />
				),
			)}
		</div>
	);
};
