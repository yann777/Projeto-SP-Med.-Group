using senai.spmedicalgroup.webApi.Contexts;
using senai.spmedicalgroup.webApi.Domains;
using senai.spmedicalgroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedicalgroup.webApi.Repositories
{
    
    public class TipoUsuarioRepository : ITipoUsuarioRepository
    {
        SpMedicalContext ctx = new SpMedicalContext();

        public void Cadastrar(TipoUsuario cadastrarTipoUsario)
        {
            ctx.TipoUsuarios.Add(cadastrarTipoUsario);


            ctx.SaveChanges();
        }
    }
}
