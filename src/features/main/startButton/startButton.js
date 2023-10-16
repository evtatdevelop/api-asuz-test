import React from "react";
import './startButton.scss';
import { useDispatch } from "react-redux";
import { remoteUser, addLog, setTesting } from "../mainpageSlice";

export const StartButton = () => {
  const dispatch = useDispatch();
  const test = () => {
    dispatch(addLog(' --------------------------- '));
    dispatch(addLog('Start testing'));
    dispatch(setTesting('start'));
    dispatch(remoteUser());
  };
  return (
    <button type="button" onClick={ test } className="btnStart">Test</button> 
  )
}

