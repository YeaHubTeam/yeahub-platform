import classNames from 'classnames';
import { ReactNode, useRef, useState } from 'react';

import { useScreenSize } from '@/shared/hooks';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { ACCORDION_TEST_IDS } from '../model/constans';

import styles from './Accordion.module.css';

export interface AccordionProps {
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
			data-testid={ACCORDION_TEST_IDS.ACCORDION}
		>
			<div
				className={classNames(styles.heading, { [styles['accordion-opened']]: isOpen })}
				data-testid={ACCORDION_TEST_IDS.HEADING}
			>
				<button
					className={styles.button}
					onClick={onOpenAccordion}
					data-testid={ACCORDION_TEST_IDS.BUTTON}
				>
					<Text
						variant={isMobileS ? 'body3-accent' : 'body5-accent'}
						className={styles.title}
						dataTestId={ACCORDION_TEST_IDS.TITLE}
					>
						{title}
					</Text>
					<Icon
						icon="arrowShortDown"
						size={24}
						color="purple-700"
						className={classNames(styles.icon, { [styles['accordion-opened']]: isOpen })}
						dataTestId={ACCORDION_TEST_IDS.ICON}
					/>
				</button>
			</div>
			<div
				className={styles['content-wrapper']}
				style={{ height: isOpen ? contentRef.current?.scrollHeight : 0 }}
			>
				<div className={styles.content} ref={contentRef} data-testid={ACCORDION_TEST_IDS.CONTENT}>
					{children}
				</div>
			</div>
		</div>
	);
};
