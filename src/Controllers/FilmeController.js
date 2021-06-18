import Filme from '../Model/FilmeModel';

export const getFilmeLista = async () => {
  return Filme.listarFilmes();
}