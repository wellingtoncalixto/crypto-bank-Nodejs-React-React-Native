import jwt from 'jsonwebtoken';
import User from '../model/User';
import auth from '../../config/auth';

class SessionControoler {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ erro: 'Usuario não existe' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Passworld não bate' });
    }

    const { id, name, saldo } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        saldo,
      },
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expireIn,
      }),
    });
  }
}

export default new SessionControoler();
