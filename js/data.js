import { getRandomCount, createIdSeq } from './utils.js';

const PHOTOS_COUNT = 25;

const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;

const MIN_COMMENTS_COUNT = 0;
const MAX_COMMENTS_COUNT = 30;

const AVATAR_MIN_ID = 1;
const AVATAR_MAX_ID = 6;


const DESCRIPTIONS = [
  'Первое описание',
  'Второе описание',
  'Третье описание',
  'Четвертое описание',
  'Пятое описание',
  'Шестое описание',
  'Седьмое описание',
  'Восьмое описание',
  'Девятое описание'
];

const NAMES = [
  'Чарли',
  'Горячий Брауни',
  'Томпсонск',
  'Барлай',
  'Уоллес',
  'Громмит',
  'Ванюшка',
  'Тренквор',
  'Дорнав',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const createMessage = (messagesCount) => {
  const getIndex = () => getRandomCount(0, MESSAGES.length - 1);
  const index = getIndex();

  if (messagesCount === 2) {
    let newIndex = getIndex();
    while (index === newIndex) {
      newIndex = getIndex();
    }

    return `${MESSAGES[index]} ${MESSAGES[newIndex]}`;
  }

  return MESSAGES[index];
};

const createComment = (id) => {
  const messagesCount = getRandomCount(1, 2);

  return {
    id,
    avatar: `img/avatar-${getRandomCount(AVATAR_MIN_ID, AVATAR_MAX_ID)}.svg`,
    message: createMessage(messagesCount),
    name: NAMES[getRandomCount(0, NAMES.length - 1)]
  };
};

const createPhoto = (photoId, createUniqCommentId) => {
  const likesCount = getRandomCount(MIN_LIKES_COUNT, MAX_LIKES_COUNT);
  const commentsCount = getRandomCount(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);

  const result = {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: DESCRIPTIONS[getRandomCount(0, DESCRIPTIONS.length - 1)],
    likes: likesCount,
    comments: Array.from({length: commentsCount}, () => createComment(createUniqCommentId())),
  };

  return result;
};

const createPhotos = () => {
  const createId = createIdSeq(PHOTOS_COUNT + 1);
  return Array.from({length: PHOTOS_COUNT}, (item, index) => createPhoto(index + 1, createId));
};

export { createPhotos };
