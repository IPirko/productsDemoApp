import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  message: string = '';
  messageType: 'success' | 'error' = 'success';
  
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    // private location:Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      quantityInStock: [0, [Validators.required, Validators.min(0)]],
      category: ['']
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      
      this.productService.addProduct(this.productForm.value).subscribe({
        next: () => {this.message = 'Product added successfully!';
        this.messageType = 'success';
        this.router.navigate(['/products'],{state: { message: 'Product added successfully!', type: 'success' }})},
        error: err => {
          this.message = 'Failed to add product.';
        this.messageType = 'error';
          console.error('Error adding product:', err)}
      });
    }
  }
  goBack(): void {
  this.router.navigate(['/products']);
}

}