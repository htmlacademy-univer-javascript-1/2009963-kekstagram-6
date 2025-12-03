const renderPhotos = (data) => {
  const picturesContainer = document.querySelector('.pictures');
  const photoTemplate = document
    .querySelector('#picture')
    .content
    .querySelector('.picture');

  const photosListFragment = document.createDocumentFragment();

  data.forEach(({ url, likes, comments }) => {
    const photoEl = photoTemplate.cloneNode(true);
    photoEl.querySelector('.picture__img').src = url;
    photoEl.querySelector('.picture__comments').textContent = comments.length;
    photoEl.querySelector('.picture__likes').textContent = likes;

    photosListFragment.appendChild(photoEl);
  });

  picturesContainer.appendChild(photosListFragment);
};

export { renderPhotos };
