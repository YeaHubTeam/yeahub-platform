/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
//ToDo убрать ограничение правил для esLint
import { useEffect, useRef } from 'react';

import cls from './Tabs.module.css';

interface TabProps {
	names: Array<string>;
	title: string;
	tabToggle: number; // Принимаем tabToggle извне
	setTabToggle: React.Dispatch<React.SetStateAction<number>>; // Принимаем setTabToggle извне
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
			`.${cls['tab-item']}.${cls.active}`,
		) as HTMLLIElement | null;
		if (tabElement && lineRef.current) {
			const tabRect = tabElement.offsetLeft;
			lineRef.current.style.width = `${tabElement.offsetWidth}px`;
			lineRef.current.style.left = `${tabRect}px`;
		}
	}, []);

	return (
		<div className={cls['tab-container']}>
			<div className={cls.line} ref={lineRef}></div>
			<h2>{title}</h2>
			<ul className={cls['tab-list']}>
				{names.map((name, index) => (
					<li
						key={index}
						className={`${cls['tab-item']} ${tabToggle === index ? cls.active : ''}`}
						onClick={(e) => handleTabToggle(e, index)}
					>
						{name}
					</li>
				))}
			</ul>
		</div>
	);
};
