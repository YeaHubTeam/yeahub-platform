import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { DeleteButton } from '@/shared/ui/DeleteButton';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover, type PopoverMenuItem } from '@/shared/ui/Popover';

interface ResourceActionsProps {
	onDelete: () => void;
	disabled?: boolean;
}

export const ResourceActions = ({ onDelete, disabled = false }: ResourceActionsProps) => {
	const { t } = useTranslation(i18Namespace.translation);

	const menuItems: PopoverMenuItem[] = [
		{
			renderComponent: () => (
				<DeleteButton
					modalMessage={Translation.MODAL_RESOURCE_DELETE_CONFIRMATION}
					onDelete={onDelete}
					disabled={disabled}
				/>
			),
		},
	];

	return (
		<Popover menuItems={menuItems}>
			{({ onToggle }) => (
				<IconButton
					aria-label={t(Translation.MORE)}
					form="square"
					icon={<Icon icon="dotsThreeVertical" size={20} />}
					size="medium"
					variant="tertiary"
					onClick={onToggle}
				/>
			)}
		</Popover>
	);
};
