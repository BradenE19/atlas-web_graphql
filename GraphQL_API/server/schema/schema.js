const express = require('express');
const expressGraphQL = require('express-graphql');
const lodash = require('lodash');
const Task = require("../models/task");
const Project = require("../models/project");


const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')

const app = express()

//deleted both arrays of data so we can pull directly from the database

// rootQuery scope
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    Task: {
    type: TaskType,
    args: {
        id: { type: GraphQLString }
      },
      resolve: (parent, args) => {
	  // return lodash.find(arrayTasks, { id: args.id })
	  return Task.findById(id);
      }
    },
    Project: {
      type: ProjectType,
      args: {
          id: { type: GraphQLString }
        },
        resolve: (parent, args) => {
            // return lodash.find(arrayProjects, { id: args.id })
	    return Project.findById(id);
        }
      },
      tasks: {
        type: new GraphQLList(TaskType),
        resolve: () => Task.find({})
      },
      projects: {
        type: new GraphQLList(ProjectType),
        resolve: () => Project.find({})
      }
  })
})

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: (GraphQLID) },
    projectId: { type: (GraphQLID) },
    title: { type: (GraphQLString) },
    weight: { type: (GraphQLInt) },
    description: { type: (GraphQLString) },
    project: {
      type: ProjectType,
      resolve: (parent, args) => {
        return Project.findById(parent.projectId);
        // return lodash.find(arrayTasks, { id: parent.TaskId});
      }
    }
  })
})

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: (GraphQLID) },
    title: { type: (GraphQLString) },
    weight: { type: (GraphQLInt) },
    description: { type: (GraphQLString) },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: (parent, args) => {
        return Task.find({projectId: parent.id})
        // return lodash.find(arrayProjects, { id: parent.ProjectId});
      }
    }
  })
})
