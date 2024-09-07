import { ChangeEvent } from 'react';
import { useFieldArray } from 'react-hook-form';
import { Input, Label } from 'yeahub-ui-kit';

import { SOCIAL_NETWORKS } from '../../../socialNetwork/model/data/socialNetwork';
import { SocialFormValues, SocialNetworkCode } from '../../model/types/socialNetwork';

import style from './SocialNetWorkList.module.css';

export const SocialNetWorkList = () => {
	const { fields, update, append } = useFieldArray<SocialFormValues>({
		name: 'socialNetwork',
	});

	const onChangeHandler = (socialNetworkCode: SocialNetworkCode, value: string) => {
		if (!value || !socialNetworkCode) return;

		const index =
			fields.length > 0 && fields.findIndex((field) => field?.code === socialNetworkCode);

		if (typeof index === 'number' && index > -1) {
			update(index, { title: value, code: socialNetworkCode });
			return;
		}

		append({ title: value, code: socialNetworkCode });
	};

	return (
		<>
			{SOCIAL_NETWORKS.map((socialNetwork) => (
				<Label key={socialNetwork.code} className={style.label} required text={socialNetwork.title}>
					<Input
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							onChangeHandler(socialNetwork.code, e.target.value)
						}
						className={style.input}
					/>
				</Label>
			))}
		</>
	);
};
