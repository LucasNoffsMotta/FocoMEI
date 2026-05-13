using FocoMEI_Backend.Data;
using FocoMEI_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FocoMEI_Backend.Services.Sales
{
    public class SaleService : ISaleService
    {
        private AppDbContext _DbContext;

        public SaleService(AppDbContext dbContext)
        {
            _DbContext = dbContext;
        }

        public async Task<List<Sale>> GetAll()
        {
            return await _DbContext.Sales.ToListAsync();
        }
    }
}
