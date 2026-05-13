using FocoMEI_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace FocoMEI_Backend.Services.Sales
{
    public interface ISaleService
    {
        public Task<List<Sale>> GetAll();
    }
}
