/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
//ToDo заменить на UIKit
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './Tabs.module.css';

interface EditTab {
	/**
	 * Unique identifier for the tab.
	 */
	id: number;
	/**
	 * Title of the tab, used in navigation (e.g., for anchor links).
	 */
	title: string;
	/**
	 * Label displayed for the tab in the UI.
	 */
	label: string;
	/**
	 * Component rendered when this tab is active.
	 */
	Component: () => JSX.Element;
}

interface TabsProps {
	/**
	 * Array of tab objects defining their properties.
	 */
	tabs: EditTab[];
	/**
	 * Optional title displayed above the tabs.
	 */
	title?: string;
	/**
	 * Index of the currently active tab.
	 */
	tabToggle: number;
	/**
	 * Setter function to update the currently active tab index.
	 */
	setTabToggle: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Tabs component for rendering a tabbed interface.
 * Allows switching between tabs and highlights the active tab.
 * The active tab is tracked with `tabToggle` and dynamically updates styles
 * for a sliding line under the active tab.
 *
 * @param tabs - Array of tab objects with `id`, `title`, `label`, and `Component`.
 * @param title - Optional title for the tabs section.
 * @param tabToggle - Currently active tab index.
 * @param setTabToggle - Function to set the active tab index.
 * @constructor
 */

export const Tabs = ({ tabs, title, tabToggle, setTabToggle }: TabsProps) => {
	const lineRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	const handleTabToggle = (e: React.MouseEvent<HTMLLIElement>, id: number, pathname: string) => {
		const tabElement = e.target as HTMLLIElement;
		const tabRect = tabElement.offsetLeft;

		setTabToggle(id);

		navigate(`#${pathname}`, { replace: true });

		if (lineRef.current) {
			lineRef.current.style.width = tabElement.offsetWidth + 'px';
			lineRef.current.style.left = `${tabRect}px`;
		}
	};

	useEffect(() => {
		const tabElement = document.querySelector(
			`.${style['tab-item']}.${style.active}`,
		) as HTMLLIElement | null;
		if (tabElement && lineRef.current) {
			const tabRect = tabElement.offsetLeft;
			lineRef.current.style.width = `${tabElement.offsetWidth}px`;
			lineRef.current.style.left = `${tabRect}px`;
		}
	}, []);

	return (
		<div className={style['tab-container']}>
			{title && <h2>{title}</h2>}
			<ul className={style['tab-list']}>
				{tabs.map((tab, index) => (
					<li
						key={index}
						className={`${style['tab-item']} ${tabToggle === index ? style.active : ''}`}
						onClick={(e) => handleTabToggle(e, index, tab.title)}
					>
						{tab.label}
					</li>
				))}
			</ul>
		</div>
	);
};
