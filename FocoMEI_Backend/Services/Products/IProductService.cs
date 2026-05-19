using FocoMEI_Backend.Models;

namespace FocoMEI_Backend.Services.Products
{
    public interface IProductService
    {
        public Task<List<Product>>GetAll();
        public Task<bool> Create(Product product);
    }
}
