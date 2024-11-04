import { ReactNode } from 'react';

import { BackButton } from '../../BackButton';
import { Flex } from '../../Flex';

import styles from './BackHeader.module.css';

type Props = { children: ReactNode };

export const BackHeader = ({ children }: Props) => {
	return (
		<Flex justify="between" className={styles['backheader']}>
			<BackButton />
			<Flex gap="8">{children}</Flex>
		</Flex>
	);
};
