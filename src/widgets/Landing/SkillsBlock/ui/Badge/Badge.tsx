import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';

import styles from './Badge.module.css';

interface BadgeProps {
	src: string;
	badgeText: string;
	variant?: 'primary' | 'secondary';
	showBadgeText?: boolean;
	className?: string;
}

export const Badge = ({
	src,
	badgeText,
	variant = 'primary',
	showBadgeText = false,
	className = '',
}: BadgeProps) => {
	const badgeClasses = classNames(
		styles.badge,
		styles[variant],
		{
			[styles['badge-with-text']]: showBadgeText,
		},
		className,
	);

	return (
		<Flex align={'center'} gap={'8'} className={badgeClasses}>
			<img src={src} alt={badgeText} />
			{showBadgeText && <span>{badgeText}</span>}
		</Flex>
	);
};
