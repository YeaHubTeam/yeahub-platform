import { Link } from 'react-router-dom';
import { IconButton, Icon } from 'yeahub-ui-kit';
import { IconsName } from 'yeahub-ui-kit/build/components/Icon/common';

import { SocialNetwork } from '../../model/types/socialNetwork';

import styles from './SocialNetWorkList.module.css';

interface SocialNetWorkListProps {
	socialNetwork: SocialNetwork[];
}

export const SocialNetWorkList = ({ socialNetwork }: SocialNetWorkListProps) => {
	return (
		<div className={styles['card-link']}>
			{socialNetwork.map((link) => (
				<Link key={link.code} to={link.code}>
					<IconButton
						type="submit"
						aria-label="primary large"
						form="round"
						icon={<Icon icon={`${link.title}Logo` as IconsName} size={20} />}
						size="small"
						theme="primary"
					/>
				</Link>
			))}
		</div>
	);
};
