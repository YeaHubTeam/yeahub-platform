import type { ReactNode } from 'react';

import { useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './LayoutStepComponent.module.css';

interface LayoutActiveStepProps {
	buttonPrimaryClick?: () => void;
	buttonSecondaryClick?: () => void;
	buttonPrimaryText?: string;
	buttonSecondaryText?: string;
	buttonPrimaryDisabled?: boolean;
	buttonSecondaryDisabled?: boolean;
	title?: string;
	headTitle?: string;
	description?: string;
	disabled?: boolean;
	children?: ReactNode;
	className?: string;
}

export const LayoutStepComponent = ({
	buttonPrimaryClick,
	buttonSecondaryClick,
	buttonPrimaryText,
	buttonSecondaryText,
	buttonPrimaryDisabled,
	buttonSecondaryDisabled,
	title,
	headTitle,
	description,
	children,
	className,
}: LayoutActiveStepProps) => {
	const withButtons = buttonPrimaryText || buttonSecondaryText;
	const { isSmallScreen } = useScreenSize();
	return (
		<Flex direction={'column'} gap={'16'} className={className}>
			{title && (
				<Text variant={'body5-accent'} className={styles['title']}>
					{title}
				</Text>
			)}
			{headTitle && (
				<Text variant={isSmallScreen ? 'body5-accent' : 'head3'} className={styles['title']}>
					{headTitle}
				</Text>
			)}
			{description && (
				<Text variant={headTitle ? 'body3' : 'body3-accent'} className={styles['text']}>
					{description}
				</Text>
			)}
			{children}
			{withButtons && (
				<Flex gap={'14'} className={styles['button-container']}>
					<Button
						disabled={buttonPrimaryDisabled}
						variant={'primary'}
						size={'large'}
						onClick={buttonPrimaryClick}
					>
						{buttonPrimaryText}
					</Button>
					{buttonSecondaryText && (
						<Button
							disabled={buttonSecondaryDisabled}
							variant={'outline'}
							size={'large'}
							onClick={buttonSecondaryClick}
						>
							{buttonSecondaryText}
						</Button>
					)}
				</Flex>
			)}
		</Flex>
	);
};
