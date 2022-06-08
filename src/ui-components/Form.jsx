/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Text } from "@aws-amplify/ui-react";
import Input from "./Input";
export default function Form(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="8px"
      direction="column"
      position="relative"
      padding="0px 0px 0px 0px"
      {...rest}
      {...getOverrideProps(overrides, "Form")}
    >
      <Text
        fontFamily="Inter"
        fontSize="12px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        lineHeight="14.0625px"
        textAlign="left"
        display="flex"
        direction="column"
        justifyContent="flex-start"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Join room"
        {...getOverrideProps(overrides, "Join room")}
      ></Text>
      <Input
        display="flex"
        gap="10px"
        direction="row"
        width="fit-content"
        alignItems="flex-start"
        shrink="0"
        position="relative"
        border="1px SOLID rgba(189,189,189,1)"
        borderRadius="8px"
        padding="9px 9px 9px 9px"
        backgroundColor="rgba(255,255,255,1)"
        {...getOverrideProps(overrides, "Input")}
      ></Input>
    </Flex>
  );
}
