import * as yup from 'yup';

import User from '../model/User';

class UserController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().requered(),
      email: yup.string().requered(),
      password: yup
        .string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'error na validação' });
    }

    const UserExist = await User.findOne({ where: { email: req.body.email } });

    if (UserExist) {
      return res.status(401).json({ error: ' Usuario já existente ' });
    }

    const { id, name, email, saldo } = await User.create(req.body);

    return res.json({ id, name, email, saldo });
  }

  async update(req, res) {
    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string(),
      oldpassword: yup
        .string()
        .required()
        .min(6),
      password: yup
        .string()
        .required()
        .min(6)
        .when('oldpassword', (oldPassword, field) =>
          oldPassword ? field.requered() : field
        ),
      confirmPassword: yup
        .string()
        .when('password', (password, field) =>
          password ? field.required.oneOf([yup.ref('password')]) : field
        ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'error na validação' });
    }
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const exist = await User.findOne({ where: { email } });

      if (exist) {
        return res
          .status(400)
          .json({ error: 'Outro usuario já esta usando esse email' });
      }
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(400).json({ error: 'Password não combinam' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({ id, name, email });
  }
}
export default new UserController();
