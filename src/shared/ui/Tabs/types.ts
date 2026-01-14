export interface Tab<T> {
	id: T;
	label: string;
	count?: number;
	Component: () => JSX.Element;
}

export type TabColor = 'default' | 'gray';
