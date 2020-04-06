'use strict';

const connectDb = require('./db');
const { ObjectID } = require('mongodb');
const errorHandler = require('./errorHandler');

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: '',
    };

    const newCourse = Object.assign(defaults, input);
    let db;
    let course;
    try {
      db = await connectDb();
      console.log('[nuevo registro]', newCourse);

      course = await db.collection('courses').insertOne(newCourse);
      newCourse._id = course.insertedId;
    } catch (error) {
      errorHandler(error);
    }
    return newCourse;
  },
  editCourse: async (root, { id, input }) => {
    let db;
    let course;
    try {
      db = await connectDb();
      await db
        .collection('courses')
        .updateOne({ _id: ObjectID(id) }, { $set: input });
      course = await db.collection('courses').findOne({ _id: ObjectID(id) });
    } catch (error) {
      errorHandler(error);
    }
    return course;
  },
  deleteCourse: async (root, { id }) => {
    let db;
    try {
      db = await connectDb();
      await db.collection('courses').deleteOne({ _id: ObjectID(id) });
      return `Curso con ID: ${id}, con exito!`;
    } catch (error) {
      errorHandler(error);
    }
  },
  createPerson: async (root, { input }) => {
    let db;
    let person;
    try {
      db = await connectDb();
      person = await db.collection('students').insertOne(input);
      input._id = person.insertedId;
    } catch (error) {
      errorHandler(error);
    }
    return input;
  },
  editPerson: async (root, { id, input }) => {
    let db;
    let person;
    try {
      db = await connectDb();
      await db
        .collection('students')
        .updateOne({ _id: ObjectID(id) }, { $set: input });
      person = await db.collection('students').findOne({ _id: ObjectID(id) });
    } catch (error) {
      errorHandler(error);
    }
    return person;
  },
  deletePerson: async (root, { id }) => {
    let db;
    try {
      db = await connectDb();
      await db.collection('students').deleteOne({ _id: ObjectID(id) });
      return `Estudiante con ID: ${id}, con exito!`;
    } catch (error) {
      errorHandler(error);
    }
  },
  addPeople: async (root, { courseID, personID }) => {
    let db;
    let person;
    let course;
    try {
      db = await connectDb();
      course = await db
        .collection('courses')
        .findOne({ _id: ObjectID(courseID) });
      person = await db
        .collection('students')
        .findOne({ _id: ObjectID(personID) });

      if (!course || !person) {
        throw new Error('La persona o el curso no existe');
      }

      await db
        .collection('courses')
        .updateOne(
          { _id: ObjectID(courseID) },
          { $addToSet: { people: personID } }
        );
      return course;
    } catch (error) {
      errorHandler(error);
    }
  },
};
