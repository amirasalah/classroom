"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IProductType = void 0;
var graphql_1 = require("graphql");
exports.IProductType = new graphql_1.GraphQLObjectType({
    name: "IProductType",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        category: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLInt },
        ratings: { type: graphql_1.GraphQLInt },
        sku: { type: graphql_1.GraphQLString },
    },
});
