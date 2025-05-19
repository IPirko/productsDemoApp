using Microsoft.EntityFrameworkCore;

namespace ProductsApi.Data
{
    public class ProductDbContext(DbContextOptions<ProductDbContext> options) : DbContext(options)
    {
        public DbSet<Products> Products { get; set; }
    }
}
