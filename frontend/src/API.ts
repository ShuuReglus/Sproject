/* esslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCharacterInput = {
  id?: string | null,
  name: string,
  imageUrl?: string | null,
  description?: string | null,
};

export type ModelCharacterConditionInput = {
  name?: ModelStringInput | null,
  imageUrl?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelCharacterConditionInput | null > | null,
  or?: Array< ModelCharacterConditionInput | null > | null,
  not?: ModelCharacterConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Character = {
  __typename: "Character",
  id: string,
  name: string,
  imageUrl?: string | null,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateCharacterInput = {
  id: string,
  name?: string | null,
  imageUrl?: string | null,
  description?: string | null,
};

export type DeleteCharacterInput = {
  id: string,
};

export type CreateCommentInput = {
  id?: string | null,
  content: string,
  characterId: string,
  createdAt?: string | null,
};

export type ModelCommentConditionInput = {
  content?: ModelStringInput | null,
  characterId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelCommentConditionInput | null > | null,
  or?: Array< ModelCommentConditionInput | null > | null,
  not?: ModelCommentConditionInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Comment = {
  __typename: "Comment",
  id: string,
  content: string,
  characterId: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateCommentInput = {
  id: string,
  content?: string | null,
  characterId?: string | null,
  createdAt?: string | null,
};

export type DeleteCommentInput = {
  id: string,
};

export type CreateImageInput = {
  id?: string | null,
  url: string,
  uploadedBy?: string | null,
  createdAt?: string | null,
};

export type ModelImageConditionInput = {
  url?: ModelStringInput | null,
  uploadedBy?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelImageConditionInput | null > | null,
  or?: Array< ModelImageConditionInput | null > | null,
  not?: ModelImageConditionInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type Image = {
  __typename: "Image",
  id: string,
  url: string,
  uploadedBy?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateImageInput = {
  id: string,
  url?: string | null,
  uploadedBy?: string | null,
  createdAt?: string | null,
};

export type DeleteImageInput = {
  id: string,
};

export type ModelCharacterFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  imageUrl?: ModelStringInput | null,
  description?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCharacterFilterInput | null > | null,
  or?: Array< ModelCharacterFilterInput | null > | null,
  not?: ModelCharacterFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelCharacterConnection = {
  __typename: "ModelCharacterConnection",
  items:  Array<Character | null >,
  nextToken?: string | null,
};

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null,
  content?: ModelStringInput | null,
  characterId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCommentFilterInput | null > | null,
  or?: Array< ModelCommentFilterInput | null > | null,
  not?: ModelCommentFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelCommentConnection = {
  __typename: "ModelCommentConnection",
  items:  Array<Comment | null >,
  nextToken?: string | null,
};

export type ModelImageFilterInput = {
  id?: ModelIDInput | null,
  url?: ModelStringInput | null,
  uploadedBy?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelImageFilterInput | null > | null,
  or?: Array< ModelImageFilterInput | null > | null,
  not?: ModelImageFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelImageConnection = {
  __typename: "ModelImageConnection",
  items:  Array<Image | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionCharacterFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  imageUrl?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCharacterFilterInput | null > | null,
  or?: Array< ModelSubscriptionCharacterFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionCommentFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  content?: ModelSubscriptionStringInput | null,
  characterId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCommentFilterInput | null > | null,
  or?: Array< ModelSubscriptionCommentFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionImageFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  url?: ModelSubscriptionStringInput | null,
  uploadedBy?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionImageFilterInput | null > | null,
  or?: Array< ModelSubscriptionImageFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type CreateCharacterMutationVariables = {
  input: CreateCharacterInput,
  condition?: ModelCharacterConditionInput | null,
};

export type CreateCharacterMutation = {
  createCharacter?:  {
    __typename: "Character",
    id: string,
    name: string,
    imageUrl?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateCharacterMutationVariables = {
  input: UpdateCharacterInput,
  condition?: ModelCharacterConditionInput | null,
};

export type UpdateCharacterMutation = {
  updateCharacter?:  {
    __typename: "Character",
    id: string,
    name: string,
    imageUrl?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteCharacterMutationVariables = {
  input: DeleteCharacterInput,
  condition?: ModelCharacterConditionInput | null,
};

export type DeleteCharacterMutation = {
  deleteCharacter?:  {
    __typename: "Character",
    id: string,
    name: string,
    imageUrl?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateCommentMutationVariables = {
  input: CreateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type CreateCommentMutation = {
  createComment?:  {
    __typename: "Comment",
    id: string,
    content: string,
    characterId: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateCommentMutationVariables = {
  input: UpdateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type UpdateCommentMutation = {
  updateComment?:  {
    __typename: "Comment",
    id: string,
    content: string,
    characterId: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteCommentMutationVariables = {
  input: DeleteCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type DeleteCommentMutation = {
  deleteComment?:  {
    __typename: "Comment",
    id: string,
    content: string,
    characterId: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateImageMutationVariables = {
  input: CreateImageInput,
  condition?: ModelImageConditionInput | null,
};

export type CreateImageMutation = {
  createImage?:  {
    __typename: "Image",
    id: string,
    url: string,
    uploadedBy?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateImageMutationVariables = {
  input: UpdateImageInput,
  condition?: ModelImageConditionInput | null,
};

export type UpdateImageMutation = {
  updateImage?:  {
    __typename: "Image",
    id: string,
    url: string,
    uploadedBy?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteImageMutationVariables = {
  input: DeleteImageInput,
  condition?: ModelImageConditionInput | null,
};

export type DeleteImageMutation = {
  deleteImage?:  {
    __typename: "Image",
    id: string,
    url: string,
    uploadedBy?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetCharacterQueryVariables = {
  id: string,
};

export type GetCharacterQuery = {
  getCharacter?:  {
    __typename: "Character",
    id: string,
    name: string,
    imageUrl?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListCharactersQueryVariables = {
  filter?: ModelCharacterFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCharactersQuery = {
  listCharacters?:  {
    __typename: "ModelCharacterConnection",
    items:  Array< {
      __typename: "Character",
      id: string,
      name: string,
      imageUrl?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCommentQueryVariables = {
  id: string,
};

export type GetCommentQuery = {
  getComment?:  {
    __typename: "Comment",
    id: string,
    content: string,
    characterId: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments?:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      content: string,
      characterId: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetImageQueryVariables = {
  id: string,
};

export type GetImageQuery = {
  getImage?:  {
    __typename: "Image",
    id: string,
    url: string,
    uploadedBy?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListImagesQueryVariables = {
  filter?: ModelImageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListImagesQuery = {
  listImages?:  {
    __typename: "ModelImageConnection",
    items:  Array< {
      __typename: "Image",
      id: string,
      url: string,
      uploadedBy?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateCharacterSubscriptionVariables = {
  filter?: ModelSubscriptionCharacterFilterInput | null,
  owner?: string | null,
};

export type OnCreateCharacterSubscription = {
  onCreateCharacter?:  {
    __typename: "Character",
    id: string,
    name: string,
    imageUrl?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateCharacterSubscriptionVariables = {
  filter?: ModelSubscriptionCharacterFilterInput | null,
  owner?: string | null,
};

export type OnUpdateCharacterSubscription = {
  onUpdateCharacter?:  {
    __typename: "Character",
    id: string,
    name: string,
    imageUrl?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteCharacterSubscriptionVariables = {
  filter?: ModelSubscriptionCharacterFilterInput | null,
  owner?: string | null,
};

export type OnDeleteCharacterSubscription = {
  onDeleteCharacter?:  {
    __typename: "Character",
    id: string,
    name: string,
    imageUrl?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
  owner?: string | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment?:  {
    __typename: "Comment",
    id: string,
    content: string,
    characterId: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
  owner?: string | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment?:  {
    __typename: "Comment",
    id: string,
    content: string,
    characterId: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
  owner?: string | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment?:  {
    __typename: "Comment",
    id: string,
    content: string,
    characterId: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateImageSubscriptionVariables = {
  filter?: ModelSubscriptionImageFilterInput | null,
  owner?: string | null,
};

export type OnCreateImageSubscription = {
  onCreateImage?:  {
    __typename: "Image",
    id: string,
    url: string,
    uploadedBy?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateImageSubscriptionVariables = {
  filter?: ModelSubscriptionImageFilterInput | null,
  owner?: string | null,
};

export type OnUpdateImageSubscription = {
  onUpdateImage?:  {
    __typename: "Image",
    id: string,
    url: string,
    uploadedBy?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteImageSubscriptionVariables = {
  filter?: ModelSubscriptionImageFilterInput | null,
  owner?: string | null,
};

export type OnDeleteImageSubscription = {
  onDeleteImage?:  {
    __typename: "Image",
    id: string,
    url: string,
    uploadedBy?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
