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

const getRandomCount = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createUniqIdSeq = () => {
  const ids = [];

  return () => {
    const getId = () => getRandomCount(PHOTOS_COUNT + 1, PHOTOS_COUNT * MAX_COMMENTS_COUNT);
    let newId = getId();

    while (ids.includes(newId)) {
      newId = getId();
    }

    ids.push(newId);
    return newId;
  };
};

const getUniqId = createUniqIdSeq();

const createComment = (id) => {
  const messagesCount = getRandomCount(1, 2);

  // Тут доделать

  return {
    id,
    avatar: `img/avatar-${getRandomCount(AVATAR_MIN_ID, AVATAR_MAX_ID)}.svg`,
    message: MESSAGES[getRandomCount(0, MESSAGES.length - 1)],
    name: NAMES[getRandomCount(0, NAMES.length - 1)]
  };
};

const createPhoto = (id) => {
  const likesCount = getRandomCount(MIN_LIKES_COUNT, MAX_LIKES_COUNT);
  const commentsCount = getRandomCount(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);

  const result = {
    id,
    url: `photos/${id}.jpg`,
    description: DESCRIPTIONS[getRandomCount(0, DESCRIPTIONS.length - 1)],
    likes: likesCount,
    comments: Array.from({length: commentsCount}, () => createComment(getUniqId())),
  };

  return result;
};

const photos = Array.from({length: PHOTOS_COUNT}, (item, index) => createPhoto(index));

console.log(photos);
