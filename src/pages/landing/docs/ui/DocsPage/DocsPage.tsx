import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config';

import { DocsList } from '@/widgets/Docs/DocsBlock';

import { DocsPageSkeleton } from '../DocsPage/DocsPage.skeleton';

import styles from './DocsPage.module.css';

export const DocsPage = () => {
	const { t, ready } = useTranslation(i18Namespace.docs, { useSuspense: false });

	if (!ready) return <DocsPageSkeleton />;

	return (
		<>
			<div className={styles['container']}>
				<DocsList t={t} />
			</div>
		</>
	);
};
