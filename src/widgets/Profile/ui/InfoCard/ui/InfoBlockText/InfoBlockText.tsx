import styles from './InfoBlockText.module.css';

interface props {
	description: string | undefined;
}

export const InfoBlockText = ({ description }: props) => {
	return (
		<div className={styles['info-textarea']}>
			{description ? description : 'Описание отсутствует'}
		</div>
	);
};
