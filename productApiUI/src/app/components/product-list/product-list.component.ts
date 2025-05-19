import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [CommonModule, RouterModule, HttpClientModule]
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;
  message: string = '';
  messageType: 'success' | 'error' = 'success';
  
  constructor(private productService:ProductService, private router:Router){}

  ngOnInit(): void {
      const navState = history.state;
      
      if (navState && navState.message) {
      this.message = navState.message;
      this.messageType = navState.type;

      // Hide message after 3 seconds
      setTimeout(() => {
        this.message = '';
      }, 3000);
    }
    this.loadProducts();
  }
loadProducts() {
  this.productService.getProducts(this.currentPage, this.pageSize).subscribe(response => {
    this.products = response.products;
    this.totalItems = response.totalItems;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  });
}

  nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.loadProducts();
      }
    }

   prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadProducts();
      }
    }
  deleteProduct(id: number) {
  this.productService.deleteProduct(id).subscribe({
    next: () => {
      this.message = 'Product deleted successfully!';
      setTimeout(() => {
        this.message = '';
      }, 3000);
      this.messageType = 'success';
      this.loadProducts();
    },
    error: () => {
      this.message = 'Failed to delete product.';
      this.messageType = 'error';
    }
  });
}
  editProduct(id:number): void{
    this.router.navigate(['/products/edit',id]);
  }
  addProduct():void{
    this.router.navigate(['product/add']);
  }

}
