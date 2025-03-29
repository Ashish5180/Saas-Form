import express from 'express';
import { getIntegrations, connectIntegration, disconnectIntegration } from '../controllers/integrationController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getIntegrations);
router.put('/:id/connect', authMiddleware, connectIntegration);
router.put('/:id/disconnect', authMiddleware, disconnectIntegration);

export default router;
