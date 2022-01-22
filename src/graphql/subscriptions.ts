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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCard = /* GraphQL */ `
  subscription OnCreateCard {
    onCreateCard {
      id
      username
      displayUserName
      point
      roomId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCard = /* GraphQL */ `
  subscription OnUpdateCard {
    onUpdateCard {
      id
      username
      displayUserName
      point
      roomId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCard = /* GraphQL */ `
  subscription OnDeleteCard {
    onDeleteCard {
      id
      username
      displayUserName
      point
      roomId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom {
    onCreateRoom {
      id
      isOpened
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateRoom = /* GraphQL */ `
  subscription OnUpdateRoom {
    onUpdateRoom {
      id
      isOpened
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteRoom = /* GraphQL */ `
  subscription OnDeleteRoom {
    onDeleteRoom {
      id
      isOpened
      createdAt
      updatedAt
    }
  }
`;
