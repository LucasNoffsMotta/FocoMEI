using FocoMEI_Backend.Services.Sales;
using Microsoft.AspNetCore.Mvc;

namespace FocoMEI_Backend.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private ISaleService _saleService;

        public SaleController(ISaleService saleService)
        {
            _saleService = saleService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var result = await _saleService.GetAll();
            return Ok(result);
        }
    }
}
