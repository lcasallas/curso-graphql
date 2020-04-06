'use strict';
const connectdb = require('./db');
const { ObjectID } = require('mongodb');
const errorHandler = require('./errorHandler');

module.exports = {
  getCourses: async () => {
    let db = [];
    let courses = [];
    try {
      db = await connectdb();
      courses = await db.collection('courses').find({}).toArray();
    } catch (error) {
      errorHandler(error);
    }
    return courses;
  },
  getCourse: async (root, args) => {
    let db = [];
    let course;
    try {
      db = await connectdb();
      course = await db
        .collection('courses')
        .findOne({ _id: ObjectID(args.id) });
    } catch (error) {
      errorHandler(error);
    }
    return course;
  },
  getPeople: async () => {
    let db = [];
    let people = [];
    try {
      db = await connectdb();
      people = await db.collection('students').find({}).toArray();
    } catch (error) {
      errorHandler(error);
    }
    return people;
  },
  getPerson: async (root, args) => {
    let db = [];
    let person;
    try {
      db = await connectdb();
      person = await db
        .collection('students')
        .findOne({ _id: ObjectID(args.id) });
    } catch (error) {
      errorHandler(error);
    }
    return person;
  },
  searchItems: async (root, { keyword }) => {
    let db = [];
    let items;
    let courses;
    let people;
    console.log('KEYWORD', keyword);
    try {
      db = await connectdb();
      courses = await db
        .collection('courses')
        .find({ $text: { $search: keyword } })
        .toArray();

      people = await db
        .collection('students')
        .find({ $text: { $search: keyword } })
        .toArray();

      items = [...courses, ...people];
    } catch (error) {
      errorHandler(error);
    }
    return items;
  },
};
