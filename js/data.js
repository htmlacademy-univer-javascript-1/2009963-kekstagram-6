import { getRandomCount, createIdGenerator } from './utils.js';
import {
  PHOTOS_COUNT,
  MIN_LIKES_COUNT,
  MAX_LIKES_COUNT,
  MIN_COMMENTS_COUNT,
  MAX_COMMENTS_COUNT,
  AVATAR_MIN_ID,
  AVATAR_MAX_ID,
  DESCRIPTIONS,
  NAMES,
  MESSAGES,
} from './constants.js';

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
  const generateId = createIdGenerator(PHOTOS_COUNT + 1);
  return Array.from({length: PHOTOS_COUNT}, (item, index) => createPhoto(index + 1, generateId));
};

export { createPhotos };
