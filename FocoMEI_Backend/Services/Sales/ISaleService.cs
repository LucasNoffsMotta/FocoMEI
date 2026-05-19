using FocoMEI_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace FocoMEI_Backend.Services.Sales
{
    public interface ISaleService
    {
        public Task<List<Sale>> GetAll();
        public Task<bool> Create(Sale sale);

        public Task<Sale> GetById(int id);
        public Task<List<Sale>> GetByUserId(int id);
    }
}
