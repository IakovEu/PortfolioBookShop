import st from './styles.module.scss';

export const InfoCart = () => {
	return (
		<section className={st.info}>
			<h2 className={st.title}>SHOPPING CART</h2>
			<div className={st.emptyCart}>Your cart is empty!</div>
			<h2 className={st.price}>TOTAL PRICE: $0.00</h2>
			<button className={st.checkoutBtn}>CHECKOUT</button>
		</section>
	);
};
