import { generatePhotosData } from './data.js';
import { renderPhotos } from './renderPhotos.js';

const data = generatePhotosData();
renderPhotos(data);
