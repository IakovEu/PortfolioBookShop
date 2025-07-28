'use client';
import { useEffect, useState } from 'react';
import st from './styles.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import cover from '@/public/images/bookCover.jpg';
import star from '@/public/images/Star.svg';
import starFilled from '@/public/images/StarFilled.svg';
import { Item } from '@/types/response';

export const Catalog = () => {
	const [data, setData] = useState<Item[] | null>(null);
	async function fetchBooks() {
		const res = await fetch('/api/books?subject=Architecture&startIndex=0');
		if (!res.ok) {
			console.error('Ошибка при запросе:', res.status);
			return;
		}
		const result = await res.json();
		setData(result);
	}

	useEffect(() => {
		fetchBooks();
	}, []);

	return (
		<section className={st.catalog}>
			<div className={st.catalog__list}>
				<ul>
					<li className={clsx(st.list__li, st.li__active)}>Architecture </li>
					<li className={st.list__li}>Art & Fashion</li>
					<li className={st.list__li}>Biography</li>
					<li className={st.list__li}>Business</li>
					<li className={st.list__li}>Crafts & Hobbies</li>
					<li className={st.list__li}>Drama</li>
					<li className={st.list__li}>Fiction</li>
					<li className={st.list__li}>Food & Drink</li>
					<li className={st.list__li}>Health & Wellbeing</li>
					<li className={st.list__li}>History & Politics</li>
					<li className={st.list__li}>Humor</li>
					<li className={st.list__li}>Poetry</li>
					<li className={st.list__li}>Psychology</li>
					<li className={st.list__li}>Science</li>
					<li className={st.list__li}>Technology</li>
					<li className={st.list__li}>Travel & Maps</li>
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
									<button className={st.description__buy}>BUY NOW</button>
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
