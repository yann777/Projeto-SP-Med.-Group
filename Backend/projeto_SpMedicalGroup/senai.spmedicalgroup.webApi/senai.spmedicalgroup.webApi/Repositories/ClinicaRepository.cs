using senai.spmedicalgroup.webApi.Contexts;
using senai.spmedicalgroup.webApi.Domains;
using senai.spmedicalgroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedicalgroup.webApi.Repositories
{
    public class ClinicaRepository : IClinicaRepository
    {
        SpMedicalContext ctx = new SpMedicalContext();

       
           
        public void Cadastrar(Clinica cadastrarClinica)
        {
            ctx.Clinicas.Add(cadastrarClinica);


            ctx.SaveChanges();

        }
    }
}
