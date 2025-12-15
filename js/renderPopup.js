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

  return (comments, parentNode) => {
    const currentCommentsCountElem = document.querySelector('.comments-current-count');
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

    currentCommentsCountElem.textContent = currentIndex;
    parentNode.appendChild(commentsListFragment);
  };

};

const renderPopup = ({ url, description, likes, comments }) => {
  document.querySelector('body').classList.add('modal-open');

  const modalElem = document.querySelector('.big-picture');
  modalElem.classList.remove('hidden');

  const imgElem = document.querySelector('.big-picture__img img');
  imgElem.src = url;
  imgElem.alt = description;

  modalElem.querySelector('.social__caption').textContent = description;
  modalElem.querySelector('.likes-count').textContent = likes;

  document.querySelector('.comments-count').textContent = comments.length;

  const commentsListEl = modalElem.querySelector('.social__comments');
  commentsListEl.innerHTML = '';

  const renderComments = createCommentRenderer(0, COMMENTS_COUNT_SHIFT);
  renderComments(comments, commentsListEl);

  const commentsLoader = modalElem.querySelector('.comments-loader');
  commentsLoader.addEventListener('click', (event) => {
    event.preventDefault();
    renderComments(comments, commentsListEl);
  });
  // Этот обработчик будет навешиваться заново каждый раз при открытии попапа
  // Что делать с этим не придумал
  // Вынести renderComments за пределы renderPopup не получается, т.к. нужно хранить контекст количества комментов для каждого открытия попапа

};

export { renderPopup };
