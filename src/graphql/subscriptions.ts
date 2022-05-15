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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCard = /* GraphQL */ `
  subscription OnCreateCard($roomId: String) {
    onCreateCard(roomId: $roomId) {
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
export const onDeleteCard = /* GraphQL */ `
  subscription OnDeleteCard($roomId: String) {
    onDeleteCard(roomId: $roomId) {
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
