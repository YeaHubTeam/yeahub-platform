import { Card } from '@/shared/ui/Card';

import { EducationBlockHeader } from '../EducationBlockHeader/EducationBlockHeader';
import { EducationBlockList } from '../EducationBlockList/EducationBlockList';

import styles from './EducationBlock.module.css';

export const EducationBlock = () => {
	return (
		<Card expandable>
			<div className={styles['education']}>
				<EducationBlockHeader />
				<EducationBlockList />
			</div>
		</Card>
	);
};
