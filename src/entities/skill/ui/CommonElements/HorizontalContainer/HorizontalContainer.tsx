import { ReactNode } from 'react';

import style from './HorizontalContainer.module.css';
interface HorizontalContainerProps {
	children: ReactNode;
}
export const HorizontalContainer = ({ children }: HorizontalContainerProps) => {
	return <div className={style.container}>{children}</div>;
};
