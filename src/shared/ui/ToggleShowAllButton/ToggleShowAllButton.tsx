import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';

import { Button } from '../Button';

interface ToggleShowAllButtonProps {
	isToggled: boolean;
	onToggle: () => void;
	icon?: React.ReactNode;
}

export const ToggleShowAllButton = ({ isToggled, onToggle, icon }: ToggleShowAllButtonProps) => {
	const { t: tCommon } = useTranslation(i18Namespace.translation);

	return (
		<Button variant="link" onClick={onToggle} preffix={icon}>
			{!isToggled ? tCommon(Translation.SHOW_ALL) : tCommon(Translation.HIDE)}
		</Button>
	);
};
