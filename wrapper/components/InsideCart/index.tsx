'use client';
import st from './styles.module.scss';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '@/store/reducers/store';
import cover from '@/public/images/bookCover.jpg';
import star from '@/public/images/Star.svg';
import starFilled from '@/public/images/StarFilled.svg';

export const InsideCart = () => {
	const dispatch = useDispatch<RootDispatch>();
	const favorites = useSelector(
		(state: RootState) => state.bookStore.favorites
	);

	console.log(favorites);

	return (
		<section className={st.info}>
			<h2 className={st.title}>SHOPPING CART</h2>
			{Object.keys(favorites).length === 0 ? (
				<div className={st.emptyCart}>Your cart is empty!</div>
			) : (
				<div className={st.filledCart}>
					<div className={st.classification}>
						<p className={st.class}>ITEM</p>
						<p className={st.class}>QUANTITY</p>
						<p className={st.class}>PRICE</p>
						<p className={st.class}>DELIVERY</p>
					</div>
					{Object.values(favorites).map((el, ind) => {
						const info = el.data.volumeInfo;
						const filledStarsCount = Math.round(info.averageRating ?? 0);
						const starsArray = Array.from({ length: 5 }, (_, i) =>
							i < filledStarsCount ? starFilled : star
						);

						return (
							<div key={ind} className={st.book}>
								<div className={st.item}>
									<Image
										className={st.image}
										src={info.imageLinks?.thumbnail || cover}
										alt="*"
										width={102}
										height={145}
										priority={true}
									/>
									<div className={st.description}>
										<p className={st.descriptionTitle}>{info.title}</p>
										<p className={st.author}>
											{info.authors ?? 'Unknown Author'}
										</p>
										{info.averageRating && (
											<div className={st.card__rating}>
												<p className={st.card__stars}>
													{starsArray.map((e, i) => (
														<Image src={e} alt="*" key={i} />
													))}
												</p>
												<p className={st.review}>
													{info.ratingsCount} review
													{info.ratingsCount !== 1 ? 's' : ''}
												</p>
											</div>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
			<h2 className={st.price}>TOTAL PRICE: 0.00 RUB</h2>
			<button className={st.checkoutBtn}>CHECKOUT</button>
		</section>
	);
};
