import { renderPhotos } from './renderPhotos.js';
import { renderPopup, closeModal } from './renderPopup.js';


const createGallery = (data) => {
  const picturesContainer = document.querySelector('.pictures');
  renderPhotos(data, picturesContainer);

  picturesContainer.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-id') && e.target.classList.contains('picture__img')) {
      e.preventDefault();
      const targetId = e.target.dataset.id;
      const targetDataArrIndex = targetId - 1;
      const targetData = data[targetDataArrIndex];
      renderPopup(targetData);
    }
  });

  document.addEventListener('keydown', closeModal);
};

export { createGallery };
