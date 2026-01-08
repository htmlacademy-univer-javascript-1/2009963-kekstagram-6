const renderForm = () => {
  const formModal = document.querySelector('.img-upload__overlay');
  const input = document.querySelector('.img-upload__input');
  const body = document.querySelector('body');
  const form = document.querySelector('.img-upload__form');
  const closeButton = document.querySelector('.img-upload__cancel');

  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    // errorTextClass: '',
  });

  const validateHashtags = (hashtags) => (
    hashtags
      .split(' ')
      .every((hashtag) => hashtag[0] === '#')
  );

  pristine.addValidator(
    form.querySelector('.text__hashtags'),
    validateHashtags,
    'гойда'
  );

  pristine.addValidator(
    form.querySelector('.text__description'),
    (value) => value.length <= 140,
    'гойда'
  );

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(pristine.validate());
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
