import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button, Input } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions, Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Flex } from '@/shared/ui/Flex';
import { SimpleChip } from '@/shared/ui/SimpleChip';

import styles from './KeywordInput.module.css';

type KeywordInputProps = {
	value: string[];
	onChange: (value: string[]) => void;
};

export const KeywordInput = ({ value = [], onChange }: KeywordInputProps) => {
	const [keywords, setKeywords] = useState('');
	const [keywordsArray, setKeywordsArray] = useState<string[]>(value);

	const { t } = useI18nHelpers([i18Namespace.questions, i18Namespace.translation]);

	const handleInput = () => {
		const enteredKeywords = keywords.toLocaleLowerCase().trim();
		if (enteredKeywords) {
			if (!keywordsArray.includes(enteredKeywords)) {
				const newKeywordsArray = [...keywordsArray, enteredKeywords];
				setKeywordsArray(newKeywordsArray);
				onChange(newKeywordsArray);
				setKeywords('');
			}
		}
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleInput();
		}
	};

	const handleClick = () => {
		handleInput();
	};

	const handleDeleteKeywords = (selectedKeyword: string) => {
		const newKeywordsArray = keywordsArray.filter((keyword) => keyword != selectedKeyword);
		setKeywordsArray(newKeywordsArray);
		onChange(newKeywordsArray);
	};

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setKeywords(e.target.value);
	};

	return (
		<Flex gap="24" direction="column">
			<Flex gap="8">
				<Input type="text" value={keywords} onChange={changeHandler} onKeyDown={handleKeyDown} />
				<Button className={styles.button} onClick={handleClick}>
					{t(Translation.CREATE)}
				</Button>
			</Flex>
			<Flex gap="16" direction="column">
				{keywordsArray?.length > 0 && (
					<>
						<h4>{t(Questions.QUESTION_KEYWORDS)}</h4>
						<Flex direction="row" gap="32">
							{keywordsArray.map((keyword) => {
								return (
									<SimpleChip
										key={keyword}
										onDelete={() => {
											handleDeleteKeywords(keyword);
										}}
									>
										{keyword}
									</SimpleChip>
								);
							})}
						</Flex>
					</>
				)}
			</Flex>
		</Flex>
	);
};
