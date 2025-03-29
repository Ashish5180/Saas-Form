import express from 'express';
import { createWebhook, getWebhooks, updateWebhook, deleteWebhook } from '../controllers/webhookController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(authMiddleware, createWebhook)
  .get(authMiddleware, getWebhooks);

router.route('/:id')
  .put(authMiddleware, updateWebhook)
  .delete(authMiddleware, deleteWebhook);

export default router;
