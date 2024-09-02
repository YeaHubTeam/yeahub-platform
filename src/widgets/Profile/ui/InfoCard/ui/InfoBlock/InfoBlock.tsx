import { Block } from '@/shared/ui/Block';

import { InfoBlockHeader } from '../InfoBlockHeader/InfoBlockHeader';
import { InfoBlockText } from '../InfoBlockText/InfoBlockText';

import styles from './InfoBlock.module.css';

interface InfoBlockProps {
	description: string | undefined;
}

export const InfoBlock = ({ description }: InfoBlockProps) => {
	return (
		<Block expandable>
			<div className={styles['info']}>
				<InfoBlockHeader />
				<InfoBlockText description={description} />
			</div>
		</Block>
	);
};
