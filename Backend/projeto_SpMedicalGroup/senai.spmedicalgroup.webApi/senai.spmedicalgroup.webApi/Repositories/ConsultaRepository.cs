using Microsoft.EntityFrameworkCore;
using senai.spmedicalgroup.webApi.Contexts;
using senai.spmedicalgroup.webApi.Domains;
using senai.spmedicalgroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedicalgroup.webApi.Repositories
{
   
        public class ConsultaRepository : IConsultaRepository
        {
            SpMedicalContext ctx = new SpMedicalContext();

            public void Atualizar(int id, Consultum consultaAtualizada)
            {
                throw new NotImplementedException();
            }

            public Consultum BuscarPorId(int id)
            {
            return ctx.Consulta.FirstOrDefault(x => x.IdConsulta == id);
        }

            public void Cadastrar(Consultum novaConsulta)
            {
            // Outra forma, caso os dados da inscrição (novaa consulta) sejam enviados pelo usuario
            // independente do status que o usuario tente cadastrar ao se inscrever
            // por padrão, a situação será sempre "Não confirmada"
            //novaConsulta.IdSituacaoNavigation.Situacao1 = "Não confirmada";
            
            // adiciona uma nova presença
            ctx.Consulta.Add(novaConsulta);

            // Salva as informações no banco de dados
                ctx.SaveChanges();

            }

            public void Deletar(int id)
            {
            ctx.Consulta.Remove(BuscarPorId(id));

            ctx.SaveChanges();
        }

            public List<Consultum> ListarMinhas(int id)
            {
            Paciente pacienteBuscado = ctx.Pacientes.FirstOrDefault(x => x.IdUsuario == id);

            Medico medicoBuscado = ctx.Medicos.FirstOrDefault(x => x.IdUsuario == id);
            if (pacienteBuscado != null)
            {
                return ctx.Consulta.Where(x => x.IdPaciente == pacienteBuscado.IdPaciente)
                    .Include(x => x.IdPacienteNavigation)
                    .Include(x => x.IdMedicoNavigation)
                    .Include(x => x.IdSituacaoNavigation)
                    .Include(x => x.IdMedicoNavigation.IdEspecialidadeNavigation)
                    .Select(x => new Consultum
                    {
                        IdConsulta = x.IdConsulta,
                        IdMedicoNavigation = x.IdMedicoNavigation,
                        IdPacienteNavigation = x.IdPacienteNavigation,
                        IdSituacaoNavigation = x.IdSituacaoNavigation,
                        Descricao = x.Descricao,
                        DataConsulta = x.DataConsulta
                    })
                    .ToList();
            }

            if (medicoBuscado != null)
            {
                return ctx.Consulta.Include(x => x.IdMedicoNavigation).Where(x => x.IdMedico == medicoBuscado.IdMedico)
                    .Include(x => x.IdPacienteNavigation)
                    .Include(x => x.IdMedicoNavigation)
                    .Include(x => x.IdSituacaoNavigation)
                    .Include(x => x.IdMedicoNavigation.IdEspecialidadeNavigation)
                    .Select(x => new Consultum
                    {
                        IdConsulta = x.IdConsulta,
                        IdMedicoNavigation = x.IdMedicoNavigation,
                        IdPacienteNavigation = x.IdPacienteNavigation,
                        IdSituacaoNavigation = x.IdSituacaoNavigation,
                        Descricao = x.Descricao,
                        DataConsulta = x.DataConsulta
                        
                    })
                    .ToList();
            }

            return null;
        
    }

        public void StatusConsulta(int id, string status)
        {
            Consultum consultabuscada = ctx.Consulta
                .Include(c => c.IdPacienteNavigation)
                .Include(c => c.IdMedicoNavigation)
                .FirstOrDefault(c => c.IdConsulta == id);

            switch (status)
            {
                case "1":
                    consultabuscada.IdSituacao = 1;
                    break;
                case "2":
                    consultabuscada.IdSituacao = 2;
                    break;

                case "3":
                    consultabuscada.IdSituacao = 3;
                    break;
                default:
                    consultabuscada.IdSituacao = consultabuscada.IdSituacao;
                    break;
            }
            ctx.    Consulta.Update(consultabuscada);
            ctx.SaveChanges();
        }


        // Método para inserir ou editar uma descrição nas consultas
        public void InserirDescricao(int id, Consultum descricao, int idUsuario)
        {
           Consultum consultaBuscada = ctx.Consulta.FirstOrDefault(x => x.IdConsulta == id);

           // Medico medicoBuscado = ctx.Medicos.FirstOrDefault(x => x.IdUsuario == idUsuario);

            //if (descricao.Descricao != null && consultaBuscada.IdMedico == medicoBuscado.IdMedico)
            //{
            //    consultaBuscada.Descricao = descricao.Descricao;
           // }
           if(descricao.Descricao != null)
            {
                consultaBuscada.Descricao = descricao.Descricao;
            }


            ctx.Consulta.Update(consultaBuscada);

            ctx.SaveChanges();
        }

        public List<Consultum> Listar()
        {
            return ctx.Consulta
                .Include(x => x.IdMedicoNavigation)
                .Include(x => x.IdMedicoNavigation.IdEspecialidadeNavigation)
                .Select(x => new Consultum
                {
                    IdConsulta = x.IdConsulta,
                    IdMedicoNavigation = x.IdMedicoNavigation,
                    IdPacienteNavigation = x.IdPacienteNavigation,
                    IdSituacaoNavigation = x.IdSituacaoNavigation,
                    Descricao = x.Descricao,
                    DataConsulta = x.DataConsulta
                })
                .ToList();
        }
    }
    }
