import { renderPhotos } from './renderPhotos.js';
import { renderPopup } from './renderPopup.js';


const createGallery = (data) => {
  const picturesContainer = document.querySelector('.pictures');
  renderPhotos(data, picturesContainer);

  const modalElem = document.querySelector('.big-picture');
  const closeButton = modalElem.querySelector('.big-picture__cancel');

  const closeModal = (event) => {
    event.preventDefault();
    if (event.type !== 'click' && event.key !== 'Escape') {
      return;
    }
    modalElem.classList.toggle('hidden');
    document.querySelector('body').classList.toggle('modal-open');
  };

  picturesContainer.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-id')) {
      e.preventDefault();
      const targetId = e.target.dataset.id;
      const targetDataArrIndex = targetId - 1;
      const targetData = data[targetDataArrIndex];
      renderPopup(targetData);
    }
  });

  closeButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);
};

export { createGallery };
