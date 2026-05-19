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
            return await _DbContext.Sales
            .Include(e => e.Product)
            .Include(e => e.User)
            .ToListAsync();
        }

        public async Task<Sale> GetById(int id)
        {
            return await _DbContext.Sales
            .Include(e => e.Product)
            .Include(e => e.User)
            .Where(e => e.Id == id)
            .FirstAsync();
        }

        public async Task<bool> Create(Sale sale)
        {
            _DbContext.Sales.Add(sale);
            int n = await _DbContext.SaveChangesAsync();
            return n != 0;
        }

        public async Task<List<Sale>> GetByUserId(int id)
        {
            return await _DbContext.Sales
            .Include(e => e.Product)
            .Include(e => e.User)
            .Where(e => e.UserId == id)
            .ToListAsync();
        }
    }
}
