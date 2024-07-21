import { Block } from '@/shared/ui/Block';

import { EducationBlockHeader } from '../EducationBlockHeader/EducationBlockHeader';
import { EducationBlockList } from '../EducationBlockList/EducationBlockList';

import styles from './EducationBlock.module.css';

export const EducationBlock = () => {
	return (
		<Block expandable>
			<div className={styles['education']}>
				<EducationBlockHeader />
				<EducationBlockList />
			</div>
		</Block>
	);
};
