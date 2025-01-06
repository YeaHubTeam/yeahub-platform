import { ComponentPropsWithoutRef } from 'react';

import { Pallete } from '@/shared/types/types';

import { icons } from '../model/icons';
import { IconName, IconSize } from '../model/types';

export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
	icon: IconName;
	size?: IconSize;
	color?: Pallete;
	className?: string;
}

export const Icon = ({ size = 24, className, color, icon, ...props }: IconProps) => {
	const SVG = icons[icon];
	const svgColor = `var(--color-${color})`;

	return (
		<SVG
			{...props}
			className={className}
			color={svgColor}
			width={size}
			height={size}
			// viewBox={`0 0 32 32`}
			// preserveAspectRatio="xMidYMid meet"
		/>
	);
};
