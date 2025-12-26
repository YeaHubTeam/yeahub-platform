import classNames from 'classnames';
import { ReactNode } from 'react';

import { Flex } from '@/shared/ui/Flex';

import styles from './CardBlockLayout.module.css';

interface CardContentProps {
	children?: ReactNode;
	hasOffset?: boolean;
	className?: string;
}

export const CardBlockLayoutSkeleton = ({
	children,
	hasOffset = false,
	className,
}: CardContentProps) => {
	const cardContentClasses = classNames({ [styles.offset]: hasOffset }, className);

	return (
		<Flex direction="column" gap="16" className={cardContentClasses}>
			{children}
		</Flex>
	);
};
