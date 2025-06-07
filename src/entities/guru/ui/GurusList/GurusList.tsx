import { Guru } from '../../model/types/guru';
import { GurusItem } from '../GurusItem/GurusItem';

import styles from './GurusList.module.css';

interface GurusListProps {
	variant: 'single' | 'list';
	gurus: Guru[];
}

export const GurusList = ({ variant, gurus }: GurusListProps) => {
	return (
		<ul className={styles.list}>
			{gurus.map((guru, index) => (
				<GurusItem
					guru={guru}
					avatarSize={variant === 'single' ? 45 : 36}
					withDescription={variant === 'single'}
					key={index}
				/>
			))}
		</ul>
	);
};
