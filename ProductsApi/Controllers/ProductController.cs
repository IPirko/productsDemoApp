using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductsApi.Data;

namespace ProductsApi.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController(ProductDbContext context) : ControllerBase
    {
        private readonly ProductDbContext _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Products>>> GetProducts([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var totalItems = await _context.Products.CountAsync();

            var products = await _context.Products
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new { totalItems, products });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProductById(int id)
        {
            var prod = await _context.Products.FindAsync(id);
            if (prod is null)
            {
                return NotFound();
            }
            return Ok(prod);
        }

        [HttpPost]
        public async Task<ActionResult<Products>> AddProduct(Products newProd)
        {
            if (newProd is null)
                return BadRequest();
            _context.Products.Add(newProd);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(AddProduct), new { id = newProd.Id }, newProd);

        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Products updatedProd)
        {
            var prod = await _context.Products.FindAsync(id);

            if (prod is null)
                return NotFound();

            prod.Name = updatedProd.Name;
            prod.Description = updatedProd.Description;
            prod.Price = updatedProd.Price;
            prod.QuantityInStock = updatedProd.QuantityInStock;
            prod.Category = updatedProd.Category;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var prod = await _context.Products.FindAsync(id);

            if (prod is null)
                return NotFound();

            _context.Products.Remove(prod);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}
