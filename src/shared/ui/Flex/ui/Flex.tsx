import classNames from 'classnames';
import { DetailedHTMLProps, ElementType, HTMLAttributes, PropsWithChildren } from 'react';

import styles from './Flex.module.css';

type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around';
type FlexAlign = 'start' | 'center' | 'end' | 'normal';
type FlexDirection = 'row' | 'column';
type FlexGap = '4' | '8' | '12' | '16' | '20' | '24' | '32' | '40';

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

const gapClasses: Record<FlexGap, string> = {
	'4': styles.gap4,
	'8': styles.gap8,
	'12': styles.gap12,
	'16': styles.gap16,
	'20': styles.gap20,
	'24': styles.gap24,
	'32': styles.gap32,
	'40': styles.gap40,
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
	 * A property that indicates the direction of the elements
	 */
	direction?: FlexDirection;
	/**
	 * A property indicating the distance between elements
	 */
	gap?: FlexGap;
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
 * @param direction
 * @param gap
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
	direction,
	gap,
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
				direction && directionClasses[direction],
				gap && gapClasses[gap],
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
