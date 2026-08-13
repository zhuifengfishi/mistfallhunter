const providerScriptUrl =
  "https://pl30827412.effectivecpmnetwork.com/ceb9497315da621e307643d9a8ae153f/invoke.js";
const providerContainerId = "container-ceb9497315da621e307643d9a8ae153f";

export function AdvertisementScript() {
  return <script async data-cfasync="false" src={providerScriptUrl} />;
}

export function AdvertisementSlot() {
  return <div id={providerContainerId} />;
}
