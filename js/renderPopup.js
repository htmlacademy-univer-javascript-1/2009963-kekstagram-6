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

const renderComments = (comments) => {
  const commentsListFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElem = renderComment(comment);
    commentsListFragment.appendChild(commentElem);
  });

  return commentsListFragment;
};

const renderPopup = ({ url, description, likes, comments }) => {
  const body = document.querySelector('body');
  body.classList.add('modal-open');

  const modalElem = document.querySelector('.big-picture');

  modalElem.classList.remove('hidden');

  modalElem.querySelector('.social__comment-count').classList.toggle('hidden');
  modalElem.querySelector('.comments-loader').classList.toggle('hidden');

  const imgElem = document.querySelector('.big-picture__img img');
  imgElem.src = url;
  imgElem.alt = description;

  document.querySelector('.social__caption').textContent = description;

  document.querySelector('.likes-count').textContent = likes;
  document.querySelector('.comments-count').textContent = comments.length;

  const commentsUl = document.querySelector('.social__comments');
  const commentsItems = renderComments(comments);

  commentsUl.replaceChildren(commentsItems);

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
