import classNames from 'classnames';
import { ReactNode } from 'react';

import { BackButton } from '../BackButton';
import { Flex } from '../Flex';

import styles from './BackHeader.module.css';

export interface BackHeaderProps {
	children?: ReactNode;
	className?: string;
}

export const BackHeader = ({ children, className }: BackHeaderProps) => {
	return (
		<Flex justify="between" align="center" className={classNames(styles['backheader'], className)}>
			<BackButton />
			<Flex gap="16">{children}</Flex>
		</Flex>
	);
};
