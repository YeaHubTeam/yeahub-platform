import { ReactNode } from 'react';

import cls from './VerticalContainer.module.css';

interface VerticalContainerProps {
	children: ReactNode;
}

export const VerticalContainer = ({ children }: VerticalContainerProps) => {
	return <div className={cls.container}>{children}</div>;
};
