'use client';
import { useEffect, useState } from 'react';
import st from './styles.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import cover from '@/public/images/bookCover.jpg';
import star from '@/public/images/Star.svg';
import starFilled from '@/public/images/StarFilled.svg';
import { Item } from '@/types/response';
import { categories } from '@/store/staticData/costants';
import { changeCategory } from '@/store/reducers/activeCategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, RootDispatch } from '@/store/reducers/store';

export const Catalog = () => {
	const dispatch = useDispatch<RootDispatch>();
	const activeCat = useSelector((state: RootState) => state.activeCategory);
	const [data, setData] = useState<Item[] | null>(null);

	// Запрос книже4ек
	async function fetchBooks(sub: string, num: number) {
		const res = await fetch(`/api/books?subject=${sub}&startIndex=${num}`);
		if (!res.ok) {
			console.error('Ошибка при запросе:', res.status);
			return;
		}
		const result = await res.json();
		setData(result);
	}

	useEffect(() => {
		fetchBooks('Architecture', 0);
	}, []);

	return (
		<section className={st.catalog}>
			<div className={st.catalog__list}>
				<ul>
					{categories.map((el, ind) => {
						return (
							<li
								className={clsx(st.list__li, {
									[st.li__active]: activeCat === ind,
								})}
								key={ind}
								onClick={(e) => {
									const target = e.target as HTMLElement;
									dispatch(changeCategory(ind));
									fetchBooks(
										target.textContent! === 'Art & Fashion'
											? 'Art'
											: target.textContent! === 'Biography'
											? 'Biography & Autobiography'
											: target.textContent! === 'Food & Drink'
											? 'Cooking'
											: target.textContent! === 'Health & Wellbeing'
											? 'Health & Fitness'
											: target.textContent! === 'History & Politics'
											? 'History'
											: target.textContent! === 'Travel & Maps'
											? 'Travel'
											: target.textContent!,
										0
									);
								}}>
								{el}
							</li>
						);
					})}
				</ul>
			</div>
			<div className={st.catalog__cards}>
				{data &&
					data.map((el, ind) => {
						const txt = el.volumeInfo.description ?? 'no information available';
						const thumbCover = el.volumeInfo.imageLinks?.thumbnail;
						const stars = [star, star, star, star, star];
						const rating = el.volumeInfo.averageRating;

						if (el.volumeInfo.ratingsCount) {
							for (let i = 0; i < Math.round(rating); i++) {
								stars.pop();
								stars.unshift(starFilled);
							}
						}

						return (
							<div className={st.card} key={ind}>
								<Image
									src={thumbCover || cover}
									alt="*"
									priority={true}
									width={200}
									height={300}
								/>
								<div className={st.description}>
									<p>{el.volumeInfo.authors ?? 'Unknown Author'}</p>
									<p className={st.description__title}>{el.volumeInfo.title}</p>
									{el.volumeInfo.averageRating && (
										<div className={st.card__rating}>
											<p className={st.card__stars}>
												{stars.map((e, i) => (
													<Image src={e} alt="*" key={i} />
												))}
											</p>
											<p>{el.volumeInfo.ratingsCount} review</p>
										</div>
									)}
									<p className={st.description__txt}>{txt}</p>
									<p className={st.card__price}>
										{el.saleInfo.listPrice?.amount}{' '}
										{el.saleInfo.listPrice?.currencyCode}
									</p>
									<button
										className={st.description__buy}
										onClick={() => {
											console.log(ind);
										}}>
										BUY NOW
									</button>
								</div>
							</div>
						);
					})}
				<div className={st.description__load}>
					<button className={st.loadBtn}>LOAD MORE</button>
				</div>
			</div>
		</section>
	);
};
