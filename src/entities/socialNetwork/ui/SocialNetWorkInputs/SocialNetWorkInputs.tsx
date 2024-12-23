import { ChangeEvent } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { FormControl } from '@/shared/ui/FormControl';
import { Input } from '@/shared/ui/Input';

import { SOCIAL_NETWORKS } from '../../model/data/socialNetwork';
import { SocialNetwork, SocialNetworkCode } from '../../model/types/socialNetwork';

import style from './SocialNetWorkInputs.module.css';

export const SocialNetWorkInputs = () => {
	const { fields, update } = useFieldArray<{ socialNetworks: SocialNetwork[] }>({
		name: 'socialNetworks',
	});
	const { control } = useFormContext();
	const onChangeHandler =
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
		<>
			{SOCIAL_NETWORKS.map((socialNetwork, index) => (
				<FormControl
					key={socialNetwork.code}
					name={`socialNetworks.${index}.title`}
					control={control}
					label={socialNetwork.title}
					className={style.form}
				>
					{(field) => (
						<Input
							{...field}
							onChange={onChangeHandler(socialNetwork.code, field.onChange)}
							className={style.input}
							size="S"
						/>
					)}
				</FormControl>
			))}
		</>
	);
};
