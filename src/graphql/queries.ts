/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getCharacter = /* GraphQL */ `query GetCharacter($id: ID!) {
  getCharacter(id: $id) {
    id
    name
    imageUrl
    description
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCharacterQueryVariables,
  APITypes.GetCharacterQuery
>;
export const listCharacters = /* GraphQL */ `query ListCharacters(
  $filter: ModelCharacterFilterInput
  $limit: Int
  $nextToken: String
) {
  listCharacters(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      imageUrl
      description
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCharactersQueryVariables,
  APITypes.ListCharactersQuery
>;
export const getComment = /* GraphQL */ `query GetComment($id: ID!) {
  getComment(id: $id) {
    id
    content
    characterId
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCommentQueryVariables,
  APITypes.GetCommentQuery
>;
export const listComments = /* GraphQL */ `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      characterId
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCommentsQueryVariables,
  APITypes.ListCommentsQuery
>;
export const getImage = /* GraphQL */ `query GetImage($id: ID!) {
  getImage(id: $id) {
    id
    url
    uploadedBy
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetImageQueryVariables, APITypes.GetImageQuery>;
export const listImages = /* GraphQL */ `query ListImages(
  $filter: ModelImageFilterInput
  $limit: Int
  $nextToken: String
) {
  listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      url
      uploadedBy
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListImagesQueryVariables,
  APITypes.ListImagesQuery
>;
