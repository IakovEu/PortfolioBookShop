'use client';
import st from './styles.module.scss';
import Image from 'next/image';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '@/store/reducers/store';
import { increase, decrease } from '@/store/reducers/bookStoreSlice';
import cover from '@/public/bookCover.jpg';
import star from '@/public/Star.svg';
import starFilled from '@/public/StarFilled.svg';
import minus from '@/public/minus.svg';
import plus from '@/public/plus.svg';

export const InsideCart = () => {
	const dispatch = useDispatch<RootDispatch>();
	const favorites = useSelector(
		(state: RootState) => state.bookStore.favorites
	);
	const userToken = useSelector(
		(state: RootState) => state.authorization.token
	);
	const totalPrice = useMemo(() => {
		return Object.values(favorites)
			.filter((el) => el.data.saleInfo.listPrice?.amount)
			.map((el) => (el.data.saleInfo.listPrice?.amount ?? 0) * el.amount)
			.reduce((acc, el) => acc + el, 0)
			.toFixed(2);
	}, [favorites]);

	return (
		<section className={st.info}>
			<h2 className={st.title}>SHOPPING CART</h2>
			{Object.keys(favorites).length === 0 ? (
				<div className={st.emptyCart}>
					{userToken.length === 0
						? 'Please login first to view your cart!'
						: 'Your cart is empty!'}
				</div>
			) : (
				<div className={st.filledCart}>
					<div className={st.classification}>
						<p className={st.class1}>ITEM</p>
						<p className={st.class2}>QUANTITY</p>
						<p className={st.class3}>PRICE</p>
						<p className={st.class4}>DELIVERY</p>
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
								<div className={st.quantity}>
									<button
										className={st.quantityBtn}
										onClick={() => {
											dispatch(decrease(el));
										}}>
										<Image src={minus} alt="-" priority={true} />
									</button>
									<p className={st.quantityNum}>{el.amount}</p>
									<button
										className={st.quantityBtn}
										onClick={() => {
											dispatch(increase(el));
										}}>
										<Image src={plus} alt="+" priority={true} />
									</button>
								</div>
								<div className={st.price}>
									{!el.data.saleInfo.listPrice
										? 'out of stock'
										: `${el.data.saleInfo.listPrice?.amount.toFixed(2)} ${
												el.data.saleInfo.listPrice.currencyCode
										  }`}
								</div>
								<div className={st.delivery}>Shopping: delivery</div>
							</div>
						);
					})}
				</div>
			)}
			<h2 className={st.totalPrice}>TOTAL PRICE: {totalPrice} RUB</h2>
			<button className={st.checkoutBtn}>CHECKOUT</button>
		</section>
	);
};
