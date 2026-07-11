import { useTranslation } from 'react-i18next';

import { i18Namespace, Marketplace } from '@/shared/config';
import { EntitySelect, type EntitySelectProps } from '@/shared/ui/EntitySelect';

import { useGetResourceTypesQuery } from '../../api/resourceApi';

export type ResourcesSelectProps = Pick<
	EntitySelectProps<string>,
	'value' | 'onChange' | 'hasMultiple' | 'disabled'
>;

export const ResourcesSelect = ({
	onChange,
	value,
	hasMultiple,
	disabled,
}: ResourcesSelectProps) => {
	const { t } = useTranslation(i18Namespace.marketplace);

	const { data } = useGetResourceTypesQuery();

	const resources = data?.map((item) => ({
		id: item.code,
		title: t(`resourceTypes.${item.code}`, item.code),
	}));

	return (
		<EntitySelect
			items={resources || []}
			value={value}
			onChange={onChange}
			hasMultiple={hasMultiple}
			disabled={disabled}
			chooseTranslationKey={t(Marketplace.SELECT_CHOOSE)}
			emptyTranslationKey={t(Marketplace.SELECT_EMPTY)}
			selectedTranslationKey={t(Marketplace.SELECT_SELECTED)}
		/>
	);
};
