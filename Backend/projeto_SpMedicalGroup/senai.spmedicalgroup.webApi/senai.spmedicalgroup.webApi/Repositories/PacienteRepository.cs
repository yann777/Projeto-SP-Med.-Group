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
    public class PacienteRepository : IPacienteRepository
    {
        SpMedicalContext ctx = new SpMedicalContext();
        public List<Paciente> Listar()
        {
            return ctx.Pacientes.Include(x => x.Consulta).ToList();
        }
    }
}
