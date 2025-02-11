import { Card } from '@/shared/ui/Card';

import { InfoBlockHeader } from '../InfoBlockHeader/InfoBlockHeader';
import { InfoBlockText } from '../InfoBlockText/InfoBlockText';

import styles from './InfoBlock.module.css';

interface InfoBlockProps {
	description: string | undefined;
}

export const InfoBlock = ({ description }: InfoBlockProps) => {
	return (
		<Card expandable withOutsideShadow className={styles.container}>
			<div className={styles['info']}>
				<InfoBlockHeader />
				<InfoBlockText description={description} />
			</div>
		</Card>
	);
};
