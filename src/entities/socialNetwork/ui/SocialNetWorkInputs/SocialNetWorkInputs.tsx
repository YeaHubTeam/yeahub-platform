import { ChangeEvent } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Input } from 'yeahub-ui-kit';

import { FormControl } from '@/shared/ui/FormControl';

import { SOCIAL_NETWORKS } from '../../model/data/socialNetwork';
import { SocialNetwork, SocialNetworkCode } from '../../model/types/socialNetwork';

import style from './SocialNetWorkInputs.module.css';

export const SocialNetWorkInputs = () => {
	const { fields, update, append, remove } = useFieldArray<{ socialNetwork: SocialNetwork[] }>({
		name: 'socialNetwork',
	});
	const { control } = useFormContext();

	const onChangeHandler =
		(socialNetworkCode: SocialNetworkCode) => (e: ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			if (!socialNetworkCode) return;

			const index =
				fields.length > 0 && fields.findIndex((field) => field?.code === socialNetworkCode);

			if (typeof index === 'number' && index > -1) {
				if (value) {
					update(index, { title: value, code: socialNetworkCode });
				} else {
					remove(index);
				}
				return;
			}

			append({ title: value, code: socialNetworkCode });
		};

	return (
		<>
			{SOCIAL_NETWORKS.map((socialNetwork) => (
				<FormControl
					key={socialNetwork.code}
					name={socialNetwork.title}
					control={control}
					label={socialNetwork.title}
					className={style.form}
				>
					{() => <Input onChange={onChangeHandler(socialNetwork.code)} className={style.input} />}
				</FormControl>
			))}
		</>
	);
};
