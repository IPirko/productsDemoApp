using System.ComponentModel.DataAnnotations;

namespace ProductsApi
{
    public class Products
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Price need to me bigger than 0")]
        public double Price { get; set; }
        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Quantity need to me bigger than 0")]
        public int QuantityInStock { get; set; }
        public string Category { get; set; } = string.Empty;

    }
}
