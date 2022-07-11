//Mongoose models
const Project = require('../models/Project');
const Client = require('../models/Client');

const { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLList,
} = require('graphql');

//Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
});

//Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        name: { type: GraphQLID },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.findById(parent.clientId);
            },
        },        
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parent,args){
                return Client.find();
            }  
        },
        client:{
            type: ClientType,
            args: {id: { type: GraphQLID} },
            resolve(parentValue, args){
                return Client.findById(args.id);
            }
        },
        projects:{
            type: new GraphQLList(ProjectType),
            resolve(parent,args){
                return Project.find();
            }  
        },
        project:{
            type: ProjectType,
            args: {id: { type: GraphQLID} },
            resolve(parentValue, args){
                return Project.findById(args.id);
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});