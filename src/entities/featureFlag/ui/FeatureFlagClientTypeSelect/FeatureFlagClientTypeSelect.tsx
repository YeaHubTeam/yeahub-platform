import { Dropdown, Option } from '@/shared/ui/Dropdown';

import { clientTypes } from '../../model/constants/featureFlags';
import { ClientType } from '../../model/types/featureFlag';

interface FeatureFlagClientTypeSelectProps {
	value?: ClientType;
	onChange: (value: ClientType) => void;
	label: string;
}

export const FeatureFlagClientTypeSelect = ({
	value,
	onChange,
	label,
}: FeatureFlagClientTypeSelectProps) => {
	const handleSelect = (value: string | number) => {
		onChange(value as ClientType);
	};

	return (
		<Dropdown width={400} label={label} value={value} onSelect={handleSelect}>
			{clientTypes.map((clientType) => (
				<Option key={clientType} value={clientType} label={clientType} />
			))}
		</Dropdown>
	);
};
