import Signature from '../models/Signature';

class SignatureController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await Signature.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new SignatureController();
