/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onUpdateRoomById = /* GraphQL */ `subscription OnUpdateRoomById($id: ID!) {
  onUpdateRoomById(id: $id) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateRoomByIdSubscriptionVariables,
  APITypes.OnUpdateRoomByIdSubscription
>;
export const onCreateParticipantByRoomId = /* GraphQL */ `subscription OnCreateParticipantByRoomId($roomParticipantsId: String) {
  onCreateParticipantByRoomId(roomParticipantsId: $roomParticipantsId) {
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
` as GeneratedSubscription<
  APITypes.OnCreateParticipantByRoomIdSubscriptionVariables,
  APITypes.OnCreateParticipantByRoomIdSubscription
>;
export const onDeleteParticipantByRoomId = /* GraphQL */ `subscription OnDeleteParticipantByRoomId($roomParticipantsId: String) {
  onDeleteParticipantByRoomId(roomParticipantsId: $roomParticipantsId) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteParticipantByRoomIdSubscriptionVariables,
  APITypes.OnDeleteParticipantByRoomIdSubscription
>;
export const onUpdateParticipantByRoomId = /* GraphQL */ `subscription OnUpdateParticipantByRoomId($roomParticipantsId: String) {
  onUpdateParticipantByRoomId(roomParticipantsId: $roomParticipantsId) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateParticipantByRoomIdSubscriptionVariables,
  APITypes.OnUpdateParticipantByRoomIdSubscription
>;
export const onCreateRoom = /* GraphQL */ `subscription OnCreateRoom($filter: ModelSubscriptionRoomFilterInput) {
  onCreateRoom(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateRoomSubscriptionVariables,
  APITypes.OnCreateRoomSubscription
>;
export const onUpdateRoom = /* GraphQL */ `subscription OnUpdateRoom($filter: ModelSubscriptionRoomFilterInput) {
  onUpdateRoom(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateRoomSubscriptionVariables,
  APITypes.OnUpdateRoomSubscription
>;
export const onDeleteRoom = /* GraphQL */ `subscription OnDeleteRoom($filter: ModelSubscriptionRoomFilterInput) {
  onDeleteRoom(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteRoomSubscriptionVariables,
  APITypes.OnDeleteRoomSubscription
>;
export const onCreateParticipant = /* GraphQL */ `subscription OnCreateParticipant(
  $filter: ModelSubscriptionParticipantFilterInput
) {
  onCreateParticipant(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateParticipantSubscriptionVariables,
  APITypes.OnCreateParticipantSubscription
>;
export const onUpdateParticipant = /* GraphQL */ `subscription OnUpdateParticipant(
  $filter: ModelSubscriptionParticipantFilterInput
) {
  onUpdateParticipant(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateParticipantSubscriptionVariables,
  APITypes.OnUpdateParticipantSubscription
>;
export const onDeleteParticipant = /* GraphQL */ `subscription OnDeleteParticipant(
  $filter: ModelSubscriptionParticipantFilterInput
) {
  onDeleteParticipant(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteParticipantSubscriptionVariables,
  APITypes.OnDeleteParticipantSubscription
>;
