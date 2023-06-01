const ApiError = require('../errors/ApiError');
const { Zodiac, Person } = require('../models/models');

class zodiacController {
  async create(req, res, next) {
    let { sun, moon, mercury, venus, mars, jupiter, saturn, uranus, neptune, pluto, retro, description, personId } = req.body;

    try {
      const candidate = await Zodiac.findOne({ where: { personId } });
      if (candidate) {
        return next(ApiError.wrongValue('Zodiac for this person is already registered'));
      }

      let choosenPerson;
      if (personId && typeof personId == 'number') {
        choosenPerson = await Person.findOne({ where: { id: personId } });
      }
      if (!choosenPerson) {
        return next(ApiError.wrongValue('There is no such person registered'));
      }

      const zodiac = await Zodiac.create({
        sun,
        moon,
        mercury,
        venus,
        mars,
        jupiter,
        saturn,
        uranus,
        neptune,
        pluto,
        retro,
        description,
        personId,
      });

      res.json(zodiac);
    } catch (e) {
      return next(ApiError.internal('Server error'));
    }
  }

  async getAll(req, res) {
    const zodiacs = await Zodiac.findAll();
    res.json(zodiacs);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    try {
      const zodiac = await Zodiac.findOne({ where: { id } });
      if (!zodiac) {
        return next(ApiError.badRequest('There is no such zodiac registered'));
      }
      res.json(zodiac);
    } catch (e) {
      return next(ApiError.internal('Server error'));
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    let { sun, moon, mercury, venus, mars, jupiter, saturn, uranus, neptune, pluto, retro, description, personId } = req.body;
    try {
      // const candidate = await Zodiac.findOne({ where: { id } });
      // if (candidate && candidate.id !== +id) {
      //   return next(ApiError.wrongValue('This zodiac item is already registered'));
      // }

      const zodiac = await Zodiac.findOne({ where: { id } });
      if (!zodiac) {
        return next(ApiError.badRequest('There is no such zodiac registered'));
      }

      let choosenPerson;
      if (personId && typeof personId == 'number') {
        choosenPerson = await Person.findOne({ where: { id: personId } });
      }
      if (!choosenPerson) {
        return next(ApiError.wrongValue('There is no such person registered'));
      }

      await zodiac.update({
        sun,
        moon,
        mercury,
        venus,
        mars,
        jupiter,
        saturn,
        uranus,
        neptune,
        pluto,
        retro,
        description,
        personId,
      });
      res.json(zodiac);
    } catch (e) {
      return next(ApiError.internal('Server error'));
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const zodiac = await Zodiac.findOne({ where: { id } });
      if (!zodiac) {
        return next(ApiError.badRequest('There is no such zodiac registered'));
      }
      await zodiac.destroy();
      res.json({ id });
    } catch (e) {
      return next(ApiError.internal('Server error'));
    }
  }
}

module.exports = new zodiacController();
