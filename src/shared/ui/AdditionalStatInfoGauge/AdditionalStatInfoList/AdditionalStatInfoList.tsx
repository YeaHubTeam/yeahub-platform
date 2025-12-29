import { Link } from 'react-router-dom';

import { Flex } from '@/shared/ui/Flex';

import { AdditionalStatInfoItem } from '../AdditionalStatInfoItem/AdditionalStatInfoItem';
import { StatInfoItem } from '../types';

import styles from './AdditionalStatInfoList.module.css';

interface PassedQuestionStatInfoProps {
	statsInfo: StatInfoItem[];
}

export const AdditionalStatInfoList = ({ statsInfo }: PassedQuestionStatInfoProps) => {
	return (
		<Flex gap="12" className={styles.info}>
			{statsInfo.map(({ route, title, value }, index) =>
				route ? (
					<Link to={route} key={index}>
						<AdditionalStatInfoItem title={title} value={value} />
					</Link>
				) : (
					<AdditionalStatInfoItem title={title} value={value} key={index} />
				),
			)}
		</Flex>
	);
};
