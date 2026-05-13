using System.ComponentModel.DataAnnotations;

namespace FocoMEI_Backend.Models
{
    public class Sale : ModelBase
    {
        [Required]
        public int UserId { get; set; }
        public User? User { get; set; }
        [Required]
        public decimal Total;
        [Required]
        public List<Product>? Items { get; set; }
    }
}
