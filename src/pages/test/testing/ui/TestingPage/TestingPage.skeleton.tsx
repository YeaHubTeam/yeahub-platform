import { PreviewPassedTestsListSkeleton } from '@/widgets/test/PassedTestsList';

import styles from './TestingPage.module.css';

export const TestingPageSkeleton = () => {
	return <PreviewPassedTestsListSkeleton className={styles.history} />;
};
