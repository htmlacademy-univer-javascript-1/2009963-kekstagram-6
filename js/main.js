import { generatePhotosData } from './data.js';
import { createGallery } from './gallery.js';

import { renderForm } from './form.js';

const data = generatePhotosData();
createGallery(data);

