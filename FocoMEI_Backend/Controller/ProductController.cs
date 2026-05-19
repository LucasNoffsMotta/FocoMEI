using FocoMEI_Backend.Models;
using FocoMEI_Backend.Services.Products;
using Microsoft.AspNetCore.Mvc;

namespace FocoMEI_Backend.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductService _productService;

        public ProductController(IProductService service)
        {
            _productService = service;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var result = await _productService.GetAll();
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody]Product product)
        {
            var success = await _productService.Create(product);
            return success ? Ok() : BadRequest();
        }
    }
}
