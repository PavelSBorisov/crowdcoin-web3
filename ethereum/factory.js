import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xBbA9ACb4565a39BB97b7326e39aB1bF2fEe5FeDC"
);

export default instance;