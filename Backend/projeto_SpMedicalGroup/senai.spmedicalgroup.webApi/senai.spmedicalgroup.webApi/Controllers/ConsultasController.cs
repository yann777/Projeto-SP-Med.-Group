using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai.spmedicalgroup.webApi.Domains;
using senai.spmedicalgroup.webApi.Interfaces;
using senai.spmedicalgroup.webApi.Repositories;
using senai.spmedicalgroup.webApi.ViewModel;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedicalgroup.webApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultasController : ControllerBase
    {
        private IConsultaRepository _consultaRepository { get; set; }

        /// <summary>
        /// Instancia o objeto _habilidadeRepository para que haja a referência aos métodos do repositório
        /// </summary>
        public ConsultasController()
        {
            _consultaRepository = new ConsultaRepository();
        }

        /// <summary>
        /// Lista todas as consultas
        /// </summary>
        /// <returns>uma lista de consultas</returns>
        //[Authorize(Roles = "1")]
        [HttpGet("listartodas")]
        public IActionResult ListaTodas()
        {
            try
            {
                return Ok(_consultaRepository.Listar());
            }
            catch (Exception codErro)
            {
                return BadRequest(codErro);
            }
        }
        /// <summary>
        /// Lista todas as consultas de um determinado usuario
        /// </summary>
        /// <returns>lista de consultas e um status code 200</returns>
        [Authorize(Roles = "2, 3")]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                // Cria uma variavel que recebe o valor do ID do usuario que está logado
                int id = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
                //retotna 200 ok e a lista 
                return Ok(_consultaRepository.ListarMinhas(id));
            }
            catch (Exception erro)
            {

                return BadRequest(new
                {
                    mensagem = "Não é possivel mostrar as consultas se não estiver logado",
                    erro
                });
            }

        }

        

        [HttpPost]
        public IActionResult Post(Consultum novaConsulta)
        {

            _consultaRepository.Cadastrar(novaConsulta);


            return StatusCode(201);
        }

        [Authorize(Roles = "1")]
        [HttpPatch("{id}")]

        public IActionResult UpdateSituacao(int id, Consultum status)
        {
            try
            {
                _consultaRepository.StatusConsulta(id, status.IdSituacao.ToString());

                return StatusCode(204);
            }
            catch (Exception erro)
            {

                return BadRequest(erro);
            }
        }


        [Authorize(Roles = "2")]
        [HttpPatch("descricao/{id}")]
        public IActionResult PatchDesc(int id, ConsultumViewModel descricaoAtualizado)
        {
            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                Consultum consultaBuscada = _consultaRepository.BuscarPorId(id);

                if (consultaBuscada != null)
                {
                    consultaBuscada = new Consultum
                    {
                        Descricao = descricaoAtualizado.descricao
                    };

                    _consultaRepository.InserirDescricao(id, consultaBuscada, idUsuario);

                    return StatusCode(204);
                }
                return BadRequest("Nenhuma consulta encontrada!");
            }
            catch (Exception codErro)
            {
                return BadRequest(codErro);
            }
        }

        [Authorize(Roles = "1")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _consultaRepository.Deletar(id);

                return StatusCode(204);
            }
            catch (Exception codErro)
            {
                return BadRequest(codErro);
            }
        }

    }
    



}
