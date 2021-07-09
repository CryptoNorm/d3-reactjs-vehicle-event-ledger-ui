import http from "./http-common";

class VehicleEventDataService {


  getAll() {
    return http.get("/vehicleEvents");
  }

  create(data) {
    return http.post("/vehicleEvents", data);
  } 

  findByVin(vin) {
    return http.get(`/vehicleEvents/${vin}`);
  }
}

export default new VehicleEventDataService();