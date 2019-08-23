import User from '../model/User';

class UserController {
  async store(req, res) {
    const UserExist = await User.findOne({ where: { email: req.body.email } });

    if (UserExist) {
      return res.status(401).json({ error: ' Usuario já existente ' });
    }

    const { id, name, email, saldo } = await User.create(req.body);

    return res.json({ id, name, email, saldo });
  }
}

export default new UserController();
