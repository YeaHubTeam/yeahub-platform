import { ReactNode } from 'react';

import { useScreenSize } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import type { ButtonProps, VariantType } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import type { TextVariant } from '@/shared/ui/Text';

import styles from './ListLayoutPage.module.css';

type ActionButtonProps = {
	variantButton?: VariantType;
	suffix: ReactNode;
	onClick: () => void;
	label: string;
};

type SecondaryActionProps = {
	variantButton?: VariantType;
	count: number;
	onClick: () => void;
	label: string;
	size?: ButtonProps['size'];
};

export interface ListLayoutPageProps {
	title: string;
	filters: ReactNode;
	variant?: TextVariant;
	mobilVariant?: TextVariant;
	children: ReactNode;
	pagination: ReactNode;
	isEmailVerified?: boolean;
	actionButton?: ActionButtonProps;
	secondaryAction?: SecondaryActionProps;
	secondaryContent?: ReactNode;
}

export const ListLayoutPage = ({
	title,
	filters,
	children,
	pagination,
	variant = 'body6',
	mobilVariant = 'body5-accent',
	isEmailVerified = false,
	actionButton,
	secondaryAction,
	secondaryContent,
}: ListLayoutPageProps) => {
	const { isSmallScreen, isMobileS, isLargeScreen } = useScreenSize();

	return (
		<Flex className={styles.layout} gap="20" align="start">
			<Card className={styles.main}>
				<Flex className={styles.header} direction="row" justify="between">
					<Flex className={styles['title-block']} direction="row" justify="between" align="center">
						<Text variant={isMobileS ? mobilVariant : variant} isMainTitle maxRows={1}>
							{title}
						</Text>
						{isEmailVerified && actionButton && (
							<Button
								variant={actionButton.variantButton ?? 'link-purple'}
								suffix={actionButton.suffix}
								onClick={actionButton.onClick}
							>
								{actionButton.label}
							</Button>
						)}
					</Flex>
					{isSmallScreen && <FiltersDrawer>{filters}</FiltersDrawer>}
				</Flex>
				<>
					{children}
					{!isLargeScreen && secondaryContent}
					{pagination}
				</>
			</Card>
			{isEmailVerified && secondaryAction && (
				<Button
					className={styles['absolute-button']}
					variant={secondaryAction.variantButton ?? 'outline'}
					size={secondaryAction.size ?? 'large'}
					onClick={secondaryAction.onClick}
				>
					{secondaryAction.label}
					{secondaryAction.count > 0 ? `(${secondaryAction.count})` : ''}
				</Button>
			)}
			<Flex direction="column" gap="20" className={styles['filters-container']}>
				<Card className={styles.filters}>{filters}</Card>
				{isLargeScreen && secondaryContent}
			</Flex>
		</Flex>
	);
};
