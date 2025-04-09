import { Link } from 'react-router-dom';
import { IconButton } from 'yeahub-ui-kit';

import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Icon } from '@/shared/ui/Icon';

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
						theme="primary"
					/>
				</Link>
			))}
		</div>
	);
};
