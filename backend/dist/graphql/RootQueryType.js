"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootQueryType = void 0;
var graphql_1 = require("graphql");
var IProductType_1 = require("./types/IProductType");
exports.RootQueryType = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getDeals: {
            type: new graphql_1.GraphQLList(IProductType_1.IProductType),
            resolve: function (obj, args, ctx) {
                var products = [
                    {
                        _id: 1,
                        title: "Macbook pro",
                        category: "Computer",
                        price: 1200,
                        sku: "ssfff44",
                        ratings: 4,
                    },
                ];
                return products;
            },
        },
        getDealById: {
            type: IProductType_1.IProductType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            resolve: function (obj, args, ctx) {
                return "single product";
            },
        },
    },
});
