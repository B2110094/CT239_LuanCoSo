import createHttp from "./http.service";

class CategoryService {
  constructor() {
    this.http = createHttp("/api/category");
  }

  async getAllCategory() {
    return (await this.http.get("/")).data;
  }

  async getcategorytwithID(id) {
    return (await this.http.get(`/editCategory/${id}`)).data;
  }

  async create(data) {
    return (await this.http.post("/", data)).data;
  }

  async get(id) {
    return (await this.http.get(`/find/${id}`)).data;
  }

  async findcategorywithName(name) {
    return (await this.http.get(`/findCategory/${name}`)).data;
  }

  async update(id, data) {
    return (await this.http.put(`/${id}`, data)).data;
  }

  async delete(id) {
    return (await this.http.delete(`/${id}`)).data;
  }

  async getcategoryProduct(name) {
    return (await this.http.get(`/categoryBook/${name}`)).data;
  }
}

export default new CategoryService();
