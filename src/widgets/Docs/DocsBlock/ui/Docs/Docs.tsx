import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Docs as DocsI18n } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';

import { DockProps } from '../../model/types/types';
import { DocItem } from '../DocItem/DocItem';

import styles from './Docs.module.css';

export const Docs = () => {
	const { t } = useTranslation(i18Namespace.docs);

	const docs: DockProps[] = [
		{
			name: t(DocsI18n.DOC1),
			link: 'https://docs.google.com/document/d/1tU9lgOu_W21DAoHOH0kQmTWq5hG3rvxv_Q_jzRi8Gh4/edit?tab=t.0',
		},
		{
			name: t(DocsI18n.DOC2),
			link: 'https://docs.google.com/document/d/1OX9Fc3HPhjL_U9xkF2P3vsSmM1fAdhmQ88J2NT0emFo/edit?tab=t.0',
		},
		{
			name: t(DocsI18n.DOC3),
			link: 'https://docs.google.com/document/d/19JvySToaMm3pkohGkHwqhJjGl3IzldIc3qnQpAoVFVc/edit?tab=t.0#heading=h.gjdgxs',
		},
		{
			name: t(DocsI18n.DOC4),
			link: 'https://docs.google.com/document/d/1SaCHcZZhb9da-yOePEur3wv2C47ie2R8rPnkkxrxPqA/edit?tab=t.0',
		},
		{
			name: t(DocsI18n.DOC5),
			link: 'https://docs.google.com/document/d/1smh686bm1_YVyDGHFBR20bMVBaAnP6ojpmQhU7rZChU/edit?tab=t.0',
		},
		{
			name: t(DocsI18n.DOC6),
			link: 'https://docs.google.com/document/d/1bVPkRvy6blauSWleePx4qcb75rKwPPy7HhAUseA64yQ/edit?tab=t.0',
		},
	];

	return (
		<div className={styles['docs']}>
			<Flex className={styles['docs-items']} direction="column" gap="40">
				{docs.map((doc: DockProps) => (
					<DocItem key={doc.link} name={doc.name} link={doc.link} />
				))}
			</Flex>
		</div>
	);
};
