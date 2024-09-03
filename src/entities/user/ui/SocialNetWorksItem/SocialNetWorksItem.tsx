import { useFieldArray } from 'react-hook-form';
import { Input, Label } from 'yeahub-ui-kit';

import { useDebounce } from '@/shared/hooks/useDebounced';

import { FieldsForIterate, SocialNetwork, SocialNetworkCode } from '../../model/types/userInfo';

import style from './SocialNetWorksItem.module.css';

export const SocialNetWorksItem = ({ title, code }: SocialNetwork) => {
	const { fields, update, append } = useFieldArray({
		name: 'socialNetworks',
	});

	const onChangeHandler = (socialNetworkCode: SocialNetworkCode, value: string) => {
		if (!value || !socialNetworkCode) return;

		const index =
			fields.length > 0 &&
			fields.findIndex((el: FieldsForIterate) => el?.code === socialNetworkCode.toLowerCase());

		if (typeof index === 'number' && index > -1) {
			update(index, { title: value, code: socialNetworkCode });
			return;
		}
		append({ title: value, code: socialNetworkCode });
	};

	const debounceOnChange = useDebounce(onChangeHandler, 200);

	return (
		<>
			<Label key={code} className={style.label} required text={title}>
				<Input onChange={(e) => debounceOnChange(code, e.target.value)} className={style.input} />
			</Label>
		</>
	);
};
