import http from "./http-common";

class VehicleEventDataService {


  getAll() {
    return http.get("/topics/iot-events");
  }

  create(data) {
    return http.post("/topics/iot-events", data);
  } 

  findByVin(vin) {
    return http.get(`/vehicleEvents/${vin}`);
  }
}

export default new VehicleEventDataService();