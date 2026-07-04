import recommendationModel from "../models/recommendation.model.js";

const createRecommendationDao = async (title, category, description) => {

    const newRecommendation = await recommendationModel.create({
        title,
        category,
        description
    })
    return newRecommendation;

}

const getAllRecommendationDao = async () => {

    const allRecommendation = await recommendationModel.find();
    return allRecommendation;

}

export default {
    createRecommendationDao,
    getAllRecommendationDao
}