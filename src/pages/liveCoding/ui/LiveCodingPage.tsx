import { FC } from 'react';

import { CodeEditor } from '@/shared/ui/CodeEditor';

import styles from './LiveCodingPage.module.css';

const LiveCodingPage: FC = () => {
	return (
		<div className={styles.page}>
			<CodeEditor />
		</div>
	);
};

export default LiveCodingPage;
