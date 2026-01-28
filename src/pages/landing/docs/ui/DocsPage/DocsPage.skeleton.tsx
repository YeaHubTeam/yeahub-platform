import { DocsListSkeleton } from '@/widgets/Docs/DocsBlock';

import styles from './DocsPage.module.css';

export const DocsPageSkeleton = () => {
	return (
		<>
			<div className={styles['container']}>
				<DocsListSkeleton />
			</div>
		</>
	);
};
