import { FloatingFocusManager, FloatingPortal, useMergeRefs } from '@floating-ui/react';
import React, {
	ButtonHTMLAttributes,
	cloneElement,
	forwardRef,
	isValidElement,
	ReactNode,
	useId,
	useLayoutEffect,
} from 'react';
import { PopoverContext } from '../context/popoverContext';
import { usePopoverContext } from '../context/usePopoverContext';
import { PopoverOptions, usePopover } from '../hooks/usePopover';

export const Popover = ({
	children,
	modal = false,
	...restOptions
}: {
	children: React.ReactNode;
} & PopoverOptions) => {
	const popover = usePopover({ modal, ...restOptions });
	return <PopoverContext.Provider value={popover}>{children}</PopoverContext.Provider>;
};

interface PopoverTriggerProps {
	children: React.ReactNode;
	asChild?: boolean;
	triggerRef?: React.Ref<HTMLElement>;
}

interface PopoverCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

interface PopoverContentProps extends React.HTMLProps<HTMLDivElement> {
	style?: React.CSSProperties;
}

export const PopoverTrigger = forwardRef<
	HTMLElement,
	React.HTMLProps<HTMLElement> & PopoverTriggerProps
>(function PopoverTrigger({ children, asChild = false, triggerRef, ...props }, propRef) {
	const context = usePopoverContext();
	const ref = useMergeRefs([context.refs.setReference, propRef, triggerRef]);

	if (asChild && isValidElement(children)) {
		return cloneElement(
			children,
			context.getReferenceProps({
				ref,
				...props,
				...children.props,
				'data-state': context.open ? 'open' : 'closed',
			}),
		);
	}

	return (
		<button
			ref={ref}
			type="button"
			data-state={context.open ? 'open' : 'closed'}
			className="yeahub-popover-trigger"
			{...context.getReferenceProps(props)}
		>
			{children}
		</button>
	);
});

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
	function PopoverContent({ style, ...props }: PopoverContentProps, propRef) {
		const { context: floatingContext, ...context } = usePopoverContext();
		const ref = useMergeRefs([context.refs.setFloating, propRef]);

		if (!floatingContext.open) return null;

		return (
			<FloatingPortal>
				<FloatingFocusManager context={floatingContext} modal={context.modal}>
					<div
						ref={ref}
						style={{ ...context.floatingStyles, ...style }}
						aria-labelledby={context.labelId}
						aria-describedby={context.descriptionId}
						{...context.getFloatingProps(props)}
					>
						{props.children}
					</div>
				</FloatingFocusManager>
			</FloatingPortal>
		);
	},
);

export const PopoverHeading = forwardRef<HTMLHeadingElement, React.HTMLProps<HTMLHeadingElement>>(
	function PopoverHeading(props, ref) {
		const { setLabelId } = usePopoverContext();
		const id = useId();

		useLayoutEffect(() => {
			setLabelId(id);
			return () => setLabelId(undefined);
		}, [id, setLabelId]);

		return (
			<h2 {...props} ref={ref} id={id}>
				{props.children}
			</h2>
		);
	},
);

export const PopoverDescription = forwardRef<
	HTMLParagraphElement,
	React.HTMLProps<HTMLParagraphElement>
>(function PopoverDescription(props, ref) {
	const { setDescriptionId } = usePopoverContext();
	const id = useId();

	useLayoutEffect(() => {
		setDescriptionId(id);
		return () => setDescriptionId(undefined);
	}, [id, setDescriptionId]);

	return <p {...props} ref={ref} id={id} />;
});

export const PopoverClose = forwardRef<HTMLButtonElement, PopoverCloseProps>(function PopoverClose(
	props: PopoverCloseProps,
	ref,
) {
	const { setOpen } = usePopoverContext();
	const { onClick, ...rest } = props;
	return (
		<button
			type="button"
			ref={ref}
			{...rest}
			onClick={(event) => {
				onClick?.(event);
				setOpen(false);
			}}
		>
			{props.children}
		</button>
	);
});
