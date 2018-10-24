const graphql= require('graphql');
const _=require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList } = graphql;

//dummy data
var books=[
  {name:'Wings of Fire',genre:'Autobiography', id:'1',authorId:'1'},
  {name:'Steve Jobs',genre:'Biography', id:'2' ,authorId:'2'},
  {name:'Audicity of Hope',genre:'Autobiography', id:'3' ,authorId:'3'},
  {name:'Looking for Alaska',genre:'Novel', id:'4' ,authorId:'3'},
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '7', authorId: '1' },
  { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '2' },
  { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '2' },
];

const BookType= new GraphQLObjectType({
  name: "Book",
  fields:()=>({
    id: {type:GraphQLID},
    name: {type:GraphQLString},
    genre: {type:GraphQLString},
    author:{
      type: AuthorType,
      resolve(parent,args){
        //parent is used because we already have id of author in the book object.
        return _.find(authors,{id:parent.authorId});
      }
    }
  })
});

//dummy data
var authors=[
  {name:'APJ Abdul Kalam',age:44,id:'1'},
  {name:'Steve Jobs',age:30,id:'2'},
  {name:'Jhon Doe',age:41,id:'3'},
];

const AuthorType= new GraphQLObjectType({
  name: "Author",
  fields:()=>({
    id: {type:GraphQLID},
    name: {type:GraphQLString},
    age: {type:GraphQLInt},
    books:{
      type:new GraphQLList(BookType),
      resolve(parent,args){
        return _.filter(books,{authorId:parent.id});
      }
    }
  })
});


const RootQuery= new GraphQLObjectType({
  name:"RootQueryType",
  fields:{
    book:{
      type:BookType,
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
        //code to get data from db or other source
        return _.find(books,{id:args.id});
      }
    },
    author:{
      type:AuthorType,
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
        //code to get data from db or other source
        return _.find(authors,{id:args.id});
      }
    },
    books:{
      type:new GraphQLList(BookType),
      resolve(parent,args){
        //code to get data from db or other source
        return books;
      }
    },
    authors:{
      type:new GraphQLList(AuthorType),
      resolve(parent,args){
        //code to get data from db or other source
        return authors;
      }
    },
  }
});


module.exports=new GraphQLSchema({
  query:RootQuery
});
