import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import ArrowRightIcon from '@/shared/assets/icons/arrowRight.svg';

import styles from './LinkWithArrowRight.module.css';

interface Props {
	link: string;
	linkTitle?: string;
}

export const LinkWithArrowRight: FC<Props> = ({ link, linkTitle }) => {
	return (
		<Link to={link} className={styles.link}>
			<span>{linkTitle}</span>
			<ArrowRightIcon className={styles.icon} />
		</Link>
	);
};
