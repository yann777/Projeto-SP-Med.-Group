using senai.spmedicalgroup.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spmedicalgroup.webApi.Interfaces
{
    interface IClinicaRepository
    {
        void Cadastrar(Clinica cadastrarClinica);
    }
}
