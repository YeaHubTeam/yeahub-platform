import { DocsList } from '@/widgets/Docs/DocsBlock';

import styles from './DocsPage.module.css';

export const DocsPage = () => {
	return (
		<>
			<div className={styles['container']}>
				<DocsList />
			</div>
		</>
	);
};
