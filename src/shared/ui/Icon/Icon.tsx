import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

import { Pallete } from '@/shared/types/types';

import { icons } from './icons';
import { IconName, IconSize } from './types';

import styles from './Icon.module.css';

export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
	icon: IconName;
	size?: IconSize;
	color?: Pallete;
	className?: string;
	onClick?: () => void;
}

export const Icon = ({ size = 24, className, color, icon, onClick, ...props }: IconProps) => {
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
			// viewBox={`0 0 32 32`}
			// preserveAspectRatio="xMidYMid meet"
		/>
	);
};
