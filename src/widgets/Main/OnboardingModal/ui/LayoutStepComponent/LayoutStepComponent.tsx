import type { ReactNode } from 'react';

import { useScreenSize } from '@/shared/libs';
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
	const { isSmallScreen } = useScreenSize();

	const withButtons = buttonPrimaryText || buttonSecondaryText;
	const withTitle = title || headTitle;

	return (
		<Flex direction={'column'} gap={'16'} className={className}>
			{withTitle && (
				<Text
					variant={isSmallScreen || title ? 'body5-accent' : 'head3'}
					className={styles['title']}
				>
					{title || headTitle}
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
