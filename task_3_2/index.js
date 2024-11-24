class Slider {

  constructor(selector, params) {
    this.selector = selector;
    this.params = params;

    //HTML елемент самого слайдера
    this.elementSlider = document.querySelector(selector);
    //слайды
    this.sliderItems = this.elementSlider.children;
    //количесвто слайдов
    this.itemsCount = this.sliderItems.length;
    //растояние между слайдами
    this.spaceBetween = params.spaceBetween;
    //если autoplay передан, включаю
    this.autoplay = params.autoplay ? true : false;
    //
    this.autoplaySpeed = params.autoplaySpeed ? params.autoplaySpeed : null;
    //величина по которой слайдер меняет своё положение  
    this.delta = this.sliderItems[0].offsetWidth + this.spaceBetween;
    //текущий слайд
    this.currentSlide = 0;
    
    //если передан обьект с селекторами кнопок навигации
    if (params.controls) {
      this.controls = {
        nextEl: params.controls.nextEl,
        prevEl: params.controls.prevEl
      }
      
      //вешаю обработчик, чтобы отследить клики по кнопкам
      window.addEventListener('click', function (event) {
        if (event.target.closest(params.controls.nextEl)) {
          slider.handleNext();
        }
        if (event.target.closest(params.controls.prevEl)) {
          slider.handlePrev();
        }
      });
    }

    //если передан autoplay, запускаю таймер 
    if (this.autoplay) {
      this.intervalRef = setInterval(() => {
        console.log('Слайд');
        if (this.currentSlide == this.itemsCount - 1) {
          this.currentSlide = 0;
          this.elementSlider.style.transform = `translateX(0px)`;
        } else {
          this.currentSlide++;
          this.elementSlider.style.transform = `translateX(-${this.delta * this.currentSlide}px)`;
        } 
      }, this.autoplaySpeed);
    }
    
    this.init();
  }

  init() {
    //вешаю необходимые стили для работы слайдера
    this.elementSlider.style.display = 'flex';
    this.elementSlider.style.gap = `${this.spaceBetween}px`;
    this.elementSlider.style.transition = '.3s';
    this.elementSlider.style.transform = `translateX(0)`;

    
  }

  handleNext() {
    if (this.currentSlide < this.itemsCount - 1) {
      //отменяю прошлый интервал
      clearInterval(this.intervalRef);
      //инкрементирую значение текущего слайда
      this.currentSlide++;
      //перелистываю слайдер
      this.elementSlider.style.transform = `translateX(-${this.delta * this.currentSlide}px)`;
      //запускаю заного интервал
      if (this.autoplay) {
        this.intervalRef = setInterval(() => {
          console.log('Слайд');
          if (this.currentSlide == this.itemsCount - 1) {
            this.currentSlide = 0;
            this.elementSlider.style.transform = `translateX(0px)`;
          } else {
            this.currentSlide++;
            this.elementSlider.style.transform = `translateX(-${this.delta * this.currentSlide}px)`;
          } 
        }, this.autoplaySpeed);
      }
    }
  }

  handlePrev() {
    if (this.currentSlide >= 1) {
      //отменяю прошлый интервал
      clearInterval(this.intervalRef);
      //декрементирую значение текущего слайда
      this.currentSlide--;
      //перелистываю слайдер
      this.elementSlider.style.transform = `translateX(-${this.delta * this.currentSlide}px)`;
      //запускаю заного интервал
      if (this.autoplay) {
        this.intervalRef = setInterval(() => {
          console.log('Слайд');
          if (this.currentSlide == this.itemsCount - 1) {
            this.currentSlide = 0;
            this.elementSlider.style.transform = `translateX(0px)`;
          } else {
            this.currentSlide++;
            this.elementSlider.style.transform = `translateX(-${this.delta * this.currentSlide}px)`;
          } 
        }, this.autoplaySpeed);
      }
    }
  }
}

const slider = new Slider('.slider', {
  spaceBetween: 10,
  autoplay: true,
  autoplaySpeed: 3000,
  controls: {
    nextEl: '.slider-next',
    prevEl: '.slider-prev'
  }
});