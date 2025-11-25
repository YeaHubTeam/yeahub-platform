import { FC } from 'react';

import { LiveCoding } from '@/widgets/LiveCoding';

import styles from './LiveCodingPage.module.css';

const LiveCodingPage: FC = () => {
	return (
		<div className={styles.page}>
			<LiveCoding />
		</div>
	);
};

export default LiveCodingPage;
