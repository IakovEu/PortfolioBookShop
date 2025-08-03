import st from './styles.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import cover from '@/public/bookCover.jpg';
import star from '@/public/Star.svg';
import starFilled from '@/public/StarFilled.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addRemoveFav } from '@/store/reducers/bookStoreSlice';
import { setVisibility } from '@/store/reducers/authorizationSlice';
import type { RootDispatch, RootState } from '@/store/reducers/store';
import { Item } from '@/types/response';

export const Cards = ({ data }: { data: Item[] }) => {
	const dispatch = useDispatch<RootDispatch>();
	const favorites = useSelector(
		(state: RootState) => state.bookStore.favorites
	);
	const userToken = useSelector(
		(state: RootState) => state.authorization.token
	);

	return (
		<>
			{data.map((el, ind) => {
				const info = el.volumeInfo;
				const txt = info.description ?? 'no information available';
				const thumbCover = info.imageLinks?.thumbnail;
				const filledStarsCount = Math.round(info.averageRating ?? 0);
				const starsArray = Array.from({ length: 5 }, (_, i) =>
					i < filledStarsCount ? starFilled : star
				);
				const isFav = el.volumeInfo.title in favorites;

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
							<p>{info.authors ?? 'Unknown Author'}</p>
							<p className={st.description__title}>{info.title}</p>
							{info.averageRating && (
								<div className={st.card__rating}>
									<p className={st.card__stars}>
										{starsArray.map((e, i) => (
											<Image src={e} alt="*" key={i} />
										))}
									</p>
									<p>
										{info.ratingsCount} review
										{info.ratingsCount !== 1 ? 's' : ''}
									</p>
								</div>
							)}
							<p className={st.description__txt}>{txt}</p>
							<p className={st.card__price}>
								{el.saleInfo.listPrice?.amount.toFixed(2)}{' '}
								{el.saleInfo.listPrice?.currencyCode}
							</p>
							<button
								className={clsx(st.description__buy, {
									[st.description__buyAdded]: isFav,
								})}
								onClick={() => {
									if (userToken.length !== 0) {
										dispatch(addRemoveFav(el));
									} else {
										dispatch(setVisibility(true));
									}
								}}>
								{isFav ? 'IN THE CART' : 'BUY NOW'}
							</button>
						</div>
					</div>
				);
			})}
		</>
	);
};
