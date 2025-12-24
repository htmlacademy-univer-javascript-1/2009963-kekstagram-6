const renderForm = () => {
  const formModal = document.querySelector('.img-upload__overlay');
  const input = document.querySelector('.img-upload__input');
  const body = document.querySelector('body');

  const closeButton = document.querySelector('.img-upload__cancel');

  // const closeModal = () => {
  // дописать для esc
  // formModal.classList.add('hidden');
  // body.classList.remove('modal-open');
  // Сбросить форму через reset видимо
  // };

  const closeModal = (event) => {
    if (event.type !== 'click' && event.key !== 'Escape') {
      return;
    }
    event.preventDefault();
    formModal.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    // event.target.removeEventListener('click', closeModal);
};

  input.addEventListener('change', () => {
    formModal.classList.remove('hidden');
    body.classList.add('modal-open');
  });

  closeButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);
};

export { renderForm };
