const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
  } = require('graphql');
  const Project = require('../models/project');
  const Task = require('../models/task');

  // Root query for defining types of queries
  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
      task: {
        type: TaskType,
        args: { id: { type: GraphQLString } },
        resolve: (parent, args) => Task.findById(args.id)
      },
      project: {
        type: ProjectType,
        args: { id: { type: GraphQLID } },
        resolve: (parent, args) => Project.findById(args.id)
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
  });
