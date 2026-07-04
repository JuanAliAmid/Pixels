import { Router } from "express";
import recommendationController from "../../controllers/recommendation.controller.js";

const router = Router();

router.get('/', recommendationController.getAllRecommendations);

router.post('/', recommendationController.createRecommendation);

export default router;