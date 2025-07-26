import { UseHoverProps, type Placement } from '@floating-ui/react';

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
}
