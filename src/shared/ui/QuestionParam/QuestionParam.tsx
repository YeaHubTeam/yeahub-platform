import styles from './QuestionParam.module.css';

interface QuestionParamProps {
	label: string;
	value: number;
}

export const QuestionParam = ({ label, value }: QuestionParamProps) => {
	return (
		<li className={styles.param}>
			<span>{label}:</span>
			<span className={styles.value}>{value}</span>
		</li>
	);
};
