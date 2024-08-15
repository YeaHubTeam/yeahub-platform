import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

export const profileSchema = yup.object().shape({
	image: yup
		.mixed<FileList>()
		.optional()
		.test('fileSize', 'Файл слишком велик', (value) => {
			if (value && value.length > 0) {
				return value[0].size <= 2000000; // 2MB
			}
			return true;
		})
		.test('fileType', 'Неверный формат файла', (value) => {
			if (value && value.length > 0) {
				return ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
			}
			return true;
		}),

	name: yup.string().required('Имя обязательно'),
	specialization: yup.string().required('Специализация обязательна'),
	phone: yup.string().required('Телефон обязателен'),
	email: yup
		.string()
		.email('Неверный формат электронной почты')
		.required('Электронная почта обязательна'),
	location: yup.string().optional(),
	skillLevel: yup.string().optional(),
	socialLinks: yup.string().optional(),
});

/* //todo сделать нормальную валидацию необязательных полей по примеру ниже
address: yup.string().when("address", (value) => {
      if (value) {
        return yup
          .string()
          .min(5, "Address must be more than 5 characters long")
          .max(255, "Address must be less than 255 characters long");
      } else {
        return yup
          .string()
          .transform((value, originalValue) => {
            // Convert empty values to null
            if (!value) {
              return null;
            }
            return originalValue;
          })
          .nullable()
          .optional();
      }
    }),

*/
