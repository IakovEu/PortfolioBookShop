'use client';
import st from './styles.module.scss';
import clsx from 'clsx';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { innerStore } from '@/store/staticData/costants';
import { changeCategory } from '@/store/reducers/bookStoreSlice';
import type { RootState, RootDispatch } from '@/store/reducers/store';
import { Cards } from './cards';

export const Catalog = () => {
	const dispatch = useDispatch<RootDispatch>();
	const activeCat = useSelector(
		(state: RootState) => state.bookStore.activeCat
	);
	const catRef = useRef<number>(activeCat);
	const preventDoubleCall = useRef<boolean>(false);
	const [data, setData] = useState(innerStore);

	// Запрос книже4ек
	async function fetchBooks(sub: string, num: number) {
		if (preventDoubleCall.current) return;
		preventDoubleCall.current = true;
		sub =
			sub === 'Art & Fashion'
				? 'Art'
				: sub === 'Biography'
				? 'Biography & Autobiography'
				: sub === 'Food & Drink'
				? 'Cooking'
				: sub === 'Health & Wellbeing'
				? 'Health & Fitness'
				: sub === 'History & Politics'
				? 'History'
				: sub === 'Travel & Maps'
				? 'Travel'
				: sub;
		const res = await fetch(`/api/books?subject=${sub}&startIndex=${num}`);
		if (!res.ok) {
			console.error('Ошибка при запросе:', res.status);
			return;
		}
		const result = await res.json();

		setData((prev) => {
			const newData = { ...prev };
			const active = Object.keys(prev)[catRef.current] as keyof typeof newData;
			newData[active] = [...newData[active], ...result];
			return newData;
		});
		preventDoubleCall.current = false;
	}

	useEffect(() => {
		if (Object.values(data)[catRef.current].length === 0) {
			fetchBooks(Object.keys(data)[catRef.current], 0);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<section className={st.catalog}>
			<div className={st.catalog__list}>
				<ul>
					{Object.keys(innerStore).map((el, ind) => {
						return (
							<li
								className={clsx(st.list__li, {
									[st.li__active]: activeCat === ind,
								})}
								key={ind}
								onClick={(e) => {
									const target = e.target as HTMLElement;
									dispatch(changeCategory(ind));
									catRef.current = ind;
									if (Object.values(data)[catRef.current].length === 0) {
										fetchBooks(target.textContent!, 0);
									}
								}}>
								{el}
							</li>
						);
					})}
				</ul>
			</div>
			<div className={st.catalog__cards}>
				<Cards data={data} catRef={catRef.current} />
				<div className={st.description__load}>
					<button
						className={st.loadBtn}
						onClick={() => {
							fetchBooks(
								Object.keys(data)[catRef.current],
								Object.values(data)[catRef.current].length
							);
						}}>
						LOAD MORE
					</button>
				</div>
			</div>
		</section>
	);
};
