import Cliente from '../Model/ClienteModel';

export const getClientesLista = async () => {
  return Cliente.listarClientes();
}
