const renderForm = () => {
  const formModal = document.querySelector('.img-upload__overlay');
  const input = document.querySelector('.img-upload__input');
  const body = document.querySelector('body');

  const closeButton = document.querySelector('.img-upload__cancel');

  const closeModal = () => {
    // дописать для esc
    formModal.classList.add('hidden');
    body.classList.remove('modal-open');
    // Сбросить форму через reset видимо
  };

  input.addEventListener('change', () => {
    formModal.classList.remove('hidden');
    body.classList.add('modal-open');
  });

  closeButton.addEventListener('click', closeModal);
};

export { renderForm };
