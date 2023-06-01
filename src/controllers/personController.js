const ApiError = require('../errors/ApiError');
const { Person } = require('../models/models');

class PersonController {
  async create(req, res, next) {
    let { name, surname, birthday, timezone, birthplace, description } = req.body;
    try {
      if (!name || name.trim() === '' || !surname || surname.trim()) {
        return next(ApiError.wrongValue('Name is not defined'));
      }
      // const candidate = await Person.findOne({ where: { name } });
      // if (candidate) {
      //   return next(ApiError.wrongValue('This person name is already registered'));
      // }

      const person = await Person.create({ name, surname, birthday, timezone, birthplace, description });
      res.json(person);
    } catch (e) {
      return next(ApiError.internal('Unforseen error'));
    }
  }

  async getAll(req, res) {
    const persons = await Person.findAll();
    res.json(persons);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    try {
      const person = await Person.findOne({ where: { id } });
      if (!person) {
        return next(ApiError.badRequest('This person is not registered'));
      }
      res.json(person);
    } catch (e) {
      return next(ApiError.internal('Server error'));
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { name, surname, birthday, timezone, birthplace, description } = req.body;
    // try {

    if (!name || name.trim() === '' || !surname || surname.trim() === '') {
      return next(ApiError.wrongValue('Name is not defined'));
    }
    // const candidate = await Person.findOne({ where: { name } });
    // if (candidate && candidate.id !== +id) {
    //   return next(ApiError.wrongValue('This person is already registered'));
    // }

    const person = await Person.findOne({ where: { id } });
    if (!person) {
      return next(ApiError.badRequest('There is no such person registered'));
    }

    await person.update({ name, surname, birthday, timezone, birthplace, description });
    res.json(person);

    // } catch (e) {
    //   return next(ApiError.internal('Server error'));
    // }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      const person = await Person.findOne({ where: { id } });
      if (!person) {
        return next(ApiError.badRequest('There is no such person registered'));
      }
      await person.destroy();
      res.json(id);
    } catch (e) {
      return next(ApiError.internal('Server error'));
    }
  }
}

module.exports = new PersonController();
