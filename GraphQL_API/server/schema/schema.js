const graphql = require('graphql');
const _ = require('lodash');
const Project = require('../models/project');
const Task = require('../models/task');
const{ GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;


const TaskType = new graphql.GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: graphql.GraphQLID },
    title: { type: graphql.GraphQLString },
    weight: { type: graphql.GraphQLInt },
    description: { type: graphql.GraphQLString },
    project: {
      type: TaskType,
      resolve(parent, args) {
        return Project.findById(parent.projectId);
      }
    }
  })
});

const RootQuery = new graphql.GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    task: {
      type: TaskType,
      args: { id: {type: graphql.GraphQLID} },
      resolve(parent, args) {
        return Task.findById(args.id);
      }
    },
    project: {
      type: ProjectType,
      args: { id: {type: graphql.GraphQLID} },
      resolve(parent, args){
        return Project.findById(args.id);
      }
    },
    tasks: {
      type: new graphql.GraphQLList(TaskType),
      resolve: () => Task.find({})
    },
    projects: {
      type: new graphql.GraphQLList(ProjectType),
      resolve: () => Project.find({})
    }
  })
});

const ProjectType = new graphql.GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: graphql.GraphQLID },
    title: { type: graphql.GraphQLString },
    weight: { type: graphql.GraphQLInt },
    description: { type: graphql.GraphQLString },
    tasks: {
      type: new graphql.GraphQLList(TaskType),
      resolve(parent, args) {
        return Task.find({projectId:parent.id});
      }
    }
  })
});