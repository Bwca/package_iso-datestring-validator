import moment from "moment";
const { Worker, isMainThread, parentPort } = require("worker_threads");

function pad(numberStr, max) {
  return numberStr.length < max ? pad("0" + numberStr, max) : numberStr;
}

parentPort.postMessage("spawned");