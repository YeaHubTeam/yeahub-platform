import classnames from 'classnames';

import { Text } from '@/shared/ui/Text';

import styles from './DifficultyBadge.module.css';

interface DifficultyBadgeProps {
	children: React.ReactNode;
	className?: string;
}

export const DifficultyBadge = ({ children, className }: DifficultyBadgeProps) => {
	return (
		<div className={classnames(styles.badge, className)}>
			<Text variant="body2-strong" color="white-900">
				{children}
			</Text>
		</div>
	);
};
