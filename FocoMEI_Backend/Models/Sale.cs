using System.ComponentModel.DataAnnotations;

namespace FocoMEI_Backend.Models
{
    public class Sale : ModelBase
    {
        [Required]
        public int UserId { get; set; }
        public User? User { get; set; }
        [Required]
        public decimal Total {get; set;}

        public int Quantidade {get;set;}

        [Required]
        public int ProductId { get; set; }
        public Product? Product { get; set; }
    }
}
