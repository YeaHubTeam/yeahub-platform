import { DocsList } from '../DocsList/DocsList';

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
