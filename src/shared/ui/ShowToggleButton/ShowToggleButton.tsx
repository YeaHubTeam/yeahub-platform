import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Translation, i18Namespace } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import styles from './ShowToggleButton.module.css';

interface ShowToggleButtonProps {
	isExpanded: boolean;
	onToggle: () => void;
}

export const ShowToggleButton = ({ isExpanded, onToggle }: ShowToggleButtonProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	return (
		<Button
			variant="link"
			size="large"
			onClick={onToggle}
			aria-expanded={isExpanded}
			suffix={
				<Icon
					icon="arrowShortDown"
					size={24}
					color="purple-700"
					aria-hidden
					className={classNames(styles.icon, {
						[styles.expanded]: isExpanded,
					})}
				/>
			}
		>
			{isExpanded ? t(Translation.HIDE) : t(Translation.SHOW_ALL)}
		</Button>
	);
};
