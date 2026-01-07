const renderForm = () => {
  const formModal = document.querySelector('.img-upload__overlay');
  const input = document.querySelector('.img-upload__input');
  const body = document.querySelector('body');
  const form = document.querySelector('.img-upload__form');
  const closeButton = document.querySelector('.img-upload__cancel');

  const pristine = new Pristine(form, {
    classTo: 'setup-wizard-form__element',
    errorTextParent: 'setup-wizard-form__element',
    errorTextClass: 'setup-wizard-form__error-text',
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

  });

  const closeModal = (event) => {
    if (event.type !== 'click' && event.key !== 'Escape') {
      return;
    }
    event.preventDefault();
    formModal.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    input.value = '';
  };

  input.addEventListener('change', () => {
    formModal.classList.remove('hidden');
    body.classList.add('modal-open');
  });

  closeButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);
};

export { renderForm };
