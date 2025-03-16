/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createCharacter = /* GraphQL */ `mutation CreateCharacter(
  $input: CreateCharacterInput!
  $condition: ModelCharacterConditionInput
) {
  createCharacter(input: $input, condition: $condition) {
    id
    name
    imageUrl
    description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCharacterMutationVariables,
  APITypes.CreateCharacterMutation
>;
export const updateCharacter = /* GraphQL */ `mutation UpdateCharacter(
  $input: UpdateCharacterInput!
  $condition: ModelCharacterConditionInput
) {
  updateCharacter(input: $input, condition: $condition) {
    id
    name
    imageUrl
    description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCharacterMutationVariables,
  APITypes.UpdateCharacterMutation
>;
export const deleteCharacter = /* GraphQL */ `mutation DeleteCharacter(
  $input: DeleteCharacterInput!
  $condition: ModelCharacterConditionInput
) {
  deleteCharacter(input: $input, condition: $condition) {
    id
    name
    imageUrl
    description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCharacterMutationVariables,
  APITypes.DeleteCharacterMutation
>;
export const createComment = /* GraphQL */ `mutation CreateComment(
  $input: CreateCommentInput!
  $condition: ModelCommentConditionInput
) {
  createComment(input: $input, condition: $condition) {
    id
    content
    characterId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCommentMutationVariables,
  APITypes.CreateCommentMutation
>;
export const updateComment = /* GraphQL */ `mutation UpdateComment(
  $input: UpdateCommentInput!
  $condition: ModelCommentConditionInput
) {
  updateComment(input: $input, condition: $condition) {
    id
    content
    characterId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCommentMutationVariables,
  APITypes.UpdateCommentMutation
>;
export const deleteComment = /* GraphQL */ `mutation DeleteComment(
  $input: DeleteCommentInput!
  $condition: ModelCommentConditionInput
) {
  deleteComment(input: $input, condition: $condition) {
    id
    content
    characterId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCommentMutationVariables,
  APITypes.DeleteCommentMutation
>;
export const createImage = /* GraphQL */ `mutation CreateImage(
  $input: CreateImageInput!
  $condition: ModelImageConditionInput
) {
  createImage(input: $input, condition: $condition) {
    id
    url
    uploadedBy
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateImageMutationVariables,
  APITypes.CreateImageMutation
>;
export const updateImage = /* GraphQL */ `mutation UpdateImage(
  $input: UpdateImageInput!
  $condition: ModelImageConditionInput
) {
  updateImage(input: $input, condition: $condition) {
    id
    url
    uploadedBy
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateImageMutationVariables,
  APITypes.UpdateImageMutation
>;
export const deleteImage = /* GraphQL */ `mutation DeleteImage(
  $input: DeleteImageInput!
  $condition: ModelImageConditionInput
) {
  deleteImage(input: $input, condition: $condition) {
    id
    url
    uploadedBy
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteImageMutationVariables,
  APITypes.DeleteImageMutation
>;
