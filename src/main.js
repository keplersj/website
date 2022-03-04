import "@ungap/custom-elements";
import "./main.css";
import "./router";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});
