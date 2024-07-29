import { Block } from '@/shared/ui/Block';

import { InfoBlockHeader } from '../InfoBlockHeader/InfoBlockHeader';
import { InfoBlockText } from '../InfoBlockText/InfoBlockText';

import styles from './InfoBlock.module.css';

export const InfoBlock = () => {
	return (
		<Block expandable>
			<div className={styles['info']}>
				<InfoBlockHeader />
				<InfoBlockText />
			</div>
		</Block>
	);
};