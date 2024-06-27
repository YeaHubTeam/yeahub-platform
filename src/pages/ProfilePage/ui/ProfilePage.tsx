import { Button, Icon, IconButton } from 'yeahub-ui-kit';

import { Block } from '@/shared/ui/Block';

import styles from './ProfilePage.module.css';

// import { ErrorElement } from '@/shared/ui/ErrorElement';
// import { Loader } from '@/shared/ui/Loader';

// import { useGetProfileQuery } from '@/entities/auth';

const ProfilePage = () => {
	// const { data, isSuccess, isLoading, isError, error } = useGetProfileQuery();

	const text =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus egestas eu lectus eu varius. Nam pretium turpis nec nisl convallis ultrices. Quisque vitae nisi placerat, maximus neque vestibulum, scelerisque erat. Suspendisse a volutpat urna, vel finibus risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc diam sapien, sodales ut justo vitae, convallis convallis justo. Vivamus pellentesque tempus nisi et rutrum. Integer egestas, leo nec varius luctus, eros turpis mattis nisi, a condimentum mi libero in neque. Vestibulum commodo eget erat et ullamcorper. Curabitur elementum condimentum est, ut porta metus auctor ac. Nunc vulputate tincidunt tempus. Sed varius, nulla sit amet molestie ultricies, enim eros pulvinar nisi, sit amet bibendum urna lectus ac risus. Nulla sed aliquet quam, vitae suscipit libero. In hac habitasse platea dictumst. Proin varius nisl vel nisl bibendum rutrum. Duis placerat sapien ac tortor semper, sed congue sapien accumsan. Sed viverra eleifend purus id congue. Nunc eget massa tincidunt nulla vestibulum pellentesque. Ut scelerisque ante feugiat elit porta, sed maximus arcu pellentesque. Phasellus venenatis sapien sed arcu sagittis consectetur. Phasellus ac neque vitae ante finibus varius. Phasellus volutpat euismod maximus. Fusce finibus arcu urna, in finibus justo ultrices ac. Quisque quis venenatis sapien. Ut turpis felis, porta a semper suscipit, scelerisque finibus velit. Curabitur at nisl tortor. Morbi consequat iaculis odio eget ullamcorper. Nam pharetra euismod ultrices.';

	return (
		// <>
		// 	{isError && <ErrorElement fetchError={error} />}
		// 	{isLoading && <Loader />}
		// 	{isSuccess && (
		// 		<div className={styles.content}>
		// 			<div className={styles.left}>
		// 				<Block expandable>
		// 					{data?.firstName} {data?.lastName}
		// 				</Block>
		// 				<Block expandable>{blockContent}</Block>
		// 				<Block expandable>{blockContent}</Block>
		// 				<Block expandable>{blockContent}</Block>
		// 			</div>
		// 			<div className={styles.right}>
		// 				<Block expandable>{blockContent}</Block>
		// 				<Block expandable>{blockContent}</Block>
		// 			</div>
		// 		</div>
		// 	)}
		// </>
		<div className={styles.content}>
			<div className={styles.left}>
				{/* Блок Пользователя */}
				<Block>
					<div className={styles.card}>
						<div className={styles['card-left']}>
							<div className={styles['card-avatar']}>
								<img
									src="https://s3-alpha-sig.figma.com/img/1146/3e68/815a4e4de943866234bc5db93af1b425?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oYBRLLnNc0cHnsBsFiMwx7wH4~BCA9ygwkapdJfSVHb01zsC5K1cBBZpPmP4qdDGXAU1tkkHvJzzPQFTHgH-Z2dBEcCLSbz1wZQV9wM6OS6CC9gqvY-NkUB~wW4LfhSFg369G0eLhQB10J7OjjLV6yYhfbhMy0Ww-wV3FmO6UuYGenhu47O1fBufofJYVBgwvxOhdxvRMGCccagkp7KFr~-h5XK4n3VX0G~FfVsgrEvyz8a8TnMUbJVHPn-ZKLmP78ILI2BKVij0QwRjiGbCbhWE0YpWAmwNYhwxi~lIaw-zSuX-shgavL~3wIbwLlZBuSwd9VMB1TFagx5Uc48LIg__"
									alt=""
								/>
							</div>
							<span className={styles['card-schedule']}>Уделенно, Part-time, Freelance</span>
						</div>
						<div className={styles['card-right']}>
							<div className={styles['card-header']}>
								<h2 className={styles['card-name']}>Анастасия Заворотнюк</h2>
								<div className={styles['card-status']}>Кандидат</div>
								<Button theme="link" tagName="button" className={styles['card-edit']}>
									Редактировать
								</Button>
							</div>
							<ul className={styles['card-info']}>
								<li>26 лет</li>
								<li>UX/UI дизайнер в Яндекс</li>
								<li>Опыт: 7 лет</li>
								<li>Москва, Россия</li>
							</ul>
							<div className={styles['card-contacts']}>
								<h4 className={styles['card-phone']}>+745 87 666 77 88</h4>
								<h4 className={styles['card-mail']}>anastasiya92@gmail.com</h4>
								<div className={styles['card-link']}>
									<IconButton
										type="submit"
										aria-label="primary large"
										form="round"
										icon={<Icon icon="dribbbleLogo" size={20} />}
										size="small"
										theme="primary"
									/>
									<IconButton
										type="submit"
										aria-label="primary large"
										form="round"
										icon={<Icon icon="instagramLogo" size={20} />}
										size="small"
										theme="primary"
									/>
									<IconButton
										type="submit"
										aria-label="primary large"
										form="round"
										icon={<Icon icon="pinterestLogo" size={20} />}
										size="small"
										theme="primary"
									/>
									<IconButton
										type="submit"
										aria-label="primary large"
										form="round"
										icon={<Icon icon="behanceLogo" size={20} />}
										size="small"
										theme="primary"
									/>
									<IconButton
										type="submit"
										aria-label="primary large"
										form="round"
										icon={<Icon icon="linkedinLogo" size={20} />}
										size="small"
										theme="primary"
									/>
								</div>
							</div>
						</div>
					</div>
				</Block>

				{/* Блок "Обо мне" */}
				<Block expandable>
					<div className={styles['info']}>
						<div className={styles['info-header']}>
							<h3 className={styles['info-title']}>Обо мне</h3>
							<Button theme="link" tagName="button" className={styles['info-edit']}>
								Редактировать
							</Button>
						</div>
						{/* <textarea autoComplete="off" disabled className={styles['info-textarea']}>
							{text}
						</textarea> */}
						<div className={styles['info-textarea']}>{text}</div>
					</div>
				</Block>

				{/* Блок Навыки */}
				<Block>
					<div className={styles['skills']}>
						<div className={styles['skills-header']}>
							<h3 className={styles['skills-title']}>Навыки</h3>
							<Button theme="link" tagName="button" className={styles['skills-edit']}>
								Редактировать
							</Button>
						</div>
						<div className={styles['skills-list']}>
							<div className={styles['skills-item']}>
								<Icon icon="figmaLogo" height={20} width={20} className={styles['skills-icon']} />
								<span className={styles['skills-name']}>Figma</span>
							</div>
							<div className={styles['skills-item']}>
								<Icon icon="boundingBox" height={20} width={20} className={styles['skills-icon']} />
								<span>Wireframing</span>
							</div>
							<div className={styles['skills-item']}>
								<Icon icon="figmaLogo" height={20} width={20} className={styles['skills-icon']} />
								<span className={styles['skills-name']}>Figma</span>
							</div>
							<div className={styles['skills-item']}>
								<Icon icon="boundingBox" height={20} width={20} className={styles['skills-icon']} />
								<span>Wireframing</span>
							</div>
							<div className={styles['skills-item']}>
								<Icon icon="boundingBox" height={20} width={20} className={styles['skills-icon']} />
								<span>Wireframing</span>
							</div>
							<div className={styles['skills-item']}>
								<Icon icon="figmaLogo" height={20} width={20} className={styles['skills-icon']} />
								<span className={styles['skills-name']}>Figma</span>
							</div>
							<div className={styles['skills-item']}>
								<Icon icon="boundingBox" height={20} width={20} className={styles['skills-icon']} />
								<span>Wireframing</span>
							</div>
							<div className={styles['skills-item']}>
								<Icon icon="boundingBox" height={20} width={20} className={styles['skills-icon']} />
								<span>Wireframing</span>
							</div>
						</div>
					</div>
				</Block>

				{/* Блок проекты */}
				<Block className={styles['projects-block']}>
					<div className={styles['projects']}>
						<div className={styles['projects-header']}>
							<h3 className={styles['projects-title']}>Проекты</h3>
							<Button theme="link" tagName="button" className={styles['projects-edit']}>
								Редактировать
							</Button>
						</div>
						<div className={styles['projects-list']}>
							<div className={styles['projects-item']}>
								<div className={styles['projects-img']}>
									<img
										src="https://s3-alpha-sig.figma.com/img/ac4b/d848/42e8146c18b1e5f1565291e98cd03576?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fSt2VigOGmjsa52xYOU68d9sJS5W6a4jry4u-0Sbn3UBxZUcl7cXu~HDdY1IQR4~ohjgt7zvutiP6nh8JCI8KlfgXl47wtvrxIhlHtFhK59ezv~yGz5VACRqrQv1nYqaO9FxA~ZMXkuLGAD2iVwUNIpJD5Z-NwzgbBc97omNgjloNYKOwhOmHyozeIc6JR5dSk8an~oPvIvsuctIdBLCJlK599ESnfnoTg6V8lSOD1VY76P1nE~OHpUplFwMU7aPXxZE-2NWntazLMvBS9oLcATozYdPnl2J8qukKFW8l9fozOtOeio6XCJRZPah48928p9ck0GyNTqVDMGeR9s9Gg__"
										alt=""
									/>
								</div>
								<span className={styles['projects-name']}>
									{'Clinically — clinic & health care website'}
								</span>
							</div>
							<div className={styles['projects-item']}>
								<div className={styles['projects-img']}>
									<img
										src="https://s3-alpha-sig.figma.com/img/67ec/a933/d5b241dea30985aaaa4b94767eea8c5e?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eY0OBsyCoZEeKYiokS6mCfA0ReWqVwWhDTKLtkPoGNCg9DNAxOI195z0V4wTmx3ZKF3ePxpvobdfqdXuFtbt3l7JicT4gTV-sXUDSFrDwxplE1GcRHIckSULOLBy-wevxcpoNX5trfzHfdxrDjFb1ujdLwXins8DUNtbF6avywLyhw8FSQIeCNvf8Roxj-3csPz6Y8W8Tibwgi21oeZt3xQWMJenXQWz0Uqri9cUyF6hDqU2eskaK-uJpNfK9J-nIp6v82MUIaUbA7f~OVTg16L6wlWWAeYypGZWSQ5RI5lqGk3s11FLR2tbF7QDYjZ5HjfSMDsW49UFxJ9Jn9cLOg__"
										alt=""
									/>
								</div>
								<span className={styles['projects-name']}>
									{'Clinically — clinic & health care website'}
								</span>
							</div>
							<div className={styles['projects-item']}>
								<div className={styles['projects-img']}>
									<img
										src="https://s3-alpha-sig.figma.com/img/83fc/48b4/8605f77c1f184b81f881cb7b5b49c59a?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=URLXoPwM~R4f1McYFncUPv63bmWI0Gme~Hk6WBp~oq~ubVDpHwHuAIpaePMXqOPEYTAegiqdf0yvqiohVbCXb2qKAebxY8tb18XK2slFvvt3QhNKmK7IJoAiqu6sPee0vedrG42v~hMSdsVGjwnTT2fMJQTquOzLv5Lg8GGBL-1oZp09mJwVVamGyZLPmBDvvrbJftPJQySgykRITAmO~dOXXmhjbRgSCWRekTrN5xE3s~vQHeDdSmIzxn39W83frx22fkNLcuh3DEE0kPW5U5~LUkM5voSXyiJAHD2cqMCOlCuh25aR8jCEn3GQr3v4Mn4yL5EliLHykeimhdp65w__"
										alt=""
									/>
								</div>
								<span className={styles['projects-name']}>
									{'Clinically — clinic & health care website'}
								</span>
							</div>
							<div className={styles['projects-item']}>
								<div className={styles['projects-img']}>
									<img
										src="https://s3-alpha-sig.figma.com/img/935f/b3b9/143caea88c9ad1fe057fdcb958e466ad?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FPiBReQNuYxp8FlgeoGgCcPo2pWACD94EEG~GL8~ynoO3kkQltthkKn1VjmqlAjYzMQez8cj74hX6MBs78botQ1yOnv6nRtqAEQvbE1DVJ4Kyr1yDPqc1mEazN3i9XMH4uEKYrogga4H0Lon2oE4iEHoTJwh2Zff08Yb6vvcGqS3p96cqwM-HDl1bujbwnZJYIEfbADBtELj7TTXWa53bgSCErn7HdsnAHJf0DJpcGyOEtk9SQ6DzNv8eGP~~6Ooyvxmw10Xq9e~V5mM94PmygfkWFRByDOrT8PR0U75fy6HSDfLVBBlLieRshDLSqvTQ-aC7tBvWhFqKl6swtMDPQ__"
										alt=""
									/>
								</div>
								<span className={styles['projects-name']}>
									{'Clinically — clinic & health care website'}
								</span>
							</div>
							<div className={styles['projects-item']}>
								<div className={styles['projects-img']}>
									<img
										src="https://s3-alpha-sig.figma.com/img/c4c7/b60e/4f63159ad7846452817ca5969c087226?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b9VW~r-1G9y84MOU6q7jzSeg1xro1K4QiQTSecfiaHqb7ddG4dCiygtqpcJr3A97eQUba3SG-WmyXD12sAJXftkgcDI9UvxwoCL-AXxVIBqSGXPeOxALIVGbLDt3p9bFs5DtbX2CPkdTLV1PtfFlprqNLAGk6MmKl-J2h9GVdX5OUoDowOnZb7C1BFx3W9ox8721r0f328H7QOWWrNM1Ld90Gg2LJxWVgCFV9tbsNRNr11qqRmGSKGEY1-QzWfhCTYgKKaYUR4RjIvCSMNvsc-W7I1OYMYFVLW6nEr~Y9WcnPt3h-hmiejUGJsqA~iiuCEf2-I~HBy5Ig8TVqSUS1g__"
										alt=""
									/>
								</div>
								<span className={styles['projects-name']}>
									{'Clinically — clinic & health care website'}
								</span>
							</div>
						</div>
					</div>
				</Block>

				{/* Блок опыта */}
				<Block expandable>
					<div className={styles['experience']}>
						<div className={styles['experience-header']}>
							<h3 className={styles['experience-title']}>Опыт работы</h3>
							<span className={styles['experience-time']}>{'4 года 7 месяцев'}</span>
							<Button theme="link" tagName="button" className={styles['experience-edit']}>
								Редактировать
							</Button>
						</div>
						<div className={styles['experience-list']}>
							<div className={styles['experience-item']}>
								<div className={styles['experience-logo']}>
									<img
										src="https://s3-alpha-sig.figma.com/img/58e1/b09c/50cfd2764f457cd297c68742b11503d3?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WrfFGlaE5eRunPPyvCaLOcnSQapfH7hPrBME6086d71jTIMQkXCVC6zXquBKciGzUuJ~RviSO0ZIfZBr6jITeP~o3-F8TG8mBzjogvYUDHvK4X~6I27qtzhkMkeeyV88qMVspXxpQwxuhbybDcyvqVPrjiLODvwmlYHucB3m1PTdCZmll-8AaJyyuwpXDN0B1gaEgGYoREdjF8hM4NKFih1yWLMyG1ShQh6i6JpFe6UNbf3g8YPAGRDqcPY87CZNNVwuH3KzV1X0VozlCmVw0JDl-TiRFa3byy9UUtfC3LOpJfQOQpdHlTrSUW2sR18VLRVgv4FnboPs58p7Nkp0JA__"
										alt=""
									/>
								</div>
								<div className={styles['experience-content']}>
									<h3 className={styles['experience-name']}>UX/UI дизайнер</h3>
									<ul className={styles['experience-info']}>
										<li className={styles['experience-company']}>Яндекс</li>
										<li className={styles['experience-schedule']}>Full-time</li>
										<li className={styles['experience-seniority']}>
											{'Фев 2023 — настоящее время (1 год 4 месяца)'}
										</li>
									</ul>
									<span className={styles['experience-location']}>Москва, Россия</span>
								</div>
							</div>

							<span className={styles['separator']}></span>

							<div className={styles['experience-item']}>
								<div className={styles['experience-logo']}>
									<img
										src="https://s3-alpha-sig.figma.com/img/58e1/b09c/50cfd2764f457cd297c68742b11503d3?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WrfFGlaE5eRunPPyvCaLOcnSQapfH7hPrBME6086d71jTIMQkXCVC6zXquBKciGzUuJ~RviSO0ZIfZBr6jITeP~o3-F8TG8mBzjogvYUDHvK4X~6I27qtzhkMkeeyV88qMVspXxpQwxuhbybDcyvqVPrjiLODvwmlYHucB3m1PTdCZmll-8AaJyyuwpXDN0B1gaEgGYoREdjF8hM4NKFih1yWLMyG1ShQh6i6JpFe6UNbf3g8YPAGRDqcPY87CZNNVwuH3KzV1X0VozlCmVw0JDl-TiRFa3byy9UUtfC3LOpJfQOQpdHlTrSUW2sR18VLRVgv4FnboPs58p7Nkp0JA__"
										alt=""
									/>
								</div>
								<div className={styles['experience-content']}>
									<h3 className={styles['experience-name']}>UX/UI дизайнер</h3>
									<ul className={styles['experience-info']}>
										<li className={styles['experience-company']}>Яндекс</li>
										<li className={styles['experience-schedule']}>Full-time</li>
										<li className={styles['experience-seniority']}>
											{'Фев 2023 — настоящее время (1 год 4 месяца)'}
										</li>
									</ul>
									<span className={styles['experience-location']}>Москва, Россия</span>
								</div>
							</div>

							<span className={styles['separator']}></span>

							<div className={styles['experience-item']}>
								<div className={styles['experience-logo']}>
									<img
										src="https://s3-alpha-sig.figma.com/img/58e1/b09c/50cfd2764f457cd297c68742b11503d3?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WrfFGlaE5eRunPPyvCaLOcnSQapfH7hPrBME6086d71jTIMQkXCVC6zXquBKciGzUuJ~RviSO0ZIfZBr6jITeP~o3-F8TG8mBzjogvYUDHvK4X~6I27qtzhkMkeeyV88qMVspXxpQwxuhbybDcyvqVPrjiLODvwmlYHucB3m1PTdCZmll-8AaJyyuwpXDN0B1gaEgGYoREdjF8hM4NKFih1yWLMyG1ShQh6i6JpFe6UNbf3g8YPAGRDqcPY87CZNNVwuH3KzV1X0VozlCmVw0JDl-TiRFa3byy9UUtfC3LOpJfQOQpdHlTrSUW2sR18VLRVgv4FnboPs58p7Nkp0JA__"
										alt=""
									/>
								</div>
								<div className={styles['experience-content']}>
									<h3 className={styles['experience-name']}>UX/UI дизайнер</h3>
									<ul className={styles['experience-info']}>
										<li className={styles['experience-company']}>Яндекс</li>
										<li className={styles['experience-schedule']}>Full-time</li>
										<li className={styles['experience-seniority']}>
											{'Фев 2023 — настоящее время (1 год 4 месяца)'}
										</li>
									</ul>
									<span className={styles['experience-location']}>Москва, Россия</span>
								</div>
							</div>
						</div>
					</div>
				</Block>

				{/* Блок Образование */}

				<Block expandable>
					<div className={styles['education']}>
						<div className={styles['education-header']}>
							<h3 className={styles['education-title']}>Образование</h3>
							<Button theme="link" tagName="button" className={styles['education-edit']}>
								Редактировать
							</Button>
						</div>
						<div className={styles['education-list']}>
							<div className={styles['education-item']}>
								<h3 className={styles['education-name-university']}>
									{'Технический университет г. Брно'}
								</h3>
								<ul className={styles['education-info']}>
									<li className={styles['education-name']}>Инженер промышленного оборудования</li>
									<li className={styles['education-rank']}>Бакалавр</li>
									<li className={styles['education-time']}>2023-2024</li>
								</ul>
							</div>

							<span className={styles['separator']}></span>

							<div className={styles['education-item']}>
								<h3 className={styles['education-name-university']}>
									{'Технический университет г. Брно'}
								</h3>
								<ul className={styles['education-info']}>
									<li className={styles['education-name']}>Инженер промышленного оборудования</li>
									<li className={styles['education-rank']}>Бакалавр</li>
									<li className={styles['education-time']}>2023-2024</li>
								</ul>
							</div>
						</div>
					</div>
				</Block>
			</div>
			<div className={styles.right}>
				<Block className={styles.achievements}></Block>
			</div>
		</div>
	);
};

export default ProfilePage;
