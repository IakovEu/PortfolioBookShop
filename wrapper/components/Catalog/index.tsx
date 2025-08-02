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
	const activeValue = Object.values(data)[catRef.current];
	const activeKey = Object.keys(data)[catRef.current];

	// Запрос книже4ек
	async function fetchBooks(sub: string, num: number) {
		if (preventDoubleCall.current) return;
		preventDoubleCall.current = true;

		const categoryMap: Record<string, string> = {
			'Art & Fashion': 'Art',
			Biography: 'Biography & Autobiography',
			'Food & Drink': 'Cooking',
			'Health & Wellbeing': 'Health & Fitness',
			'History & Politics': 'History',
			'Travel & Maps': 'Travel',
		};
		const res = await fetch(
			`/api/books?subject=${categoryMap[sub] || sub}&startIndex=${num}`
		);

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
		if (activeValue.length === 0) {
			fetchBooks(activeKey, 0);
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
									// тут сокращать запись до activeValue нельзя
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
				<Cards data={activeValue} />
				<div className={st.description__load}>
					<button
						className={st.loadBtn}
						onClick={() => {
							fetchBooks(activeKey, activeValue.length);
						}}>
						LOAD MORE
					</button>
				</div>
			</div>
		</section>
	);
};
