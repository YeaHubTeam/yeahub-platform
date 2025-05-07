import classNames from 'classnames';
import { DetailedHTMLProps, ElementType, HTMLAttributes, PropsWithChildren } from 'react';

import styles from './Flex.module.css';

type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around';
type FlexAlign = 'start' | 'center' | 'end' | 'normal';
type FlexWrap = 'wrap' | 'nowrap';
type FlexDirection = 'row' | 'column';
type FlexGap =
	| '4'
	| '6'
	| '8'
	| '10'
	| '12'
	| '14'
	| '16'
	| '20'
	| '24'
	| '28'
	| '32'
	| '40'
	| '48'
	| '60'
	| '120';

const justifyClasses: Record<FlexJustify, string> = {
	around: styles['justify-around'],
	end: styles['justify-end'],
	between: styles['justify-between'],
	center: styles['justify-center'],
	start: styles['justify-start'],
};

const directionClasses: Record<FlexDirection, string> = {
	row: styles['direction-row'],
	column: styles['direction-column'],
};

const alignClasses: Record<FlexAlign, string> = {
	end: styles['align-end'],
	start: styles['align-start'],
	center: styles['align-center'],
	normal: styles['align-normal'],
};

const wrapClasses: Record<FlexWrap, string> = {
	wrap: styles['wrap'],
	nowrap: styles['nowrap'],
};

const gapClasses: Record<FlexGap, string> = {
	'4': styles.gap4,
	'6': styles.gap6,
	'8': styles.gap8,
	'10': styles.gap10,
	'12': styles.gap12,
	'14': styles.gap14,
	'16': styles.gap16,
	'20': styles.gap20,
	'24': styles.gap24,
	'28': styles.gap28,
	'32': styles.gap32,
	'40': styles.gap40,
	'48': styles.gap48,
	'60': styles.gap60,
	'120': styles.gap120,
};

const flexClasses: Record<number, string> = {
	1: styles.flex1,
};

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export interface FlexProps extends DivProps {
	/**
	 * Additional class with styles
	 */
	className?: string;
	/**
	 * A property indicating the horizontal position of the elements
	 */
	justify?: FlexJustify;
	/**
	 * A property indicating the vertical position of the elements
	 */
	align?: FlexAlign;
	/**
	 * A property indicating the transfer of elements
	 */
	wrap?: FlexWrap;
	/**
	 * A property that indicates the direction of the elements
	 */
	direction?: FlexDirection;
	/**
	 * A property indicating the distance between elements
	 */
	gap?: FlexGap;
	/**
	 * A property that specifies how the block will be stretched relative to its neighbors
	 */
	flex?: number;
	/**
	 * A property indicating that the parent element will be stretched to its full possible width
	 */
	maxWidth?: boolean;
	/**
	 * A property indicating that the parent element will be stretched to its full possible height
	 */
	maxHeight?: boolean;
	/**
	 * A property used for tests to find a specific element in the DOM
	 */
	dataTestId?: string;
	/**
	 * Defines the type of component
	 */
	componentType?: ElementType;
}

/**
 * Component that allows you to change the location of child elements by flex box
 * @param children
 * @param justify
 * @param align
 * @param wrap
 * @param direction
 * @param gap
 * @param flex
 * @param className
 * @param maxWidth
 * @param maxHeight
 * @param dataTestId
 * @param componentType
 * @param otherProps
 * @constructor
 */
export const Flex = ({
	children,
	justify,
	align,
	wrap,
	direction,
	gap,
	flex,
	className = '',
	maxWidth,
	maxHeight,
	dataTestId = 'Flex',
	componentType = 'div',
	...otherProps
}: PropsWithChildren<FlexProps>) => {
	const Component = componentType;

	return (
		<Component
			className={classNames(
				styles.flex,
				justify && justifyClasses[justify],
				align && alignClasses[align],
				wrap && wrapClasses[wrap],
				direction && directionClasses[direction],
				gap && gapClasses[gap],
				flex && flexClasses[flex],
				maxWidth && styles['max-width'],
				maxHeight && styles['max-height'],
				className,
			)}
			{...otherProps}
			data-testid={dataTestId}
		>
			{children}
		</Component>
	);
};
