/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getRoom = /* GraphQL */ `query GetRoom($id: ID!) {
  getRoom(id: $id) {
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
` as GeneratedQuery<APITypes.GetRoomQueryVariables, APITypes.GetRoomQuery>;
export const listRooms = /* GraphQL */ `query ListRooms(
  $filter: ModelRoomFilterInput
  $limit: Int
  $nextToken: String
) {
  listRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      isOpened
      ttl
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListRoomsQueryVariables, APITypes.ListRoomsQuery>;
export const getParticipant = /* GraphQL */ `query GetParticipant($id: ID!) {
  getParticipant(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetParticipantQueryVariables,
  APITypes.GetParticipantQuery
>;
export const listParticipants = /* GraphQL */ `query ListParticipants(
  $filter: ModelParticipantFilterInput
  $limit: Int
  $nextToken: String
) {
  listParticipants(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      displayUserName
      point
      ttl
      roomParticipantsId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListParticipantsQueryVariables,
  APITypes.ListParticipantsQuery
>;
