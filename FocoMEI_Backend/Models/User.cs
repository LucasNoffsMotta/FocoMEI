using System.ComponentModel.DataAnnotations;

namespace FocoMEI_Backend.Models
{
    public class User : ModelBase
    {
        [Required]
        public string? Name { get; set; }
    }
}
