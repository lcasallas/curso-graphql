'use strict';
const connectdb = require('./db');
const { ObjectID } = require('mongodb');

module.exports = {
	getCourses: async () => {
		let db = [];
		let courses = [];
		try {
			db = await connectdb();
			courses = await db.collection('courses').find({}).toArray();
		} catch (error) {
			console.log('[error]', error.message);
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
			console.log('[error]', error.message);
		}
		return course;
	},
};
