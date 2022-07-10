const { projects, clients } = require('../sampleData')

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
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parent,args){
                return clients;
            }  
        },
        client:{
            type: ClientType,
            args: {id: { type: GraphQLID} },
            resolve(parentValue, args){
                return clients.find(client => client.id === args.id)
            }
        },
        projects:{
            type: new GraphQLList(ProjectType),
            resolve(parent,args){
                return projects;
            }  
        },
        project:{
            type: ProjectType,
            args: {id: { type: GraphQLID} },
            resolve(parentValue, args){
                return projects.find(client => project.id === args.id)
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});