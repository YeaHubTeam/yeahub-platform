import styles from './Buttons.module.css';

export const Buttons = () => {
	return (
		<div className={styles.buttons}>
			<div className={styles.collapse}>
				<span className={styles.left}></span>
				<span className={styles.right}></span>
			</div>
			<div className={styles.info}>
				<span className={styles.top}></span>
				<span className={styles.middle}></span>
				<span className={styles.bottom}></span>
			</div>
		</div>
	);
};
