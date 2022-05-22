import React, { useCallback, useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { CreateParticipantInput, CreateParticipantMutation, DeleteParticipantInput, Participant, Room } from "../API";
import { updateRoom, createParticipant, deleteParticipant } from "../graphql/mutations";
import { User } from "./useUser";
import { GraphQLResult } from "@aws-amplify/api-graphql";

export const useParticipant = (user: User | null, room: Room | null) => {
  const [isReady, setReady] = useState(false);
  const [myParicipant, setMyParicipant] = useState<Participant | null>(null);
  const [registered, setRegisterd] = useState(false);

  useEffect(() => {
    if (!!room && !!user) {
      setReady(true);
    }
  }, [room, user])

  const registerPaticipant = useCallback(async () => {
    if (isReady) {
      const result = await API.graphql(
        graphqlOperation(createParticipant, {
          input: {
            roomParticipantsId: room!.id,
            username: user!.username,
            displayUserName: user!.displayName,
          } as CreateParticipantInput,
        })
      ) as GraphQLResult<CreateParticipantMutation>;

      const createParticipantResult = result.data?.createParticipant;
      if (createParticipantResult) {
        setMyParicipant(createParticipantResult);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const unregisterPaticipant = useCallback(async () => {
    if (myParicipant) {
      API.graphql(
        graphqlOperation(deleteParticipant, {
          input: {
            id: myParicipant.id
          } as DeleteParticipantInput,
        })
      );
    }
  }, [myParicipant]);

  useEffect(() => {
    if (isReady && !myParicipant && !room?.participants?.items.some(i => i.username === user?.username)) {
      registerPaticipant();
    }

    return () => {
      unregisterPaticipant();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);
}
