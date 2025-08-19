import { ChangeEvent } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { Input } from '@/shared/ui/Input';

import { socialNetworks } from '../../model/data/socialNetwork';
import { SocialNetwork, SocialNetworkCode } from '../../model/types/socialNetwork';

export const SocialNetWorkInputs = () => {
	const { fields, update } = useFieldArray<{ socialNetworks: SocialNetwork[] }>({
		name: 'socialNetworks',
	});
	const { control } = useFormContext();

	const onChangeSocialNetwork =
		(socialNetworkCode: SocialNetworkCode, onChange: (e: ChangeEvent<HTMLInputElement>) => void) =>
		(e: ChangeEvent<HTMLInputElement>) => {
			onChange(e);
			const value = e.target.value;
			if (!socialNetworkCode) return;

			const index =
				fields.length > 0 && fields.findIndex((field) => field?.code === socialNetworkCode);
			if (typeof index === 'number' && index > -1) {
				update(index, { code: socialNetworkCode, title: value });
			}
		};

	return (
		<Flex gap="20" maxWidth wrap="wrap">
			{socialNetworks.map((socialNetwork, index) => (
				<FormControl
					key={socialNetwork.code}
					name={`socialNetworks.${index}.title`}
					control={control}
					label={socialNetwork.title}
				>
					{(field) => (
						<Input
							{...field}
							onChange={onChangeSocialNetwork(socialNetwork.code, field.onChange)}
							size="S"
						/>
					)}
				</FormControl>
			))}
		</Flex>
	);
};
