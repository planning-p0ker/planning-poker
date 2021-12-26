import React, { useReducer } from "react";

type ActionType = { type: "create" | "clear" }
const reducer = (state: number | null, action: ActionType) => {
  switch (action.type) {
    case "create":
      return state;
    case "clear":
      return null;
  }
}
