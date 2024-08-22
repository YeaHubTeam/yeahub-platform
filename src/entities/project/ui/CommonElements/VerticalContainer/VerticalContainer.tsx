import { ReactNode } from 'react';

import style from './VerticalContainer.module.css';

interface VerticalContainerProps {
	children: ReactNode;
}

export const VerticalContainer = ({ children }: VerticalContainerProps) => {
	return <div className={style.container}>{children}</div>;
};
