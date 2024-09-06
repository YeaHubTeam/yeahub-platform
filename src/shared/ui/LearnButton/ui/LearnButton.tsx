import { ReactNode } from 'react';
import { Button } from 'yeahub-ui-kit';

interface LearnButtonProps {
	className?: string;
	theme: 'primary' | 'secondary' | 'tertiary';
	size?: 'small' | 'medium' | 'large';
	children: ReactNode;
	preffix: React.ReactNode;
}

export const LearnButton = ({ className, theme, size, children, preffix }: LearnButtonProps) => {
	return (
		<Button className={className} theme={theme} size={size} preffix={preffix}>
			{children}
		</Button>
	);
};
