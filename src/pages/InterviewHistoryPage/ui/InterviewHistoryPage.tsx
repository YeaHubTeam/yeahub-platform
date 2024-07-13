import { useState } from 'react';
import Calendar from 'react-calendar';

import { Block } from '@/shared/ui/Block';

import { FullInterviewHistoryList } from '@/widgets/FullInterviewHistory';

import styles from './InterviewHistoryPage.module.css';

import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const InterviewHistoryPage = () => {
	const [value, onChange] = useState<Value>(new Date());
	return (
		<div className={styles.container}>
			<FullInterviewHistoryList />
			<Block className={styles['calendar-block']}>
				<Calendar onChange={onChange} value={value} />
			</Block>
		</div>
	);
};

export default InterviewHistoryPage;
