import {
	arrow,
	autoUpdate,
	flip,
	FloatingArrow,
	FloatingPortal,
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

import styles from './Tooltip.module.css';
import { TooltipProps } from './types';

export const Tooltip = ({
	title,
	ariaLabel,
	children,
	className,
	color = 'violet',
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

	const colorMap: Record<string, string> = {
		violet: 'purple',
		gray: 'gray',
		yellow: 'yellow',
		red: 'red',
	};

	const shadeMap: Record<string, string> = {
		gray: '300',
		yellow: '800',
		red: '700',
	};

	const baseColor = colorMap[color] ?? color;
	const shade = shadeMap[color] ?? '600';

	const stroke = `var(--color-${baseColor}-${shade})`;

	return (
		<>
			<span className={styles.children} ref={refs.setReference} {...getReferenceProps()}>
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
							stroke={stroke}
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
