import classNames from 'classnames';
import { ReactNode, useCallback, useLayoutEffect, useRef, useState } from 'react';

import Arrow from '@/shared/assets/icons/arrow.svg';

import { LinkWithArrowRight } from '../../LinkWithArrowRight';

import styles from './Card.module.css';
import { InterviewPreparationHeader } from './InterviewPreparationHeader/InterviewPreparationHeader';

interface CardProps {
	children?: ReactNode;
	expandable?: boolean;
	className?: string;
	title?: string;
	actionRoute?: string;
	actionTitle?: string;
	withShadow?: boolean;
}

/**
 * Reusable block component
 * @param { string | ReactNode } children block content
 * @param { boolean } expandable if the flag is true then the block is expandable (an expand button appears)
 * @param { string } className className string for custom styles
 */

const ExpandIcon = () => {
	return (
		<svg
			className={`${styles['card-expand-svg']}`}
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
					<stop offset="0.491518" stopColor="white" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export const Card = ({
	children,
	className = '',
	withShadow = false,
	expandable = false,
	title = '',
	actionTitle = '',
	actionRoute = '',
}: CardProps) => {
	const contentRef = useRef<HTMLDivElement>(null);
	const [isExpand, setIsExpand] = useState(false);
	const [contentHeight, setContentHeight] = useState(0);

	useLayoutEffect(() => {
		if (expandable) {
			const changeContentHeight = () => {
				if (contentRef?.current) {
					const height = contentRef.current?.getClientRects()[0].height;
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
			setContentHeight(contentRef.current?.getClientRects()[0].height);
		}
	}, [expandable]);

	// This function with useCallback isn't needed because setIsExpand is memoized
	// Can we pass setIsExpand to the button?
	const expandHandler = useCallback(() => {
		setIsExpand((prev) => !prev);
	}, []);
	//

	const isHeightForExpand = contentHeight >= 250;

	const cardClasses = classNames(styles.card, className, {
		[styles['card-expandable']]: isHeightForExpand,
	});

	return (
		<div
			className={cardClasses}
			style={{
				height: isExpand ? `${contentHeight + 90}px` : '',
			}}
		>
			<div className={styles['card-header']}>
				{title ? <InterviewPreparationHeader title={title} /> : null}
				{actionRoute ? <LinkWithArrowRight link={actionRoute} linkTitle={actionTitle} /> : null}
			</div>

			<div
				className={classNames(styles.content, {
					[styles['content-shadow']]: withShadow,
				})}
				ref={contentRef}
			>
				{children}
			</div>

			{expandable && isHeightForExpand && (
				<>
					{!isExpand ? <ExpandIcon /> : null}
					<button onClick={expandHandler} className={`${styles.button}`}>
						{!isExpand ? 'Развернуть' : 'Свернуть'}
						<Arrow className={`${isExpand ? styles['card-arrow-expanded'] : ''}`} />
					</button>
				</>
			)}
		</div>
	);
};