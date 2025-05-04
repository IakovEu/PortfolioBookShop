class Catalog {
	constructor(listOfLi, descriptionLoad, cart) {
		this.list = document.querySelectorAll(listOfLi);
		this.loadBtn = document.querySelector(descriptionLoad);
		this.cartBtn = document.querySelector(cart);
		this.bookStorage = {}; // Если данные уже были запрошены по конкретному subject, то они сохраняются для текущей сессии
		this.subject = 'Architecture ';
		this.startIndex = 0;
		this.initialLoading();
		this.changeCategory();
		this.loadMore();
	}
	// Повесили обработчик на элементы списка / Корректируем subject / Запрашиваем или грузим новое и убираем старое
	changeCategory() {
		this.list.forEach((el) => {
			el.addEventListener('click', async () => {
				this.list.forEach((elem) => {
					elem.classList.remove('li-active');
				});
				el.classList.add('li-active');

				switch (el.textContent) {
					case 'Art & Fashion':
						this.subject = 'Art';
						break;
					case 'Biography':
						this.subject = 'Biography & Autobiography';
						break;
					case 'Food & Drink':
						this.subject = 'Cooking';
						break;
					case 'Health & Wellbeing':
						this.subject = 'Health & Fitness';
						break;
					case 'History & Politics':
						this.subject = 'History';
						break;
					case 'Travel & Maps':
						this.subject = 'Travel';
						break;
					default:
						this.subject = el.textContent;
				}
				// Если пустой, то запросим, если нет, то отобразим сразу
				if (this.bookStorage[this.subject]) {
					document.querySelectorAll('.card').forEach((el) => el.remove());
					this.showImages(this.bookStorage[this.subject]);
					this.addToCart();
				} else {
					await this.requestBooks();
					document.querySelectorAll('.card').forEach((el) => el.remove());
					this.showImages(this.bookStorage[this.subject]);
					this.addToCart();
				}
			});
		});
	}
	// Изначальная загрузка контента Architecture с использование lazyLoading
	async initialLoading() {
		const cartData = JSON.parse(localStorage.getItem('cartInfo')) ?? {};
		this.addRemoveBadge(cartData);
		await this.requestBooks();

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					this.showImages(this.bookStorage[this.subject]);
					observer.unobserve(entry.target);
				}
			});
		});

		observer.observe(document.querySelector('.catalog__cards'));
		this.addToCart();
	}
	// Догружаем контент
	loadMore() {
		this.loadBtn.addEventListener('click', async () => {
			this.startIndex = this.bookStorage[this.subject].length;
			await this.requestBooks();
			document.querySelectorAll('.card').forEach((el) => el.remove());
			this.showImages(this.bookStorage[this.subject]);
			this.addToCart();
		});
	}
	// Убираем старые обработчики и вешаем новые / стилизуем кнопку / сохраняем или удаляем из LS / вешаем бейджик на корзину
	addToCart() {
		const addRemove = (elem) => {
			const indexOfCard = [...document.querySelectorAll('.card')].indexOf(
				elem.parentElement.parentElement
			);
			const cartData = JSON.parse(localStorage.getItem('cartInfo')) ?? {};

			if (!elem.classList.contains('in-the-cart')) {
				elem.classList.add('in-the-cart');
				elem.textContent = 'IN THE CART';

				if (cartData[this.subject]) {
					cartData[this.subject].push(indexOfCard);
				} else {
					cartData[this.subject] = [indexOfCard];
				}

				localStorage.setItem('cartInfo', JSON.stringify(cartData));
			} else {
				elem.classList.remove('in-the-cart');
				elem.textContent = 'BUY NOW';

				cartData[this.subject] = cartData[this.subject].filter((el) => {
					return el !== indexOfCard;
				});

				localStorage.setItem('cartInfo', JSON.stringify(cartData));
			}

			this.addRemoveBadge(cartData);
		};

		document.querySelectorAll('.description__buy').forEach((el) => {
			el.removeEventListener('click', () => addRemove(el));
			el.addEventListener('click', () => addRemove(el));
		});
	}
	// Вешаем бейджик на корзину
	addRemoveBadge(data) {
		let totalAmount = 0;
		let badge = '';
		for (let key in data) {
			totalAmount += data[key].length;
		}

		if (totalAmount) {
			badge = `<p class="badge">${totalAmount}</p>`;
		}

		if (document.querySelector('.badge')) {
			document.querySelector('.badge').remove();
		}

		this.cartBtn.insertAdjacentHTML('beforeend', badge);
	}
	// Запросили картинки у Google Books / Закинули их в наш объект и грузим
	async requestBooks() {
		const response = await fetch(
			`https://www.googleapis.com/books/v1/volumes?q="subject:${this.subject}"&key=AIzaSyA3JnrUQZLRo3GzvFVtY9FDWHZ2iTOrt54&printType=books&startIndex=${this.startIndex}&maxResults=6&langRestrict=en`
		);
		const data = await response.json();
		if (this.bookStorage[this.subject]) {
			this.bookStorage[this.subject].push(...data.items);
		} else {
			this.bookStorage[this.subject] = data.items;
		}
	}
	// Отобразить картинки на странице из bookStorage и с учетом LS
	showImages(cardData) {
		cardData.forEach((el, ind) => {
			const title = el.volumeInfo.title;
			const author = el.volumeInfo.authors ?? 'Unknown Author';
			const txt = el.volumeInfo.description ?? 'no information available';
			const cartData = JSON.parse(localStorage.getItem('cartInfo')) ?? {};
			const starFilled = '<img src="images/StarFilled.svg" alt="*">';
			const star = '<img src="images/Star.svg" alt="*">';
			let btn = '<button class="description__buy">BUY NOW</button>';
			let rating = '';
			let price = '';
			let insertME = [star, star, star, star, star];
			let cover = 'images/bookCover.jpg';

			if (el.volumeInfo.ratingsCount) {
				for (let i = 0; i < Math.round(el.volumeInfo.averageRating); i++) {
					insertME.pop();
					insertME.unshift(starFilled);
				}

				rating = `<div class="card__rating">
                            <p class="card__stars">${insertME.join('')}</p>
                            <p>${el.volumeInfo.ratingsCount} review</p>
                        </div>`;
			}

			if (el.volumeInfo.imageLinks) {
				cover = el.volumeInfo.imageLinks.thumbnail;
			}

			if (el.volumeInfo.saleInfo) {
				price = `<p class="card__price">${el.volumeInfo.saleInfo.retailPrice} review</p>`;
			}

			if (cartData[this.subject]) {
				if (cartData[this.subject].includes(ind)) {
					btn =
						'<button class="description__buy in-the-cart">IN THE CART</button>';
				}
			}

			const card = `<div class="card">
                            <img src="${cover}" alt="*">
                            <div class="description">
                                <p>${author}</p>
                                <p class="description__title">${title}</p>
                                ${rating}
                                <p class="description__txt">${txt}</p>
                                ${price}
                                ${btn}
                            </div>
                        </div>`;

			this.loadBtn.insertAdjacentHTML('beforebegin', card);
		});
	}
}

export default Catalog;
