import type { ReactNode } from 'react';

import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './LayoutStepComponent.module.css';

interface LayoutActiveStepProps {
	buttonLeftClick?: () => void;
	buttonRightClick?: () => void;
	buttonLeftText?: string;
	buttonRightText?: string;
	buttonLeftDisabled?: boolean;
	buttonRightDisabled?: boolean;
	title?: string;
	headTitle?: string;
	description?: string;
	disabled?: boolean;
	children?: ReactNode;
	className?: string;
}

export const LayoutStepComponent = ({
	buttonLeftClick,
	buttonRightClick,
	buttonLeftText,
	buttonRightText,
	buttonLeftDisabled,
	buttonRightDisabled,
	title,
	headTitle,
	description,
	children,
	className,
}: LayoutActiveStepProps) => {
	const withButtons = buttonLeftText || buttonLeftText;
	return (
		<Flex direction={'column'} gap={'16'} className={className}>
			{title && (
				<Text variant={'body5-accent'} className={styles['title']}>
					{title}
				</Text>
			)}
			{headTitle && <Text variant={'head3'}>{headTitle}</Text>}
			{description && (
				<Text variant={'body3-accent'} className={styles['text']}>
					{description}
				</Text>
			)}
			{children}
			{withButtons && (
				<Flex gap={'14'} className={styles['button-container']}>
					<Button
						disabled={buttonLeftDisabled}
						variant={'primary'}
						size={'large'}
						onClick={buttonLeftClick}
					>
						{buttonLeftText}
					</Button>
					{buttonRightText && (
						<Button
							disabled={buttonRightDisabled}
							variant={'outline'}
							size={'large'}
							onClick={buttonRightClick}
						>
							{buttonRightText}
						</Button>
					)}
				</Flex>
			)}
		</Flex>
	);
};
