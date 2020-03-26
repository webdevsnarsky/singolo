
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
      hamburger = document.querySelector('.hamburger'),
      headerNavigation = document.querySelector('.header__navigation'),
      sticky = header.offsetTop;

let portfolioItems = document.querySelector('.portfolio___items'),
    arrayPortfolioItems = Array.from(portfolioItems.getElementsByClassName('portfolio___item')),
    items = document.querySelectorAll('.slider__item'),
    currentItem = 0,
    isEnabled = true,
    positions = [],
    arrOfClassAnchor = document.querySelectorAll('.anchor'),
    currentActive = null;



// work with position of menu & scroll section
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

  for(var i = 0; i < positions.length; i++){
    if(positions[i].top < window.pageYOffset) {
      if(currentActive !== i){
        currentActive = i;
        arrayNavLink.forEach(el => {
          el.classList.remove('active')
          if (positions[i].id === el.getAttribute('href').split('#')[1]) {
            el.classList.add('active');
          }  
        });
      }
    }  
  }
});


// links 
function getPositionofAnchors() {
  arrOfClassAnchor.forEach(el => {
    positions.push({
      top: el.getBoundingClientRect().top - 100,
      id: el.id,
    }); 
  });
}
getPositionofAnchors();

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


// work with portfolio items
function sortPortfolioItems() {
  let newArrPortfolioItems = arrayPortfolioItems.sort(() => Math.random() - 0.5);
  portfolioItems.innerHTML = '';
  newArrPortfolioItems.forEach(el => portfolioItems.append(el));
}


function clickHandlerPortfolioItems() {
  let target = event.target;

  if (target.classList.contains('portfolio___img') && (!target.classList.contains('portfolio__item-border'))) {
    event.preventDefault();
      PortfolioImg.forEach(el => el.classList.remove('portfolio__item-border'));
      target.classList.add('portfolio__item-border');
  } else if (target.classList.contains('portfolio___img') && target.classList.contains('portfolio__item-border')) {
    PortfolioImg.forEach(el => el.classList.remove('portfolio__item-border'));
  }
  
  if ((!target.classList.contains('portfolio___img'))) {
    PortfolioImg.forEach(el => el.classList.remove('portfolio__item-border'));
  }
}

// work with mob phones &  slider 
function clickHandlerPhones() {
  let target = event.target;
  let vertPhone = document.querySelector('.vertical-phone');
  let horPhone = document.querySelector('.horizontal-phone');
  let vertPhoneCol = document.querySelector('.vertical-phone-black');
  let horPhoneCol = document.querySelector('.horizontal-phone-black');

  if (target.classList.contains('vertical-phone-button')) {
      event.preventDefault();
      
      if (!vertPhoneCol) {
        let verticalPhoneBlack = document.createElement('div');
        vertPhone.appendChild(verticalPhoneBlack);
      verticalPhoneBlack.classList.add('vertical-phone-black');
      }
      
      if (vertPhoneCol) {
        vertPhoneCol.remove(); 
      } 
  }

   if (target.classList.contains('horizontal-phone-button')) {
    event.preventDefault();
    if (!horPhoneCol) {
      let horizontalPhoneBlack = document.createElement('div');
      horPhone.appendChild(horizontalPhoneBlack);
      horizontalPhoneBlack.classList.add('horizontal-phone-black');
    }

    if (horPhoneCol) {
      horPhoneCol.remove(); 
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
 
  topicPopup.innerText = `Тема: ${subject}` || 'Без темы';
  popupDescr.innerText = `Описание: ${descrForm}` || 'Без описания';

  overlay.classList.add('overlay-hidden');
}

function removeModalWindow() {
  overlay.classList.remove('overlay-hidden');
  formControl.forEach(el => el.value = '');
}

// work with slider //

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('slide-active', direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add('next', direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('next', direction);
    this.classList.add('slide-active');
    isEnabled = true;
  });
}

function previousItem(n) {
  document.querySelector('.slider').classList.toggle('slider-bgc');
  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
}

function nextItem(n) {
  document.querySelector('.slider').classList.toggle('slider-bgc');
  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right');
}

document.querySelector('.control.left').addEventListener('click', function() {
  if (isEnabled) {
    previousItem(currentItem);
  }
});

document.querySelector('.control.right').addEventListener('click', function() {
  if (isEnabled) {
    nextItem(currentItem);
  }
});

// work with mobile menu 
function getNavMenu() {
  let target = event.target;

  console.log('target: ', target);

  if (!target.classList.contains('rotate') || target.classList.contains('hamburger__line') 
  && !hamburger.classList.contains('rotate')) {
    headerNavigation.classList.add('header__navigation-active');
    navigation.classList.add('navigation-active');
    document.body.classList.add('scroll-hidden');
    hamburger.classList.add('rotate');
  } else if (target.classList.contains('rotate')) {
    removeElemOfMenu();
  }
}

function removeNavMenu() {
  let target = event.target;
  console.log('target: ', target);

  if (target.classList.contains('header__navigation') || target.classList.contains('navigation__link')) {
    removeElemOfMenu();
  }
}

function removeElemOfMenu() {
  headerNavigation.classList.remove('header__navigation-active');
  navigation.classList.remove('navigation-active');
  document.body.classList.remove('scroll-hidden');
  hamburger.classList.remove('rotate');
}

window.addEventListener('load', () => {sectionScroll()});
document.addEventListener('click', clickHandler);
portfolioFilter.addEventListener('click', clickHandlerFilter);
document.addEventListener('click', clickHandlerPortfolioItems);
sliderItem.addEventListener('click', clickHandlerPhones);
getQuoteForm.addEventListener('submit', getModalWindow);
popupBtn.addEventListener('click', removeModalWindow);
hamburger.addEventListener('click', getNavMenu);
headerNavigation.addEventListener('click', removeNavMenu);
document.addEventListener("touchstart", function(){}, true);