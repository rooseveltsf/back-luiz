const Rating = require('../schemas/Rating');

class RatingController {
  async index(req, res) {
    const ratings = await Rating.find();

    return res.json(ratings);
  }

  async show(req, res) {
    const { rating } = await Rating.findOne({
      teacher_id: req.params.id
    });

    const media = rating
    .reduce((soma, nota) => soma + nota, 0) / rating.length
    .toFixed(1);

    return res.json({ media });
  }

  async update(req, res) {
    const { id } = req.params;
    const { nota } = req.body;

    const { rating } = await Rating.findOne({
      teacher_id: id
    });

    const ratings = [
      ...rating,
      nota,
    ]

    
    await Rating.updateOne(
      { teacher_id: id },
      { rating: ratings }
    );
    
    const media = ratings
      .reduce((soma, nota) => soma + nota, 0) / ratings.length
      .toFixed(1);
      
    return res.send();
  }
}

module.exports = new RatingController();