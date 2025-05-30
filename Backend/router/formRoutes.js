import express from 'express';
import {
  createForm,
  getAllForms,
  getFormById,
  updateForm,
  deleteForm,
  renderFormUI,
  submitFormResponse,
  getFormResponses
} from '../controllers/formController.js';

import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// ✅ PUBLIC routes (no auth)
router.get('/:id/render', renderFormUI);
router.post('/:id/submit', submitFormResponse);

// Middleware to protect below routes
router.use(authMiddleware);

// Create, get user's forms, update, delete
router.post('/', createForm);
router.get('/', getAllForms);
router.get('/:id', getFormById);
router.put('/:id', updateForm);
router.delete('/:id', deleteForm);

// Add this route for fetching form responses
router.get('/:id/responses', getFormResponses);

export default router;
