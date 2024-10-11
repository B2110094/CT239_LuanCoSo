import createHttp from "./http.service";

class AuthorService {
  constructor() {
    this.http = createHttp("/api/author");
  }

  async getAllAuthor() {
    return (await this.http.get("/")).data;
  }

  async getauthorwithID(id) {
    return (await this.http.get(`/editAuthor/${id}`)).data;
  }

  async create(data) {
    return (await this.http.post("/", data)).data;
  }

  async get(id) {
    return (await this.http.get(`/find/${id}`)).data;
  }

  async findauthorwithName(name) {
    return (await this.http.get(`/findAuthor/${name}`)).data;
  }

  async update(id, data) {
    return (await this.http.put(`/${id}`, data)).data;
  }

  async delete(id) {
    return (await this.http.delete(`/${id}`)).data;
  }

  async getauthor(name) {
    return (await this.http.get(`/authorBook/${name}`)).data;
  }
}

export default new AuthorService();
