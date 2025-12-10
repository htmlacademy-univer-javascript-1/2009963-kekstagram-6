import { COMMENTS_COUNT_OFFSET } from './constants.js';

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

const renderComments = (comments, currentIndex, offset) => {
  const commentsListFragment = document.createDocumentFragment();
  comments
    .slice(currentIndex, currentIndex += offset)
    .forEach((comment) => {
      const commentElem = renderComment(comment);
      commentsListFragment.appendChild(commentElem);
    });
  currentIndex += offset;
  return { commentsListFragment, currentIndex };
};

const renderPopup = ({ url, description, likes, comments }) => {
  const body = document.querySelector('body');
  body.classList.add('modal-open');

  const modalElem = document.querySelector('.big-picture');
  modalElem.classList.remove('hidden');

  const imgElem = document.querySelector('.big-picture__img img');
  imgElem.src = url;
  imgElem.alt = description;

  modalElem.querySelector('.social__caption').textContent = description;
  modalElem.querySelector('.likes-count').textContent = likes;

  const currentCommentsCountElem = document.querySelector('.comments-current-count');
  document.querySelector('.comments-count').textContent = comments.length;

  const commentsListEl = modalElem.querySelector('.social__comments');
  commentsListEl.innerHTML = '';

  let currentIndex = 0;
  const {
    commentsListFragment: commentsListItems,
    currentIndex: currentRenderedCommentsCount,
  } = renderComments(comments, currentIndex, COMMENTS_COUNT_OFFSET);
  currentIndex = currentRenderedCommentsCount;

  currentCommentsCountElem.textContent = currentRenderedCommentsCount;
  commentsListEl.appendChild(commentsListItems);

  const commentsLoader = modalElem.querySelector('.comments-loader');
  commentsLoader.addEventListener('click', (event) => {
    event.preventDefault();
    renderComments(comments);
  });

  const closeButton = document.querySelector('.big-picture__cancel');

  const closeModal = (event) => {
    event.preventDefault();

    if (event.type !== 'click' && event.key !== 'Escape') {
      return;
    }

    modalElem.classList.add('hidden');
    body.classList.remove('modal-open');
  };

  closeButton.addEventListener('click', closeModal, { once: true });
  document.addEventListener('keydown', closeModal, { once: true });
  // Без once на один элемент закрытия окна будет навешиваться много обработчиков, которые будут срабатывать одновременно
};

export { renderPopup };
