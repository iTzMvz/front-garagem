import axios from "axios";
export default class AcessoriosApi {
  async buscarTodosOsAcessorios() {
    const { data } = await axios.get("/acessorios/");
    return data.results;
  }
  async adicionarAcessorio(acessorios) {
    const { data } = await axios.post("/acessorios/", acessorios);
    return data.results;
  }
  async atualizarAcessorio(acessorios) {
    const { data } = await axios.put(`/acessorios/${acessorios.id}/`, acessorios);
    return data.results;
  }
  async excluirAcessorio(id) {
    const { data } = await axios.delete(`/acessorios/${id}/`);
    return data.results;
  }
}