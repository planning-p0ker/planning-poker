/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCardByRoomId = /* GraphQL */ `
  subscription OnCreateCardByRoomId($roomId: String) {
    onCreateCardByRoomId(roomId: $roomId) {
      id
      username
      displayUserName
      point
      roomId
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCardByRoomId = /* GraphQL */ `
  subscription OnUpdateCardByRoomId($roomId: String) {
    onUpdateCardByRoomId(roomId: $roomId) {
      id
      username
      displayUserName
      point
      roomId
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCardByRoomId = /* GraphQL */ `
  subscription OnDeleteCardByRoomId($roomId: String) {
    onDeleteCardByRoomId(roomId: $roomId) {
      id
      username
      displayUserName
      point
      roomId
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateRoomById = /* GraphQL */ `
  subscription OnUpdateRoomById($id: ID!) {
    onUpdateRoomById(id: $id) {
      id
      isOpened
      ttl
      participants {
        items {
          id
          username
          displayUserName
          point
          ttl
          createdAt
          updatedAt
          roomParticipantsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateParticipantByRoomId = /* GraphQL */ `
  subscription OnCreateParticipantByRoomId($roomParticipantsId: String) {
    onCreateParticipantByRoomId(roomParticipantsId: $roomParticipantsId) {
      id
      username
      displayUserName
      point
      ttl
      createdAt
      updatedAt
      roomParticipantsId
    }
  }
`;
export const onDeleteParticipantByRoomId = /* GraphQL */ `
  subscription OnDeleteParticipantByRoomId($roomParticipantsId: String) {
    onDeleteParticipantByRoomId(roomParticipantsId: $roomParticipantsId) {
      id
      username
      displayUserName
      point
      ttl
      createdAt
      updatedAt
      roomParticipantsId
    }
  }
`;
