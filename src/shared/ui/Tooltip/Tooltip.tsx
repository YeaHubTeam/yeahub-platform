import {
	FloatingArrow,
	FloatingPortal,
	arrow,
	autoUpdate,
	flip,
	offset,
	shift,
	useFloating,
	useHover,
	useInteractions,
	useRole,
	useTransitionStyles,
} from '@floating-ui/react';
import cn from 'classnames';
import { useRef, useState } from 'react';

import { Text } from '@/shared/ui/Text';

import { TooltipProps } from './types';

import styles from './Tooltip.module.css';

export const Tooltip = ({
	title,
	ariaLabel,
	children,
	className,
	color = 'green',
	offsetTooltip = 10,
	placement = 'top',
	shouldShowTooltip = true,
	tooltipDelay = { open: 0, close: 150 },
}: TooltipProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const arrowRef = useRef<SVGSVGElement>(null);

	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		placement,
		middleware: [
			offset(offsetTooltip),
			flip({
				crossAxis: placement.includes('-'),
				fallbackAxisSideDirection: 'start',
				padding: 5,
			}),
			shift(),
			arrow({
				element: arrowRef,
			}),
		],
		whileElementsMounted: autoUpdate,
	});

	const hover = useHover(context, { move: false, delay: tooltipDelay });
	const role = useRole(context, { role: 'tooltip' });

	const { getReferenceProps, getFloatingProps } = useInteractions([hover, role]);
	const { styles: transitionStyles } = useTransitionStyles(context);

	const isShowTooltip = isOpen && title && shouldShowTooltip;

	return (
		<>
			<span ref={refs.setReference} {...getReferenceProps()}>
				{children}
			</span>
			{isShowTooltip && (
				<FloatingPortal>
					<div
						aria-label={ariaLabel}
						className={cn(styles.tooltip, styles[color], className)}
						ref={refs.setFloating}
						style={{ ...transitionStyles, ...floatingStyles }}
						{...getFloatingProps()}
					>
						<FloatingArrow
							tipRadius={1}
							fill="white"
							stroke={`var(--color-${color === 'violet' ? 'purple' : color}-${color === 'gray' ? '300' : color === 'yellow' ? '800' : '600'})`}
							strokeWidth={1}
							height={8}
							width={16}
							context={context}
							ref={arrowRef}
						/>
						<Text variant="body3-accent">{title}</Text>
					</div>
				</FloatingPortal>
			)}
		</>
	);
};
Tooltip.displayName = 'Tooltip';
