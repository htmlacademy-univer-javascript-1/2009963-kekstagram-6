import { COMMENTS_COUNT_SHIFT } from './constants.js';

const renderComment = ({ avatar, message, name }) => {
  const li = document.createElement('li');
  li.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.width = 35;
  img.height = 35;

  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = message;

  li.appendChild(img);
  li.appendChild(p);

  return li;
};

const createCommentRenderer = (beginIndex, shift) => {
  let currentIndex = beginIndex;

  return (comments, parentNode, commentsLoader) => {
    const commentsCountElem = document.querySelector('.social__comment-count');

    const currentCommentsCountElem = document.querySelector('.comments-current-count');

    commentsLoader.classList.remove('hidden');

    if (comments.length === 0) {
      commentsCountElem.textContent = 'Нет комментариев';
      commentsLoader.classList.add('hidden');
      return;
    }

    const commentsListFragment = document.createDocumentFragment();

    const newIndex = currentIndex + shift;
    const newCurrentIndex = newIndex > comments.length - 1 ? comments.length : newIndex;

    comments
      .slice(currentIndex, newCurrentIndex)
      .forEach((comment) => {
        const commentElem = renderComment(comment);
        commentsListFragment.appendChild(commentElem);
      });

    currentIndex = newCurrentIndex;

    parentNode.appendChild(commentsListFragment);

    commentsCountElem.innerHTML = `
    ${currentIndex} из <span class="comments-count">${comments.length}</span> комментариев
  `;

    if (currentIndex === comments.length) {
      commentsLoader.classList.add('hidden');
    }
  };

};

const closeModal = (event, cb) => {
  const modalElem = document.querySelector('.big-picture');

  if (event.type !== 'click' && event.key !== 'Escape') {
    return;
  }
  event.preventDefault();
  modalElem.classList.toggle('hidden');
  document.querySelector('body').classList.toggle('modal-open');

  event.target.removeEventListener('click', cb);
};


const renderPopup = ({ url, description, likes, comments }) => {
  document.querySelector('body').classList.add('modal-open');

  const modalElem = document.querySelector('.big-picture');
  modalElem.classList.remove('hidden');

  const commentsLoader = modalElem.querySelector('.comments-loader');

  const imgElem = document.querySelector('.big-picture__img img');
  imgElem.src = url;
  imgElem.alt = description;

  modalElem.querySelector('.social__caption').textContent = description;
  modalElem.querySelector('.likes-count').textContent = likes;


  const commentsListEl = modalElem.querySelector('.social__comments');
  commentsListEl.innerHTML = '';

  const renderComments = createCommentRenderer(0, COMMENTS_COUNT_SHIFT);
  renderComments(comments, commentsListEl, commentsLoader);

  const renderCommentsHandler = (event) => {
    event.preventDefault();
    renderComments(comments, commentsListEl, commentsLoader);
  };

  const closeModalHandler = (event) => {
    closeModal(event, closeModalHandler);
    modalElem.querySelector('.comments-loader').removeEventListener('click', renderCommentsHandler);
  };

  commentsLoader.addEventListener('click', renderCommentsHandler);

  const closeButton = modalElem.querySelector('.big-picture__cancel');
  closeButton.addEventListener('click', closeModalHandler);
};

export { renderPopup, closeModal };
