/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCardInput = {
  id?: string | null,
  username: string,
  displayUserName: string,
  point: number,
  roomId: string,
  ttl: number,
};

export type ModelCardConditionInput = {
  username?: ModelStringInput | null,
  displayUserName?: ModelStringInput | null,
  point?: ModelIntInput | null,
  roomId?: ModelStringInput | null,
  ttl?: ModelIntInput | null,
  and?: Array< ModelCardConditionInput | null > | null,
  or?: Array< ModelCardConditionInput | null > | null,
  not?: ModelCardConditionInput | null,
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

export type Card = {
  __typename: "Card",
  id: string,
  username: string,
  displayUserName: string,
  point: number,
  roomId: string,
  ttl: number,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCardInput = {
  id: string,
  username?: string | null,
  displayUserName?: string | null,
  point?: number | null,
  roomId?: string | null,
  ttl?: number | null,
};

export type DeleteCardInput = {
  id: string,
};

export type CreateRoomInput = {
  id?: string | null,
  isOpened: boolean,
  ttl: number,
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

export type Room = {
  __typename: "Room",
  id: string,
  isOpened: boolean,
  ttl: number,
  participants?: ModelParticipantConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelParticipantConnection = {
  __typename: "ModelParticipantConnection",
  items:  Array<Participant >,
  nextToken?: string | null,
};

export type Participant = {
  __typename: "Participant",
  id: string,
  username: string,
  displayUserName: string,
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
  roomParticipantsId?: string | null,
};

export type ModelParticipantConditionInput = {
  username?: ModelStringInput | null,
  displayUserName?: ModelStringInput | null,
  and?: Array< ModelParticipantConditionInput | null > | null,
  or?: Array< ModelParticipantConditionInput | null > | null,
  not?: ModelParticipantConditionInput | null,
  roomParticipantsId?: ModelIDInput | null,
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
  roomParticipantsId?: string | null,
};

export type DeleteParticipantInput = {
  id: string,
};

export type ModelCardFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  displayUserName?: ModelStringInput | null,
  point?: ModelIntInput | null,
  roomId?: ModelStringInput | null,
  ttl?: ModelIntInput | null,
  and?: Array< ModelCardFilterInput | null > | null,
  or?: Array< ModelCardFilterInput | null > | null,
  not?: ModelCardFilterInput | null,
};

export type ModelCardConnection = {
  __typename: "ModelCardConnection",
  items:  Array<Card >,
  nextToken?: string | null,
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
  items:  Array<Room >,
  nextToken?: string | null,
};

export type ModelParticipantFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  displayUserName?: ModelStringInput | null,
  and?: Array< ModelParticipantFilterInput | null > | null,
  or?: Array< ModelParticipantFilterInput | null > | null,
  not?: ModelParticipantFilterInput | null,
  roomParticipantsId?: ModelIDInput | null,
};

export type CreateCardMutationVariables = {
  input: CreateCardInput,
  condition?: ModelCardConditionInput | null,
};

export type CreateCardMutation = {
  createCard?:  {
    __typename: "Card",
    id: string,
    username: string,
    displayUserName: string,
    point: number,
    roomId: string,
    ttl: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCardMutationVariables = {
  input: UpdateCardInput,
  condition?: ModelCardConditionInput | null,
};

export type UpdateCardMutation = {
  updateCard?:  {
    __typename: "Card",
    id: string,
    username: string,
    displayUserName: string,
    point: number,
    roomId: string,
    ttl: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCardMutationVariables = {
  input: DeleteCardInput,
  condition?: ModelCardConditionInput | null,
};

export type DeleteCardMutation = {
  deleteCard?:  {
    __typename: "Card",
    id: string,
    username: string,
    displayUserName: string,
    point: number,
    roomId: string,
    ttl: number,
    createdAt: string,
    updatedAt: string,
  } | null,
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
    ttl: number,
    participants?:  {
      __typename: "ModelParticipantConnection",
      items:  Array< {
        __typename: "Participant",
        id: string,
        username: string,
        displayUserName: string,
        createdAt: string,
        updatedAt: string,
        roomParticipantsId?: string | null,
      } >,
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
    ttl: number,
    participants?:  {
      __typename: "ModelParticipantConnection",
      items:  Array< {
        __typename: "Participant",
        id: string,
        username: string,
        displayUserName: string,
        createdAt: string,
        updatedAt: string,
        roomParticipantsId?: string | null,
      } >,
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
    ttl: number,
    participants?:  {
      __typename: "ModelParticipantConnection",
      items:  Array< {
        __typename: "Participant",
        id: string,
        username: string,
        displayUserName: string,
        createdAt: string,
        updatedAt: string,
        roomParticipantsId?: string | null,
      } >,
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
    createdAt: string,
    updatedAt: string,
    roomParticipantsId?: string | null,
  } | null,
};

export type GetCardQueryVariables = {
  id: string,
};

export type GetCardQuery = {
  getCard?:  {
    __typename: "Card",
    id: string,
    username: string,
    displayUserName: string,
    point: number,
    roomId: string,
    ttl: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCardsQueryVariables = {
  filter?: ModelCardFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCardsQuery = {
  listCards?:  {
    __typename: "ModelCardConnection",
    items:  Array< {
      __typename: "Card",
      id: string,
      username: string,
      displayUserName: string,
      point: number,
      roomId: string,
      ttl: number,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
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
    ttl: number,
    participants?:  {
      __typename: "ModelParticipantConnection",
      items:  Array< {
        __typename: "Participant",
        id: string,
        username: string,
        displayUserName: string,
        createdAt: string,
        updatedAt: string,
        roomParticipantsId?: string | null,
      } >,
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
      ttl: number,
      participants?:  {
        __typename: "ModelParticipantConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } >,
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
      createdAt: string,
      updatedAt: string,
      roomParticipantsId?: string | null,
    } >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateCardByRoomIdSubscriptionVariables = {
  roomId?: string | null,
};

export type OnCreateCardByRoomIdSubscription = {
  onCreateCardByRoomId?:  {
    __typename: "Card",
    id: string,
    username: string,
    displayUserName: string,
    point: number,
    roomId: string,
    ttl: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCardByRoomIdSubscriptionVariables = {
  roomId?: string | null,
};

export type OnUpdateCardByRoomIdSubscription = {
  onUpdateCardByRoomId?:  {
    __typename: "Card",
    id: string,
    username: string,
    displayUserName: string,
    point: number,
    roomId: string,
    ttl: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCardByRoomIdSubscriptionVariables = {
  roomId?: string | null,
};

export type OnDeleteCardByRoomIdSubscription = {
  onDeleteCardByRoomId?:  {
    __typename: "Card",
    id: string,
    username: string,
    displayUserName: string,
    point: number,
    roomId: string,
    ttl: number,
    createdAt: string,
    updatedAt: string,
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
    ttl: number,
    participants?:  {
      __typename: "ModelParticipantConnection",
      items:  Array< {
        __typename: "Participant",
        id: string,
        username: string,
        displayUserName: string,
        createdAt: string,
        updatedAt: string,
        roomParticipantsId?: string | null,
      } >,
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
    createdAt: string,
    updatedAt: string,
    roomParticipantsId?: string | null,
  } | null,
};
