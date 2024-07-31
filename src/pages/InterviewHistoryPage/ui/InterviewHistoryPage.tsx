import { EventCalendar } from '@/shared/ui/Calendar/EventCalendar';

import { FullInterviewHistoryList } from '@/widgets/FullInterviewHistory';

import styles from './InterviewHistoryPage.module.css';

const InterviewHistoryPage = () => {
	return (
		<div className={styles.container}>
			<FullInterviewHistoryList />
			<EventCalendar />
		</div>
	);
};

export default InterviewHistoryPage;
