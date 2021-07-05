using senai.spmedicalgroup.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedicalgroup.webApi.Interfaces
{
    interface IConsultaRepository
    {
        /// <summary>
        /// Agenda uma nova consulta
        /// </summary>
        /// <param name="novaConsulta">objeto com os dados da nova consulta</param>
        void Cadastrar(Consultum novaConsulta);

        /// <summary>
        /// Lista as consultas do paciente logado
        /// </summary>
        /// <param name="id">id do usuario que tem as consultas</param>
        /// <returns>lista as consultas</returns>
        List<Consultum> ListarMinhas(int id);

        Consultum BuscarPorId(int id);

        /// <summary>
        /// Altera o status de uma consulta
        /// </summary>
        /// <param name="id">ID da consulta que sera alterada</param>
        /// <param name="status">Parametro que atualiza a situação da presença para 1- confirmada 0-recusada 3- nao confirmada</param>
        void StatusConsulta(int id, string status);
      

        void Atualizar(int id, Consultum consultaAtualizada);

        void InserirDescricao(int id, Consultum descricao, int idUsuario);


        void Deletar(int id);

        List<Consultum> Listar();

    }
}
