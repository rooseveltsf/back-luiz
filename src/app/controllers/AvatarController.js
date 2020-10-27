const Avatar = require('../models/Avatar');
const Student = require('../models/Student');

class AvatarController {
  async store(req, res) {
    const { userId } = req;

    const { originalname: name, filename: path } = req.file;

    try {
      const { id } = await Avatar.create({ name, path });

      await Student.update(
        {
          avatar_id: id,
        },
        {
          where: {
            id: userId,
          },
        }
      );

      const { avatar_id, avatar } = await Student.findOne({
        where: { id: userId },
        include: [
          {
            model: Avatar,
            as: 'avatar',
            attributes: ['path', 'url'],
          },
        ],
      });

      return res.json({ avatar, avatar_id });
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Não foi possivel adicionar avatar' });
    }
  }
}

module.exports = new AvatarController();