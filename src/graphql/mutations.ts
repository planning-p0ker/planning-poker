/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createRoom = /* GraphQL */ `mutation CreateRoom(
  $input: CreateRoomInput!
  $condition: ModelRoomConditionInput
) {
  createRoom(input: $input, condition: $condition) {
    id
    isOpened
    ttl
    participants {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateRoomMutationVariables,
  APITypes.CreateRoomMutation
>;
export const updateRoom = /* GraphQL */ `mutation UpdateRoom(
  $input: UpdateRoomInput!
  $condition: ModelRoomConditionInput
) {
  updateRoom(input: $input, condition: $condition) {
    id
    isOpened
    ttl
    participants {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateRoomMutationVariables,
  APITypes.UpdateRoomMutation
>;
export const deleteRoom = /* GraphQL */ `mutation DeleteRoom(
  $input: DeleteRoomInput!
  $condition: ModelRoomConditionInput
) {
  deleteRoom(input: $input, condition: $condition) {
    id
    isOpened
    ttl
    participants {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteRoomMutationVariables,
  APITypes.DeleteRoomMutation
>;
export const createParticipant = /* GraphQL */ `mutation CreateParticipant(
  $input: CreateParticipantInput!
  $condition: ModelParticipantConditionInput
) {
  createParticipant(input: $input, condition: $condition) {
    id
    username
    displayUserName
    point
    ttl
    roomParticipantsId
    room {
      id
      isOpened
      ttl
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateParticipantMutationVariables,
  APITypes.CreateParticipantMutation
>;
export const updateParticipant = /* GraphQL */ `mutation UpdateParticipant(
  $input: UpdateParticipantInput!
  $condition: ModelParticipantConditionInput
) {
  updateParticipant(input: $input, condition: $condition) {
    id
    username
    displayUserName
    point
    ttl
    roomParticipantsId
    room {
      id
      isOpened
      ttl
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateParticipantMutationVariables,
  APITypes.UpdateParticipantMutation
>;
export const deleteParticipant = /* GraphQL */ `mutation DeleteParticipant(
  $input: DeleteParticipantInput!
  $condition: ModelParticipantConditionInput
) {
  deleteParticipant(input: $input, condition: $condition) {
    id
    username
    displayUserName
    point
    ttl
    roomParticipantsId
    room {
      id
      isOpened
      ttl
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteParticipantMutationVariables,
  APITypes.DeleteParticipantMutation
>;
