import recommendationDao from "../dao/recommendation.dao.js";

const createRecommendation = async (req, res) => { //traer todos los juegos

    const { title, category, description } = req.body;

    try {

        if (!title) return res.status(400).json({ sucess: false, error: "El campo nombre es requrido" });
        if (!category) return res.status(400).json({ sucess: false, error: "El campo categoría es requrido" });
        if (!description) return res.status(400).json({ sucess: false, error: "El campo descripción es requrido" });

        const games = await recommendationDao.createRecommendationDao(title, category, description);

        res.redirect('/');

    } catch (error) {
        res.status(500).json({ success: false, message: "no existen juegos", error });
    }
};

const getAllRecommendations = async (req, res) => {
    try {

        const juegosRecomendados = await recommendationDao.getAllRecommendationDao()

        if (juegosRecomendados.length === 0) {
            return res.status(400).json({ success: false, error: "no existen juegos" });
        }

        res.status(200).json({success: true, payload: juegosRecomendados})

    } catch (error) {
        res.status(500).json({ success: false, message: "no existen juegos", error });
    }

}

export default {
    createRecommendation,
    getAllRecommendations
}