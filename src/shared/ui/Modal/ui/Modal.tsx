import styles from './styles.module.css';

type ModalProps = {
	title: string;
	isModal: boolean;
	handleOverlayClick: (e: React.MouseEvent<HTMLDivElement>) => void;
	handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
	children: React.ReactNode | React.ReactElement;
};

export const Modal = ({
	title,
	isModal,
	handleOverlayClick,
	handleKeyDown,
	children,
}: ModalProps) => {
	return (
		<div
			id="modal"
			role="button"
			tabIndex={0}
			className={styles.overlay}
			onKeyDown={(e) => handleKeyDown(e)}
			onClick={(e) => handleOverlayClick(e)}
			style={isModal ? { display: 'block' } : { display: 'none' }}
		>
			<div className={styles.modal}>
				<h3 id="modal-title" className={styles.title}>
					{title}
				</h3>
				<hr />
				<div className={styles.content}>{children}</div>
			</div>
		</div>
	);
};
