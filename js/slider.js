const points = document.querySelectorAll('.point');
const sliderPoster = document.querySelector('.slider__poster');
const bgImages = [
	'../images/banner.png',
	'../images/banner-2.png',
	'../images/banner-3.png',
];
let counter = 0;

points.forEach(function (el, ind) {
	el.addEventListener('click', function () {
		counter = ind;
		switchImg();
	});
});

setInterval(function () {
	counter += 1;
	counter === 3 ? (counter = 0) : counter;

	switchImg();
}, 2000);

function switchImg() {
	points.forEach((elem) => {
		elem.classList.remove('point__active');
	});
	sliderPoster.style.backgroundImage = `url(${bgImages[counter]})`;
	points[counter].classList.add('point__active');
}
