import st from './styles.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import cover from '@/public/images/bookCover.jpg';
import star from '@/public/images/Star.svg';
import starFilled from '@/public/images/StarFilled.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addRemoveFav } from '@/store/reducers/bookStoreSlice';
import type { RootDispatch, RootState } from '@/store/reducers/store';
import type { InnerStore } from '@/types/innerStore';

type ForCards = {
	data: InnerStore;
	catRef: number;
};

export const Cards = ({ data, catRef }: ForCards) => {
	const dispatch = useDispatch<RootDispatch>();
	const favorites = useSelector(
		(state: RootState) => state.bookStore.favorites
	);

	return (
		<>
			{Object.values(data)[catRef].map((el, ind) => {
				const info = el.volumeInfo;
				const txt = info.description ?? 'no information available';
				const thumbCover = info.imageLinks?.thumbnail;
				const stars = [star, star, star, star, star];
				const rating = info.averageRating;
				const action = Object.values(data)[catRef][ind];

				if (info.ratingsCount) {
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
							<p>{info.authors ?? 'Unknown Author'}</p>
							<p className={st.description__title}>{info.title}</p>
							{info.averageRating && (
								<div className={st.card__rating}>
									<p className={st.card__stars}>
										{stars.map((e, i) => (
											<Image src={e} alt="*" key={i} />
										))}
									</p>
									<p>{info.ratingsCount} review</p>
								</div>
							)}
							<p className={st.description__txt}>{txt}</p>
							<p className={st.card__price}>
								{el.saleInfo.listPrice?.amount}{' '}
								{el.saleInfo.listPrice?.currencyCode}
							</p>
							<button
								className={clsx(st.description__buy, {
									[st.description__buyAdded]:
										action.volumeInfo.title in favorites,
								})}
								onClick={() => {
									dispatch(addRemoveFav(action));
								}}>
								{action.volumeInfo.title in favorites
									? 'IN THE CART'
									: 'BUY NOW'}
							</button>
						</div>
					</div>
				);
			})}
		</>
	);
};
