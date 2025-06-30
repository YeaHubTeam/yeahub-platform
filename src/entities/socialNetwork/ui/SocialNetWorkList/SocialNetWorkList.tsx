import { Link } from 'react-router-dom';

import { useScreenSize } from '@/shared/hooks';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';

import { SocialNetwork } from '../../model/types/socialNetwork';

import styles from './SocialNetWorkList.module.css';

interface SocialNetWorkListProps {
	socialNetwork: SocialNetwork[];
}

export const SocialNetWorkList = ({ socialNetwork }: SocialNetWorkListProps) => {
	const { isMobile } = useScreenSize();

	return (
		<div className={styles['card-link']}>
			{socialNetwork.map((link) => (
				<Link className={styles.link} key={link.title} to={link.title} target="_blank">
					<IconButton
						type="submit"
						aria-label="primary large"
						form="round"
						icon={<Icon icon={link.code} size={isMobile ? 20 : 24} />}
						size="small"
						variant="primary"
					/>
				</Link>
			))}
		</div>
	);
};
