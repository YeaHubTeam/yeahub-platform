import { Loader } from '@/shared/ui/Loader';

import { FullInterviewHistoryItem } from '../FullInterviewHistoryItem/FullInterviewHistoryItem';

import styles from './FullInterviewHistoryList.module.css';
import { useGetHistory } from './model/hooks/useGetHistory';

export const FullInterviewHistoryList = () => {
	const { data, isLoading, isFetching, isSuccess } = useGetHistory();

	if (isLoading || isFetching) {
		return <Loader />;
	}

	const isEmptyData = isSuccess && data.length === 0;

	return (
		<>
			{!isEmptyData ? (
				<ul className={styles.list}>
					{data.map((interview) => (
						<FullInterviewHistoryItem key={interview.id} interview={interview} />
					))}
				</ul>
			) : (
				<p>Данных нет</p>
			)}
		</>
	);
};
