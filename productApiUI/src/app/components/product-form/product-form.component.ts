import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})

export class ProductFormComponent implements OnInit{
  productForm!: FormGroup;
  productId!: number;
  isEditMode = false;
  message: string = '';
  messageType: 'success' | 'error' = 'success';
  
    constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
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
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.productId;

    if (this.isEditMode) {
      this.productService.getProduct(this.productId).subscribe(product => {
        this.productForm.patchValue(product);
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;
    if (this.isEditMode) {
      this.productService.updateProduct(this.productId, this.productForm.value).subscribe({
        next: () => {
          this.router.navigate(['/products'], {
            state: { message: 'Product updated successfully!', type: 'success' }
          });
        },
        error: err => {
          this.message = 'Failed to update product.';
          this.messageType = 'error';
          console.error(err);
        }  });
    } else {
        this.router.navigate(['/products'], {state: { message: 'Product!', messageType: 'success' }});
      
    }
  }
  onCancel(): void {
    this.router.navigate(['/products']);
  }
}