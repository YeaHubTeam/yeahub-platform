import { ReactNode } from 'react';

import cls from './HorizontalContainer.module.css';
interface HorizontalContainerProps {
	children: ReactNode;
}
export const HorizontalContainer = ({ children }: HorizontalContainerProps) => {
	return <div className={cls.container}>{children}</div>;
};
