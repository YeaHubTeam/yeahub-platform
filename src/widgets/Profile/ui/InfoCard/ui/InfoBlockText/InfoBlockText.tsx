import styles from './InfoBlockText.module.css';

interface InfoBlockTextProps {
	description: string | undefined;
}

export const InfoBlockText = ({ description }: InfoBlockTextProps) => {
	return (
		<div className={styles['info-textarea']}>
			{description ? description : 'Описание отсутствует'}
		</div>
	);
};
