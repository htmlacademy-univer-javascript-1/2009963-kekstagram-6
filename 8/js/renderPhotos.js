import { renderPopup } from './renderPopup.js';

const renderPhotos = (data) => {
  const picturesContainer = document.querySelector('.pictures');
  const photoTemplate = document
    .querySelector('#picture')
    .content
    .querySelector('.picture');

  const photosListFragment = document.createDocumentFragment();

  data.forEach(({ url, description, likes, comments }) => {
    const photoEl = photoTemplate.cloneNode(true);
    const imgElem = photoEl.querySelector('.picture__img');
    imgElem.src = url;
    imgElem.alt = description;
    photoEl.querySelector('.picture__comments').textContent = comments.length;
    photoEl.querySelector('.picture__likes').textContent = likes;

    photoEl.addEventListener('click', () => {
      renderPopup({ url, description, likes, comments });
    });

    photosListFragment.appendChild(photoEl);
  });

  picturesContainer.appendChild(photosListFragment);
};

export { renderPhotos };
