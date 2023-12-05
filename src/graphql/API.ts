/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateRoomInput = {
  id?: string | null,
  isOpened: boolean,
  ttl?: number | null,
};

export type ModelRoomConditionInput = {
  isOpened?: ModelBooleanInput | null,
  ttl?: ModelIntInput | null,
  and?: Array< ModelRoomConditionInput | null > | null,
  or?: Array< ModelRoomConditionInput | null > | null,
  not?: ModelRoomConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
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


export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Room = {
  __typename: "Room",
  id: string,
  isOpened: boolean,
  ttl?: number | null,
  participants?: ModelParticipantConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelParticipantConnection = {
  __typename: "ModelParticipantConnection",
  items:  Array<Participant | null >,
  nextToken?: string | null,
};

export type Participant = {
  __typename: "Participant",
  id: string,
  username: string,
  displayUserName: string,
  point?: number | null,
  ttl?: number | null,
  createdAt: string,
  updatedAt: string,
  roomParticipantsId?: string | null,
};

export type UpdateRoomInput = {
  id: string,
  isOpened?: boolean | null,
  ttl?: number | null,
};

export type DeleteRoomInput = {
  id: string,
};

export type CreateParticipantInput = {
  id?: string | null,
  username: string,
  displayUserName: string,
  point?: number | null,
  ttl?: number | null,
  roomParticipantsId?: string | null,
};

export type ModelParticipantConditionInput = {
  username?: ModelStringInput | null,
  displayUserName?: ModelStringInput | null,
  point?: ModelIntInput | null,
  ttl?: ModelIntInput | null,
  and?: Array< ModelParticipantConditionInput | null > | null,
  or?: Array< ModelParticipantConditionInput | null > | null,
  not?: ModelParticipantConditionInput | null,
  roomParticipantsId?: ModelIDInput | null,
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

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
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

export type UpdateParticipantInput = {
  id: string,
  username?: string | null,
  displayUserName?: string | null,
  point?: number | null,
  ttl?: number | null,
  roomParticipantsId?: string | null,
};

export type DeleteParticipantInput = {
  id: string,
};

export type ModelRoomFilterInput = {
  id?: ModelIDInput | null,
  isOpened?: ModelBooleanInput | null,
  ttl?: ModelIntInput | null,
  and?: Array< ModelRoomFilterInput | null > | null,
  or?: Array< ModelRoomFilterInput | null > | null,
  not?: ModelRoomFilterInput | null,
};

export type ModelRoomConnection = {
  __typename: "ModelRoomConnection",
  items:  Array<Room | null >,
  nextToken?: string | null,
};

export type ModelParticipantFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  displayUserName?: ModelStringInput | null,
  point?: ModelIntInput | null,
  ttl?: ModelIntInput | null,
  and?: Array< ModelParticipantFilterInput | null > | null,
  or?: Array< ModelParticipantFilterInput | null > | null,
  not?: ModelParticipantFilterInput | null,
  roomParticipantsId?: ModelIDInput | null,
};

export type ModelSubscriptionRoomFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  isOpened?: ModelSubscriptionBooleanInput | null,
  ttl?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionRoomFilterInput | null > | null,
  or?: Array< ModelSubscriptionRoomFilterInput | null > | null,
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

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionParticipantFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  username?: ModelSubscriptionStringInput | null,
  displayUserName?: ModelSubscriptionStringInput | null,
  point?: ModelSubscriptionIntInput | null,
  ttl?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionParticipantFilterInput | null > | null,
  or?: Array< ModelSubscriptionParticipantFilterInput | null > | null,
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

export type CreateRoomMutationVariables = {
  input: CreateRoomInput,
  condition?: ModelRoomConditionInput | null,
};

export type CreateRoomMutation = {
  createRoom?:  {
    __typename: "Room",
    id: string,
    isOpened: boolean,
    ttl?: number | null,
    participants?:  {
      __typename: "ModelParticipantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRoomMutationVariables = {
  input: UpdateRoomInput,
  condition?: ModelRoomConditionInput | null,
};

export type UpdateRoomMutation = {
  updateRoom?:  {
    __typename: "Room",
    id: string,
    isOpened: boolean,
    ttl?: number | null,
    participants?:  {
      __typename: "ModelParticipantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRoomMutationVariables = {
  input: DeleteRoomInput,
  condition?: ModelRoomConditionInput | null,
};

export type DeleteRoomMutation = {
  deleteRoom?:  {
    __typename: "Room",
    id: string,
    isOpened: boolean,
    ttl?: number | null,
    participants?:  {
      __typename: "ModelParticipantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateParticipantMutationVariables = {
  input: CreateParticipantInput,
  condition?: ModelParticipantConditionInput | null,
};

export type CreateParticipantMutation = {
  createParticipant?:  {
    __typename: "Participant",
    id: string,
    username: string,
    displayUserName: string,
    point?: number | null,
    ttl?: number | null,
    createdAt: string,
    updatedAt: string,
    roomParticipantsId?: string | null,
  } | null,
};

export type UpdateParticipantMutationVariables = {
  input: UpdateParticipantInput,
  condition?: ModelParticipantConditionInput | null,
};

export type UpdateParticipantMutation = {
  updateParticipant?:  {
    __typename: "Participant",
    id: string,
    username: string,
    displayUserName: string,
    point?: number | null,
    ttl?: number | null,
    createdAt: string,
    updatedAt: string,
    roomParticipantsId?: string | null,
  } | null,
};

export type DeleteParticipantMutationVariables = {
  input: DeleteParticipantInput,
  condition?: ModelParticipantConditionInput | null,
};

export type DeleteParticipantMutation = {
  deleteParticipant?:  {
    __typename: "Participant",
    id: string,
    username: string,
    displayUserName: string,
    point?: number | null,
    ttl?: number | null,
    createdAt: string,
    updatedAt: string,
    roomParticipantsId?: string | null,
  } | null,
};

export type GetRoomQueryVariables = {
  id: string,
};

export type GetRoomQuery = {
  getRoom?:  {
    __typename: "Room",
    id: string,
    isOpened: boolean,
    ttl?: number | null,
    participants?:  {
      __typename: "ModelParticipantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRoomsQueryVariables = {
  filter?: ModelRoomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRoomsQuery = {
  listRooms?:  {
    __typename: "ModelRoomConnection",
    items:  Array< {
      __typename: "Room",
      id: string,
      isOpened: boolean,
      ttl?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetParticipantQueryVariables = {
  id: string,
};

export type GetParticipantQuery = {
  getParticipant?:  {
    __typename: "Participant",
    id: string,
    username: string,
    displayUserName: string,
    point?: number | null,
    ttl?: number | null,
    createdAt: string,
    updatedAt: string,
    roomParticipantsId?: string | null,
  } | null,
};

export type ListParticipantsQueryVariables = {
  filter?: ModelParticipantFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListParticipantsQuery = {
  listParticipants?:  {
    __typename: "ModelParticipantConnection",
    items:  Array< {
      __typename: "Participant",
      id: string,
      username: string,
      displayUserName: string,
      point?: number | null,
      ttl?: number | null,
      createdAt: string,
      updatedAt: string,
      roomParticipantsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnUpdateRoomByIdSubscriptionVariables = {
  id: string,
};

export type OnUpdateRoomByIdSubscription = {
  onUpdateRoomById?:  {
    __typename: "Room",
    id: string,
    isOpened: boolean,
    ttl?: number | null,
    participants?:  {
      __typename: "ModelParticipantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateParticipantByRoomIdSubscriptionVariables = {
  roomParticipantsId?: string | null,
};

export type OnCreateParticipantByRoomIdSubscription = {
  onCreateParticipantByRoomId?:  {
    __typename: "Participant",
    id: string,
    username: string,
    displayUserName: string,
    point?: number | null,
    ttl?: number | null,
    createdAt: string,
    updatedAt: string,
    roomParticipantsId?: string | null,
  } | null,
};

export type OnDeleteParticipantByRoomIdSubscriptionVariables = {
  roomParticipantsId?: string | null,
};

export type OnDeleteParticipantByRoomIdSubscription = {
  onDeleteParticipantByRoomId?:  {
    __typename: "Participant",
    id: string,
    username: string,
    displayUserName: string,
    point?: number | null,
    ttl?: number | null,
    createdAt: string,
    updatedAt: string,
    roomParticipantsId?: string | null,
  } | null,
};

export type OnUpdateParticipantByRoomIdSubscriptionVariables = {
  roomParticipantsId?: string | null,
};

export type OnUpdateParticipantByRoomIdSubscription = {
  onUpdateParticipantByRoomId?:  {
    __typename: "Participant",
    id: string,
    username: string,
    displayUserName: string,
    point?: number | null,
    ttl?: number | null,
    createdAt: string,
    updatedAt: string,
    roomParticipantsId?: string | null,
  } | null,
};

export type OnCreateRoomSubscriptionVariables = {
  filter?: ModelSubscriptionRoomFilterInput | null,
};

export type OnCreateRoomSubscription = {
  onCreateRoom?:  {
    __typename: "Room",
    id: string,
    isOpened: boolean,
    ttl?: number | null,
    participants?:  {
      __typename: "ModelParticipantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRoomSubscriptionVariables = {
  filter?: ModelSubscriptionRoomFilterInput | null,
};

export type OnUpdateRoomSubscription = {
  onUpdateRoom?:  {
    __typename: "Room",
    id: string,
    isOpened: boolean,
    ttl?: number | null,
    participants?:  {
      __typename: "ModelParticipantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRoomSubscriptionVariables = {
  filter?: ModelSubscriptionRoomFilterInput | null,
};

export type OnDeleteRoomSubscription = {
  onDeleteRoom?:  {
    __typename: "Room",
    id: string,
    isOpened: boolean,
    ttl?: number | null,
    participants?:  {
      __typename: "ModelParticipantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateParticipantSubscriptionVariables = {
  filter?: ModelSubscriptionParticipantFilterInput | null,
};

export type OnCreateParticipantSubscription = {
  onCreateParticipant?:  {
    __typename: "Participant",
    id: string,
    username: string,
    displayUserName: string,
    point?: number | null,
    ttl?: number | null,
    createdAt: string,
    updatedAt: string,
    roomParticipantsId?: string | null,
  } | null,
};

export type OnUpdateParticipantSubscriptionVariables = {
  filter?: ModelSubscriptionParticipantFilterInput | null,
};

export type OnUpdateParticipantSubscription = {
  onUpdateParticipant?:  {
    __typename: "Participant",
    id: string,
    username: string,
    displayUserName: string,
    point?: number | null,
    ttl?: number | null,
    createdAt: string,
    updatedAt: string,
    roomParticipantsId?: string | null,
  } | null,
};

export type OnDeleteParticipantSubscriptionVariables = {
  filter?: ModelSubscriptionParticipantFilterInput | null,
};

export type OnDeleteParticipantSubscription = {
  onDeleteParticipant?:  {
    __typename: "Participant",
    id: string,
    username: string,
    displayUserName: string,
    point?: number | null,
    ttl?: number | null,
    createdAt: string,
    updatedAt: string,
    roomParticipantsId?: string | null,
  } | null,
};
