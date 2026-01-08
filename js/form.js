import { ERRORS } from './constants.js';

const createFormValidator = (formNode) => {
  const pristine = new Pristine(
    formNode,
    {
      classTo: 'img-upload__field-wrapper',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextClass: 'form__error',
    },
    true
  );

  let currentHashtagErrorCode = '';
  const getErrorMessage = () => ERRORS[currentHashtagErrorCode];

  const validateHashtags = (hashtags) => {
    if (hashtags.length === 0) {
      currentHashtagErrorCode = '';
      return true;
    }

    const regExp = /^[a-zA-Zа-яА-ЯёЁ]+$/;
    const hashtagsArr = hashtags.split(' ');
    if (hashtagsArr.length > 5) {
      currentHashtagErrorCode = 'tooManyHashtags';
      return false;
    }
    return hashtagsArr
      .map((hashtag) => hashtag.toLowerCase())
      .every((hashtag, index) => {
        if (hashtag[0] !== '#') {
          currentHashtagErrorCode = 'hasNoHash';
          return false;
        }

        if(hashtagsArr.indexOf(hashtag) !== index) {
          currentHashtagErrorCode = 'hasToBeUniq';
          return false;
        }

        const hashtagText = hashtag.slice(1);

        if (hashtagText.length === 0) {
          currentHashtagErrorCode = 'zeroLenght';
          return false;
        }
        if (!regExp.test(hashtagText)) {
          currentHashtagErrorCode = 'noSymbols';
          return false;
        }
        if (hashtagText.length > 20) {
          currentHashtagErrorCode = 'tooLongHashtag';
          return false;
        }
        currentHashtagErrorCode = '';
        return true;
      });
  };

  pristine.addValidator(
    formNode.querySelector('.text__hashtags'),
    validateHashtags,
    getErrorMessage
  );

  pristine.addValidator(
    formNode.querySelector('.text__description'),
    (value) => value.length <= 140,
    'Комментарий не может содержать больше 140 символов'
  );

  return pristine;
};

const renderForm = () => {
  const formModal = document.querySelector('.img-upload__overlay');
  const input = document.querySelector('.img-upload__input');
  const body = document.querySelector('body');
  const form = document.querySelector('.img-upload__form');
  const closeButton = document.querySelector('.img-upload__cancel');

  const pristine = createFormValidator(form);

  form.addEventListener('submit', (event) => {
    if (!pristine.validate()) {
      event.preventDefault();
    }
  });


  const closeModal = (event) => {
    if (event.type !== 'click' && event.key !== 'Escape') {
      return;
    }
    if (event.target === form.querySelector('.text__hashtags')) {
      return;
    }
    if (event.target === form.querySelector('.text__description')) {
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
