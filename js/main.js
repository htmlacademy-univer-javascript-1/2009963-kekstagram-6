import { generatePhotosData } from './data.js';
import { createGallery } from './gallery.js';

const data = generatePhotosData();
createGallery(data);
