import axios from "axios";

export default axios.create({
  baseURL: "<add url>",
  headers: {
    "Content-type": "application/json",
    "Accept": "application/json"
  }
});

