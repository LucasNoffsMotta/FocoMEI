using FocoMEI_Backend.Data.Dtos;
using FocoMEI_Backend.Models;

namespace FocoMEI_Backend.Map
{
    public static class Mapping
    {
        public static Sale SaleDtoToModel(CreateSaleDto dto)
        {
            return new Sale
            {
                UserId = dto.userId,
                Quantidade = dto.quantidade,
                Total = dto.total,
                ProductId = dto.productId,
            };
        }

        public static ReadSalesDto SaleModelToReadDto(Sale sale)
        {
            return new ReadSalesDto(
                sale.Id,
                sale.Total,
                sale.Product!.Description!,
                sale.Quantidade,
                sale.User!.Name!
                );
        }
    }
}
