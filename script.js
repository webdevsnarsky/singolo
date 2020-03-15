
const header = document.querySelector('.header'),
      navigation = document.querySelector('.navigation'),
      arrayNavLink = navigation.querySelectorAll('a'),
      anchors = navigation.querySelectorAll('a[href*="#"]'),
      portfolioFilter = document.querySelector('.portfolio__filter'),
      portfolioButton = portfolioFilter.querySelectorAll('button'),
      PortfolioItems = document.querySelector('.portfolio___items'),
      PortfolioImg = document.querySelectorAll('.portfolio___img'),
      sliderItem = document.querySelectorAll('.slider__item')[0],
      getQuoteForm = document.querySelector('.form'),
      formButton = document.querySelector('.form-button'),
      formControl = document.querySelectorAll('.form-control'),
      overlay = document.querySelector('.overlay'),
      popupBtn = document.querySelector('.popup__btn'),
      sticky = header.offsetTop;

let portfolioItems = document.querySelector('.portfolio___items');
let arrayPortfolioItems = Array.from(portfolioItems.getElementsByClassName('portfolio___item'));

window.addEventListener('load', () => {
  sectionScroll();
});

document.addEventListener('click', clickHandler);
portfolioFilter.addEventListener('click', clickHandlerFilter);
document.addEventListener('click', clickHandlerPortfolioItems);
sliderItem.addEventListener('click', clickHandlerPhones);
getQuoteForm.addEventListener('submit', getModalWindow);
// getQuoteForm.addEventListener('click', getModalWindow);
popupBtn.addEventListener('click', removeModalWindow);
// work with position of menu 
window.addEventListener('scroll', () => {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }

  if (window.pageYOffset > 190) {
    header.classList.add("header-bgc");
  } else {
    header.classList.remove("header-bgc");
  }
});

function sectionScroll() {
  for (let anchor of anchors) {
      anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const blockID = anchor.getAttribute('href');
          document.querySelector(`${blockID}`).scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      });
  }
}

function clickHandler() {
  let target = event.target;

  if (target.classList.contains('navigation__link')) {
    event.preventDefault();
    arrayNavLink.forEach(el => el.classList.remove('active'));
    target.classList.add('active');
  }
}

function clickHandlerFilter() {
  let target = event.target;

  if (target.classList.contains('portfolio__btn')) {
    event.preventDefault();
    portfolioButton.forEach(el => el.classList.remove('portfolio__btn-active'));
    target.classList.add('portfolio__btn-active');
    sortPortfolioItems();
  }
}

function sortPortfolioItems() {
  let newArrPortfolioItems = arrayPortfolioItems.sort(() => Math.random() - 0.5);
  portfolioItems.innerHTML = '';
  newArrPortfolioItems.forEach(el => portfolioItems.append(el));
}


function clickHandlerPortfolioItems() {
  let target = event.target;

  if (target.classList.contains('portfolio___img')) {
    event.preventDefault();
      PortfolioImg.forEach(el => el.classList.remove('portfolio___item-border'));
      target.classList.add('portfolio___item-border');
  } else if (!target.classList.contains('portfolio___img')) {
    PortfolioImg.forEach(el => el.classList.remove('portfolio___item-border'));
  }
}


function clickHandlerPhones() {
  let target = event.target;
  let vertPhone = document.querySelector('.vertical-phone-black');
  let horPhone = document.querySelector('.horizontal-phone-black');

  if (target.classList.contains('vertical-phone-img')) {
 
      event.preventDefault();
      if (!vertPhone) {
        let verticalPhoneBlack = document.createElement('div');
      sliderItem.appendChild(verticalPhoneBlack);
      verticalPhoneBlack.classList.add('vertical-phone-black');
      }
      
      if (vertPhone) {
        vertPhone.remove(); 
      } 
  }

   if (target.classList.contains('horizontal-phone-img')) {
    event.preventDefault();
    if (!horPhone) {
      let horizontalPhoneBlack = document.createElement('div');
      sliderItem.appendChild(horizontalPhoneBlack);
      horizontalPhoneBlack.classList.add('horizontal-phone-black');
    }

    if (horPhone) {
      horPhone.remove(); 
    }
  }

 }
 // work with form 

function getModalWindow() {
  let subject = document.getElementById('subject').value.toString();
  let descrForm = document.getElementById('descrForm').value.toString();
  let topicPopup = document.querySelector('.topic');
  let popupDescr = document.querySelector('.popup__descr');
  event.preventDefault();
 
  topicPopup.innerText = subject || 'Без темы';
  popupDescr.innerText = descrForm || 'Без описания';

  overlay.classList.add('overlay-hidden');
}

function removeModalWindow() {
  overlay.classList.remove('overlay-hidden');
  formControl.forEach(el => el.value = '');
}

