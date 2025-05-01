class Catalog {
	constructor(listOfLi) {
		this.list = document.querySelectorAll(listOfLi);
		this.bookStorage = {}; // Если данные уже были запрошены по конкретному subject, то они сохраняются для текущей сессии
		this.startIndex = 0;
		this.subject = 'Architecture ';
		this.changeCategory();
		this.requestBooks();
	}
// Повесили обработчик на элементы списка / Корректируем subject / Запрашиваем новое или грузим старое из data
	changeCategory() {
		this.list.forEach((el) => {
			el.addEventListener('click', () => {
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

				if (this.bookStorage[this.subject]) {
					console.log('Уже есть');
				} else {
					this.requestBooks();
				}
			});
		});
	}
// Отобразить картинки на странице
    showImages(){
        
    }
// Запросили картинки у Google Books / Закинули их в наш объект
	requestBooks() {
		fetch(
			`https://www.googleapis.com/books/v1/volumes?q="subject:${this.subject}"&key=AIzaSyA3JnrUQZLRo3GzvFVtY9FDWHZ2iTOrt54&printType=books&startIndex=${this.startIndex}&maxResults=6&langRestrict=en`
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if (this.bookStorage[this.subject]) {
					this.bookStorage[this.subject].concat(data.items);
				} else {
					this.bookStorage[this.subject] = data.items;
				}

				console.log(this.bookStorage);
				//.imageLinks.thumbnail
			});
	}
}

export default Catalog;

