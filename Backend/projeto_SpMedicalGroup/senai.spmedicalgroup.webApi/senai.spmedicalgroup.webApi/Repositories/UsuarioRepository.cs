using Microsoft.EntityFrameworkCore;
using senai.spmedicalgroup.webApi.Contexts;
using senai.spmedicalgroup.webApi.Domains;
using senai.spmedicalgroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.hroads.WebApi.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {

        /// <summary>
        /// Objeto contexto por onde serão chamados os métodos do EF Core
        /// </summary>
        SpMedicalContext ctx = new SpMedicalContext();

        public void Atualizar(int id, Usuario usuarioAtualizado)
        {
            Usuario usuarioBuscado = ctx.Usuarios.Find(id);


            if (usuarioAtualizado.Email != null)
            {

                usuarioBuscado.Email = usuarioAtualizado.Email;
            }


            ctx.Usuarios.Update(usuarioBuscado);


            ctx.SaveChanges();
        }

        public Usuario Logar(string email, string senha)
        {
            return  ctx.Usuarios.Include(h => h.IdTipoUsuarioNavigation).FirstOrDefault(e => e.Email == email && e.Senha== senha);

           
        }

        public Usuario BuscarPorId(int id)
        {
            return ctx.Usuarios.Include(h => h.IdTipoUsuarioNavigation).FirstOrDefault(e => e.IdUsuario == id);
        }

        public void Cadastrar(Usuario cadastrarUsario)
        {
            ctx.Usuarios.Add(cadastrarUsario);


            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            Usuario usuarioBuscado = ctx.Usuarios.Find(id);


            ctx.Usuarios.Remove(usuarioBuscado);


            ctx.SaveChanges();
        }

        public List<Usuario> Listar()
        {
            return ctx.Usuarios.Include(p => p.IdTipoUsuarioNavigation).ToList();
        }

     
    }
}
