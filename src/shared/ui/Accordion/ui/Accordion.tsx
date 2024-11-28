import classNames from 'classnames';
import { ReactNode, useRef, useState } from 'react';

import Arrow from '@/shared/assets/icons/arrow.svg';

import styles from './Accordion.module.css';

interface AccordionProps {
	title: string;
	children?: ReactNode;
}

export const Accordion = ({ title, children }: AccordionProps) => {
	const [isOpen, setisOpen] = useState(false);
	const contentRef = useRef<HTMLDivElement | null>(null);

	const onAccordionOpen = () => {
		setisOpen(!isOpen);
	};

	return (
		<div className={classNames(styles.accordion, { [styles['accordion-opened']]: isOpen })}>
			<h3 className={styles.heading}>
				<button className={styles.button} onClick={onAccordionOpen}>
					<span className={classNames(styles.title, { [styles['accordion-opened']]: isOpen })}>
						{title}
					</span>
					<Arrow className={classNames(styles.icon, { [styles['accordion-opened']]: isOpen })} />
				</button>
			</h3>
			<div
				className={styles.collapsed}
				style={{ height: isOpen ? contentRef.current?.scrollHeight : 0 }}
			>
				<div className={styles.content} ref={contentRef}>
					{children}
				</div>
			</div>
		</div>
	);
};
