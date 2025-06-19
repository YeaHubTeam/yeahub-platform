import classNames from 'classnames';
import { ReactNode, useRef, useState } from 'react';

import { useScreenSize } from '@/shared/hooks';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import styles from './Accordion.module.css';

interface AccordionProps {
	/**
	 *The part of the content that remains visible when closed
	 */
	title: string;
	className?: string;
	/**
	 *The part of content that appear when open
	 */
	children: ReactNode;
}

/**
 * This component can hide and show the content
 * @param title
 * @param className
 * @param children
 * @constructor
 */
export const Accordion = ({ title, className, children }: AccordionProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const contentRef = useRef<HTMLDivElement | null>(null);
	const { isMobileS } = useScreenSize();

	const onOpenAccordion = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div
			className={classNames(styles.accordion, { [styles['accordion-opened']]: isOpen }, className)}
		>
			<div className={classNames(styles.heading, { [styles['accordion-opened']]: isOpen })}>
				<button className={styles.button} onClick={onOpenAccordion}>
					<Text variant={isMobileS ? 'body3-accent' : 'body5-accent'} className={styles.title}>
						{title}
					</Text>
					<Icon
						icon="arrowShortDown"
						size={24}
						color="purple-700"
						className={classNames(styles.icon, { [styles['accordion-opened']]: isOpen })}
					/>
				</button>
			</div>
			<div
				className={styles['content-wrapper']}
				style={{ height: isOpen ? contentRef.current?.scrollHeight : 0 }}
			>
				<div className={styles.content} ref={contentRef}>
					{children}
				</div>
			</div>
		</div>
	);
};
