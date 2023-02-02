import express from 'express';

import { create, update, findAll, findOne } from '../controllers/stock.controller';

const router = express.Router();

router.post('/', create);
router.get('/', findAll);
router.put("/:id", update);
router.get('/:id', findOne);

export default router;