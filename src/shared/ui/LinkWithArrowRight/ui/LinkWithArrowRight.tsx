import { Link } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import styles from './LinkWithArrowRight.module.css';

interface Props {
	link: string;
	linkTitle?: string;
}

export const LinkWithArrowRight = ({ link, linkTitle }: Props) => {
	return (
		<Link to={link} className={styles.link}>
			<span>{linkTitle}</span>
			<Icon icon="arrowRight" color="--palette-ui-purple-700" size={24} className={styles.icon} />
		</Link>
	);
};
