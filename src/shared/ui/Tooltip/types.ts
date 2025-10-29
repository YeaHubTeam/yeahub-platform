import { type Placement, UseHoverProps } from '@floating-ui/react';

import { TextVariant } from '@/shared/ui/Text/types';

export type TooltipColor = 'green' | 'yellow' | 'gray' | 'violet' | 'red';

export interface TooltipProps {
	title: React.ReactNode;
	children?: React.ReactNode;
	placement?: Placement;
	offsetTooltip?: number;
	color?: TooltipColor;
	ariaLabel?: string;
	className?: string;
	shouldShowTooltip?: boolean;
	tooltipDelay?: UseHoverProps['delay'];
	titleVariant?: TextVariant;
}
