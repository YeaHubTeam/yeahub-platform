import classNames from 'classnames';
import { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Arrow from '@/shared/assets/icons/arrowShortDown.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Text } from '@/shared/ui/Text';

import { Flex } from '../Flex';

import styles from './Card.module.css';

type CardSize = 'small' | 'medium';

export interface CardProps {
	children?: ReactNode;
	expandable?: boolean;
	className?: string;
	title?: string;
	actionRoute?: string;
	actionTitle?: string;
	actionDisabled?: boolean;
	withShadow?: boolean;
	withOutsideShadow?: boolean;
	withBorder?: boolean;
	isActionPositionBottom?: boolean;
	isTitleCenter?: boolean;
	dataTestId?: string;
	size?: CardSize;
}

interface ExpandIconProps {
	isExpand: boolean;
}

/**
 * Reusable block component
 * @param { string | ReactNode } children block content
 * @param { boolean } expandable if the flag is true then the block is expandable (an expand button appears)
 * @param { string } className className string for custom styles
 */

const ExpandIcon = ({ isExpand }: ExpandIconProps) => {
	return (
		<svg
			className={classNames(styles['card-expand-svg'], {
				[styles['card-expand-svg-visibility']]: isExpand,
			})}
			width="100%"
			height="90"
			viewBox="0 0 740 90"
			preserveAspectRatio="xMidYMid slice"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M0 0H740V66C740 79.2548 729.255 90 716 90H24C10.7452 90 0 79.2548 0 66V0Z"
				fill="url(#paint0_linear_1262_19118)"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_1262_19118"
					x1="370"
					y1="0"
					x2="370"
					y2="90"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="white" stopOpacity="0" />
					<stop offset="0.456" stopColor="white" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export const Card = ({
	children,
	className = '',
	withShadow = false,
	withOutsideShadow = false,
	withBorder = false,
	expandable = false,
	title = '',
	actionTitle = '',
	actionRoute = '',
	actionDisabled = false,
	isActionPositionBottom = false,
	isTitleCenter = false,
	dataTestId = 'Card',
	size = 'medium',
}: CardProps) => {
	const contentRef = useRef<HTMLDivElement>(null);
	const [isExpand, setIsExpand] = useState(false);
	const [contentHeight, setContentHeight] = useState(0);
	const { t } = useTranslation(i18Namespace.translation);

	useLayoutEffect(() => {
		if (expandable) {
			const changeContentHeight = () => {
				if (contentRef?.current) {
					const height = contentRef.current?.getBoundingClientRect().height;

					if (height < 250) {
						setIsExpand(false);
					}
					setContentHeight(height);
				}
			};

			window.addEventListener('resize', changeContentHeight);
			return () => {
				window.removeEventListener('resize', changeContentHeight);
			};
		}
	}, [expandable]);

	useLayoutEffect(() => {
		if (contentRef?.current) {
			setContentHeight(contentRef.current?.getBoundingClientRect().height);
		}
	}, [expandable]);

	const expandHandler = () => {
		setIsExpand((prev) => !prev);
	};

	const isHeightForExpand = expandable && contentHeight >= 250;

	return (
		<Flex
			dataTestId={dataTestId}
			gap="16"
			direction="column"
			className={classNames(styles.card, className, styles[size], {
				[styles['card-expandable']]: isHeightForExpand,
				[styles['card-outside-shadow']]: withOutsideShadow,
				[styles.border]: withBorder,
			})}
			style={{
				height: isExpand ? `${contentHeight + 120}px` : '',
			}}
		>
			{(title || actionRoute) && (
				<div
					className={classNames(styles['card-header'], {
						[styles['card-header-title-center']]: isTitleCenter,
					})}
				>
					{title && <Text variant="body5-accent">{title}</Text>}
					{actionRoute ? (
						<Link
							to={actionRoute}
							className={classNames(styles.link, {
								[styles['link-bottom']]: isActionPositionBottom,
								[styles['link-disabled']]: actionDisabled,
							})}
						>
							<Text variant="body3-strong" color={actionDisabled ? 'purple-300' : 'purple-700'}>
								{actionTitle}
							</Text>
							<Icon
								icon="arrowRight"
								size={24}
								color={actionDisabled ? 'purple-300' : 'purple-700'}
								className={styles.icon}
							/>
						</Link>
					) : null}
				</div>
			)}

			<div
				className={classNames(styles.content, {
					[styles['content-shadow']]: withShadow,
					[styles['content-bottom']]: isActionPositionBottom,
					[styles['content-height']]: !actionRoute,
				})}
				ref={contentRef}
			>
				{children}
			</div>

			{expandable && isHeightForExpand && (
				<>
					<ExpandIcon isExpand={isExpand} />
					<button onClick={expandHandler} className={`${styles.button}`}>
						{!isExpand ? t('expand') : t('collapse')}
						<Arrow className={classNames({ [styles['card-arrow-expanded']]: isExpand })} />
					</button>
				</>
			)}
		</Flex>
	);
};
