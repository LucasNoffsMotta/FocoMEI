using FocoMEI_Backend.Data.Dtos;
using FocoMEI_Backend.Map;
using FocoMEI_Backend.Models;
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
            var models = await _saleService.GetAll();
            var dtos = models.Select(e => Mapping.SaleModelToReadDto(e)).ToList();
            return Ok(dtos);
        }

        
        [HttpGet("byUser/{userId}")]
        public async Task<ActionResult> GetAllByUser([FromRoute] int userId)
        {
            var models = await _saleService.GetByUserId(userId);
            var dtos = models.Select(e => Mapping.SaleModelToReadDto(e)).ToList();
            return Ok(dtos);
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateSale([FromBody] CreateSaleDto saleDto)
        {
            var model = Mapping.SaleDtoToModel(saleDto);
            bool success = await _saleService.Create(model);
            return success ? Ok(model) : BadRequest();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetSale([FromRoute] int id)
        {
            var sale = await _saleService.GetById(id);
            if (sale == null) return NotFound();

            var dto = Mapping.SaleModelToReadDto(sale);
            return Ok(dto);
        }
    }
}
