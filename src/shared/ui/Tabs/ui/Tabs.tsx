/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
//ToDo заменить на UIKit
import { useEffect, useRef } from 'react';

import style from './Tabs.module.css';

interface TabProps {
	names: Array<string>;
	title: string;
	tabToggle: number;
	setTabToggle: React.Dispatch<React.SetStateAction<number>>;
}

export const Tabs = ({ names, title, tabToggle, setTabToggle }: TabProps) => {
	const lineRef = useRef<HTMLDivElement>(null);

	const handleTabToggle = (e: React.MouseEvent<HTMLLIElement>, id: number) => {
		const tabElement = e.target as HTMLLIElement;
		const tabRect = tabElement.offsetLeft;

		setTabToggle(id);
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
				{names.map((name, index) => (
					<li
						key={index}
						className={`${style['tab-item']} ${tabToggle === index ? style.active : ''}`}
						onClick={(e) => handleTabToggle(e, index)}
					>
						{name}
					</li>
				))}
			</ul>
		</div>
	);
};
