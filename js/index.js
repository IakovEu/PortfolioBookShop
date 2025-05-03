import '../styles/index.scss';
import Slider from './slider.js';
import Catalog from './catalog.js';

// метод сразу вызвал в конструкторе слайдера
const slider = new Slider('.point', '.slider__poster');
const catalog = new Catalog(
	'.list-li',
	'.description__load',
	'.navigation__icons_btn_cart'
);
