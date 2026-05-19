using FocoMEI_Backend.Data;
using FocoMEI_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace FocoMEI_Backend.Services.Products
{
    public class ProductService : IProductService
    {
        private AppDbContext _dbContext;

        public ProductService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Product>> GetAll()
        {
            return await _dbContext.Products.ToListAsync();
        }

        public async Task<bool> Create(Product product)
        {
            _dbContext.Products.Add(product);
            int n = await _dbContext.SaveChangesAsync();
            return n > 0;
        }
    }
}
