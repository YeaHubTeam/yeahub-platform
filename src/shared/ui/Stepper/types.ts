import { type IconName } from '@/shared/ui/Icon';

export interface Step<T> {
	id: T;
	label: string;
	image: IconName;
	Component: (props: { goNextStep?: () => void }) => JSX.Element;
}
