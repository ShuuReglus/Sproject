/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateCharacter = /* GraphQL */ `subscription OnCreateCharacter(
  $filter: ModelSubscriptionCharacterFilterInput
  $owner: String
) {
  onCreateCharacter(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCharacterSubscriptionVariables,
  APITypes.OnCreateCharacterSubscription
>;
export const onUpdateCharacter = /* GraphQL */ `subscription OnUpdateCharacter(
  $filter: ModelSubscriptionCharacterFilterInput
  $owner: String
) {
  onUpdateCharacter(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCharacterSubscriptionVariables,
  APITypes.OnUpdateCharacterSubscription
>;
export const onDeleteCharacter = /* GraphQL */ `subscription OnDeleteCharacter(
  $filter: ModelSubscriptionCharacterFilterInput
  $owner: String
) {
  onDeleteCharacter(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCharacterSubscriptionVariables,
  APITypes.OnDeleteCharacterSubscription
>;
export const onCreateComment = /* GraphQL */ `subscription OnCreateComment(
  $filter: ModelSubscriptionCommentFilterInput
  $owner: String
) {
  onCreateComment(filter: $filter, owner: $owner) {
    id
    content
    characterId
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateCommentSubscriptionVariables,
  APITypes.OnCreateCommentSubscription
>;
export const onUpdateComment = /* GraphQL */ `subscription OnUpdateComment(
  $filter: ModelSubscriptionCommentFilterInput
  $owner: String
) {
  onUpdateComment(filter: $filter, owner: $owner) {
    id
    content
    characterId
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateCommentSubscriptionVariables,
  APITypes.OnUpdateCommentSubscription
>;
export const onDeleteComment = /* GraphQL */ `subscription OnDeleteComment(
  $filter: ModelSubscriptionCommentFilterInput
  $owner: String
) {
  onDeleteComment(filter: $filter, owner: $owner) {
    id
    content
    characterId
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteCommentSubscriptionVariables,
  APITypes.OnDeleteCommentSubscription
>;
export const onCreateImage = /* GraphQL */ `subscription OnCreateImage(
  $filter: ModelSubscriptionImageFilterInput
  $owner: String
) {
  onCreateImage(filter: $filter, owner: $owner) {
    id
    url
    uploadedBy
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateImageSubscriptionVariables,
  APITypes.OnCreateImageSubscription
>;
export const onUpdateImage = /* GraphQL */ `subscription OnUpdateImage(
  $filter: ModelSubscriptionImageFilterInput
  $owner: String
) {
  onUpdateImage(filter: $filter, owner: $owner) {
    id
    url
    uploadedBy
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateImageSubscriptionVariables,
  APITypes.OnUpdateImageSubscription
>;
export const onDeleteImage = /* GraphQL */ `subscription OnDeleteImage(
  $filter: ModelSubscriptionImageFilterInput
  $owner: String
) {
  onDeleteImage(filter: $filter, owner: $owner) {
    id
    url
    uploadedBy
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteImageSubscriptionVariables,
  APITypes.OnDeleteImageSubscription
>;
