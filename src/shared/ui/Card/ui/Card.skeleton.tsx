import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import { CardProps } from './Card';
import styles from './Card.module.css';

export const CardSkeleton = ({
	children,
	className = '',
	withShadow = false,
	withOutsideShadow = false,
	title = '',
	actionRoute = '',
	isActionPositionBottom = false,
	isTitleCenter = false,
}: CardProps) => {
	return (
		<Flex
			gap="24"
			direction="column"
			className={classNames(styles.card, className, {
				[styles['card-outside-shadow']]: withOutsideShadow,
			})}
		>
			{(title || actionRoute) && (
				<div
					className={classNames(styles['card-header'], {
						[styles['card-header-title-center']]: isTitleCenter,
					})}
				>
					{title ? <TextSkeleton variant="body5-accent" width={250} /> : null}
					{actionRoute ? (
						<Skeleton
							width={200}
							height={24}
							borderRadius={8}
							className={classNames(styles.link, {
								[styles['link-bottom']]: isActionPositionBottom,
							})}
						/>
					) : null}
				</div>
			)}
			<div
				className={classNames(styles.content, {
					[styles['content-shadow']]: withShadow,
					[styles['content-bottom']]: isActionPositionBottom,
					[styles['content-height']]: !actionRoute,
				})}
			>
				{children}
			</div>
		</Flex>
	);
};
