const Score = require('../schemas/Score');

class ScoreController {
  async index(req, res) {
    const scores = await Score.find().sort({ score: 'desc' })

    return res.json(scores);
  }

  async update(req, res) {
    const { id } = req.params;
    const { isAccerted } = req.body;


    const { score } = await Score.findById(id);

    if(!score) {
      return res.status(400).json({ error: 'Potuação não existe!' });
    }
    const value = isAccerted ? Number(score) + 2 : Number(score) - 1;
    
    await Score.updateOne(
      {_id: req.params.id},
      { score: value },
    );

    return res.send();
    // return res.json(newScore);
  }
};

module.exports = new ScoreController();