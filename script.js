import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 200,
  duration: '300s',
  rps: 2000
};

export default function() {
  let id = Math.floor(Math.random() * (10000000 - 1) + 1);
  let itemId = Math.floor(Math.random() * (100000000 - 1) + 1);
  // http.get(`http://localhost:3002/restaurants/${id}`);
  http.get(`http://localhost:3002/restaurants/${id}/menu_items/${itemId}`);
  // sleep(1);
};
