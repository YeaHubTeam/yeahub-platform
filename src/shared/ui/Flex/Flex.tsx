import classNames from 'classnames';
import { ElementType, PropsWithChildren } from 'react';

import {
	alignClasses,
	directionClasses,
	flexClasses,
	gapClasses,
	justifyClasses,
	wrapClasses,
} from './constants';
import styles from './Flex.module.css';
import type { DivProps, FlexAlign, FlexDirection, FlexGap, FlexJustify, FlexWrap } from './types';

export interface FlexProps extends DivProps {
	className?: string;
	justify?: FlexJustify;
	align?: FlexAlign;
	wrap?: FlexWrap;
	direction?: FlexDirection;
	gap?: FlexGap;
	flex?: number;
	maxWidth?: boolean;
	maxHeight?: boolean;
	dataTestId?: string;
	componentType?: ElementType;
}

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
