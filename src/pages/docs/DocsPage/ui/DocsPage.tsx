import { Docs } from '@/widgets/Docs/DocsBlock';
import { Footer } from '@/widgets/Landing/Footer';
import { Header } from '@/widgets/Landing/Header';

import styles from './DocsPage.module.css';

export const DocsPage = () => {
	return (
		<>
			<div className={styles['container']}>
				<Header />
				<Docs />
			</div>
			<Footer />
		</>
	);
};
