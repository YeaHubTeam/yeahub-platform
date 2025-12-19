import classNames from 'classnames';
import { ComponentPropsWithoutRef, MouseEventHandler } from 'react';

import { Pallete } from '@/shared/libs';

import styles from './Icon.module.css';
import { icons } from './icons';
import { IconName, IconSize } from './types';

export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
	icon: IconName;
	size?: IconSize;
	color?: Pallete;
	borderRadius?: string | number;
	className?: string;
	onClick?: MouseEventHandler<SVGElement>;
	dataTestId?: string;
}

export const Icon = ({
	size = 24,
	className,
	color,
	icon,
	onClick,
	dataTestId,
	...props
}: IconProps) => {
	const SVG = icons[icon];
	const svgColor = `var(--color-${color})`;

	return (
		<SVG
			{...props}
			className={classNames(className, { [styles.clickable]: Boolean(onClick) })}
			color={svgColor}
			width={size}
			height={size}
			onClick={onClick}
			data-testid={dataTestId}
			// viewBox={`0 0 32 32`}
			// preserveAspectRatio="xMidYMid meet"
		/>
	);
};
