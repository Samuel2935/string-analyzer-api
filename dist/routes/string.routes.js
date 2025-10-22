import express from 'express';
import * as controller from '../controllers/string.controller.js';
const router = express.Router();
router.post('/', controller.createString);
router.get('/filter-by-natural-language', controller.filterByNaturalLanguage);
router.get('/', controller.getAllStrings);
router.get('/:id_or_value', controller.getStringByIdOrValue);
router.delete('/:id_or_value', controller.deleteString);
export default router;
