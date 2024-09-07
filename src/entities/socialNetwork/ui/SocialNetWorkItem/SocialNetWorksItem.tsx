import { Input, Label } from 'yeahub-ui-kit';

import { SocialNetwork, SocialNetworkCode } from '../../model/types/socialNetwork';

import style from './SocialNetWorksItem.module.css';

interface SocialNetWorkItemProps extends SocialNetwork {
	onChange: (socialNetworkCode: SocialNetworkCode, value: string) => void;
}

export const SocialNetWorkItem = ({ title, code, onChange }: SocialNetWorkItemProps) => {
	return (
		<Label key={code} className={style.label} required text={title}>
			<Input onChange={(e) => onChange(code, e.target.value)} className={style.input} />
		</Label>
	);
};
