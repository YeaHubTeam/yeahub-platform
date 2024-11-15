import { ReactNode, useRef, useState } from 'react';

import Arrow from '@/shared/assets/icons/arrow.svg';

import styles from './Accordion.module.css';

interface AccordionProps {
	/**
	 *The part of the content that remains visible when closed
	 */
	title: string;
	/**
	 *The part of content that appear when open
	 */
	children?: ReactNode;
}

/**
 * This component can hide and show the content
 * @param title
 * @param children
 * @constructor
 */
export const Accordion = ({ title, children }: AccordionProps) => {
	const [isOpen, setisOpen] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	const onAccordionOpen = () => {
		setisOpen(!isOpen);
	};

	return (
		<div className={styles.accordion}>
			<h3 className={styles.heading}>
				<button className={styles.button} onClick={onAccordionOpen}>
					<span className={styles.title}>{title}</span>
					<Arrow className={`${isOpen ? styles['icon-opened'] : ''} ${styles.icon}`}></Arrow>
				</button>
			</h3>
			<div
				className={styles.collapsed}
				style={isOpen ? { height: contentRef.current?.scrollHeight } : { height: 0 }}
			>
				<div className={styles.content} ref={contentRef}>
					{children}
				</div>
			</div>
		</div>
	);
};
