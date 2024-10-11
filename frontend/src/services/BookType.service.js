import createHttp from "./http.service";

class BookTypeService {
  constructor() {
    this.http = createHttp("/api/booktype");
  }

  async getAllBookType() {
    return (await this.http.get("/")).data;
  }

  async getbooktypewithID(id) {
    return (await this.http.get(`/editbooktype/${id}`)).data;
  }

  async create(data) {
    return (await this.http.post("/", data)).data;
  }

  async get(id) {
    return (await this.http.get(`/find/${id}`)).data;
  }

  async findbooktypewithName(name) {
    return (await this.http.get(`/findbooktype/${name}`)).data;
  }

  async update(id, data) {
    return (await this.http.put(`/${id}`, data)).data;
  }

  async delete(id) {
    return (await this.http.delete(`/${id}`)).data;
  }

  async getbooktype(name) {
    return (await this.http.get(`/booktype/${name}`)).data;
  }
}

export default new BookTypeService();
