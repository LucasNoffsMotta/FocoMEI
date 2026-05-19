namespace FocoMEI_Backend.Data.Dtos
{
    public record ReadSalesDto(
        int saleId,
        decimal total,
        string itemDescription,
        int quantidade,
        string userName
    );
}
