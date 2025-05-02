class Catalog {
	constructor(listOfLi, catalogCards) {
		this.list = document.querySelectorAll(listOfLi);
		this.catalog = document.querySelector(catalogCards);
		this.bookStorage = {}; // Если данные уже были запрошены по конкретному subject, то они сохраняются для текущей сессии
		this.startIndex = 0;
		this.subject = 'Architecture ';
		this.changeCategory();
		this.requestBooks();
	}
	// Повесили обработчик на элементы списка / Корректируем subject / Запрашиваем новое или грузим старое из data
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
					this.showImages(this.bookStorage[this.subject]);
				} else {
					await this.requestBooks();
					if (this.bookStorage[this.subject]) {
						this.showImages(this.bookStorage[this.subject]);
					}
				}
			});
		});
	}
	// Запросили картинки у Google Books / Закинули их в наш объект и грузим
	async requestBooks() {
		const response = await fetch(
			`https://www.googleapis.com/books/v1/volumes?q="subject:${this.subject}"&key=AIzaSyA3JnrUQZLRo3GzvFVtY9FDWHZ2iTOrt54&printType=books&startIndex=${this.startIndex}&maxResults=6&langRestrict=en`
		);
		const data = await response.json();
		if (this.bookStorage[this.subject]) {
			this.bookStorage[this.subject].concat(data.items);
		} else {
			this.bookStorage[this.subject] = data.items;
		}
	}
	// Отобразить картинки на странице
	showImages(cardData) {
		cardData.forEach((el) => {
			const title = el.volumeInfo.title;
			const author = el.volumeInfo.authors ?? 'unknown';
			const txt = el.volumeInfo.description ?? 'no information available';
			let rating = '';
			let price = '';
			let cover = 'images/bookCover.jpg';

			if (el.volumeInfo.ratingsCount) {
				rating = `<p class="card__rating">${el.volumeInfo.ratingsCount} review</p>`;
			}

			if (el.volumeInfo.imageLinks) {
				cover = el.volumeInfo.imageLinks.thumbnail;
			}

			if (el.volumeInfo.saleInfo) {
				price = `<p class="card__price">${el.volumeInfo.saleInfo.retailPrice} review</p>`;
			}

			const card = `<div class="card">
                            <img src="${cover}" alt="*">
                            <div class="description">
                                <p>${author}</p>
                                <p class="description__title">${title}</p>
                                ${rating}
                                <p class="description__txt">${txt}</p>
                                ${price}
                                <button class="description__btn">BUY NOW</button>
                            </div>
                        </div>`;

			this.catalog.innerHTML += card;
		});
	}
}

export default Catalog;
