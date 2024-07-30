/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
//ToDo заменить на UIKit
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './Tabs.module.css';

interface EditTab {
	id: number;
	title: string;
	label: string;
	Component: () => JSX.Element;
}

interface TabProps {
	tabs: EditTab[];
	title: string;
	tabToggle: number;
	setTabToggle: React.Dispatch<React.SetStateAction<number>>;
}

export const Tabs = ({ tabs, title, tabToggle, setTabToggle }: TabProps) => {
	const lineRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	const handleTabToggle = (e: React.MouseEvent<HTMLLIElement>, id: number, pathname: string) => {
		const tabElement = e.target as HTMLLIElement;
		const tabRect = tabElement.offsetLeft;

		setTabToggle(id);

		navigate(`#${pathname}`);

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
			<div className={style.line} ref={lineRef}></div>
			<h2>{title}</h2>
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
