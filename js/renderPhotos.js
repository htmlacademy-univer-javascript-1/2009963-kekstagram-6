import { renderPopup } from './renderPopup.js';

const renderPhotos = (data, parentNode) => {
  const photoTemplate = document
    .querySelector('#picture')
    .content
    .querySelector('.picture');

  const photosListFragment = document.createDocumentFragment();

  data.forEach(({ id, url, description, likes, comments }) => {
    const photoEl = photoTemplate.cloneNode(true);

    const imgElem = photoEl.querySelector('.picture__img');
    imgElem.src = url;
    imgElem.alt = description;
    imgElem.dataset.id = id;
    photoEl.querySelector('.picture__comments').textContent = comments.length;
    photoEl.querySelector('.picture__likes').textContent = likes;

    photosListFragment.appendChild(photoEl);
  });

  parentNode.appendChild(photosListFragment);
};

export { renderPhotos };
