class Slider {
	constructor(pointsSelector, sliderPosterSelector) {
		this.points = document.querySelectorAll(pointsSelector);
		this.sliderPoster = document.querySelector(sliderPosterSelector);
		this.bgImages = [
			'./images/banner.png',
			'./images/banner-2.png',
			'./images/banner-3.png',
		];
		this.counter = 0;
		this.#init();
	}
	// Повесили обработчик событий / запустили интервал для слайдера
	#init() {
		this.points.forEach((el, ind) => {
			el.addEventListener('click', () => {
				this.counter = ind;
				this.#switchImg();
			});
		});

		setInterval(() => {
			this.counter = (this.counter + 1) % this.bgImages.length;
			this.#switchImg();
		}, 5000);
	}
	// Убрали точку / добавили точку на нужный слайд / сменили картинку
	#switchImg() {
		this.points.forEach((elem) => {
			elem.classList.remove('point__active');
		});

		this.points[this.counter].classList.add('point__active');

		this.sliderPoster.style.backgroundImage = `url(${
			this.bgImages[this.counter]
		})`;
	}
}

export default Slider;
