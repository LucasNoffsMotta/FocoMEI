namespace FocoMEI_Backend.Data.Dtos
{
    public record CreateSaleDto(
        int userId,
        decimal total,
        int quantidade,
        int productId
        );
}
