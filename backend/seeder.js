import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/db.js';
import User from './models/user.js';
import { Project } from './models/project.js';
import { USERS } from './data/users.js';
import { PROJECTS } from './data/projects.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Project.deleteMany();

    const createdUser = await User.insertMany(USERS);
    const userId = createdUser[0]._id;

    const sampleProjects = PROJECTS.map((project) => {
      return { ...project, supervisor: userId };
    });

    await Project.insertMany(sampleProjects);
    process.exit;

    console.log('Data Imported!'.green.inverse);
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Project.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit;
  } catch (err) {
    console.log(`${err}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
