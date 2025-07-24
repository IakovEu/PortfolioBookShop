'use client';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import st from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import arrow from '@/public/images/arrow.svg';
import { PointSvg } from './pointSvg';

export const Slider = () => {
	const [currentPoster, setCurrentPoster] = useState(0);

	useEffect(() => {
		setInterval(() => {
			setCurrentPoster((prev) => (prev + 1) % 3);
		}, 5000);
	}, []);

	return (
		<section className={st.slider}>
			<div
				className={clsx(st.slider__poster, {
					[st.firstPoster]: currentPoster === 0,
					[st.secondPoster]: currentPoster === 1,
					[st.thirdPoster]: currentPoster === 2,
				})}></div>
			<div className={st.slider__points}>
				{[0, 1, 2].map((el) => {
					return (
						<button
							className={clsx(st.point, {
								[st.point__active]: currentPoster === el,
							})}
							key={el}
							onClick={() => {
								setCurrentPoster(el);
							}}>
							<PointSvg />
						</button>
					);
				})}
			</div>
			<Link className={st.slider__link_top} href="/exchange">
				CHANGE OLD BOOK ON NEW
				<Image src={arrow} alt="--&gt" />
			</Link>
			<Link className={st.slider__link_bot} href="/top-100">
				TOP 100 BOOKS 2022
				<Image src={arrow} alt="--&gt" />
			</Link>
		</section>
	);
};
