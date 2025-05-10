import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../modals/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-listing',
  imports:[ReactiveFormsModule],
  standalone:true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'] 
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  showProductModal: boolean = false;
  productForm: FormGroup;
  selectedProduct: Product | null = null; // For editing

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      status: ['Available', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      priceMin: [0, Validators.min(0)],
      priceMax: [0, Validators.min(0)],
      description: ['', Validators.required],
      image: [''] // Consider using a base64 string or URL
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (products) => {
        this.products = products;
        this.filteredProducts = [...this.products]; // Initially, show all products
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  openProductModal(): void {
    this.selectedProduct = null; // Reset for adding a new product
    this.productForm.reset({ status: 'Available', priceMin: 0, priceMax: 0 }); // Reset the form
    this.showProductModal = true;
  }

  closeProductModal(): void {
    this.showProductModal = false;
  }

  submitProduct(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;

      if (this.selectedProduct) {
        // Editing existing product (you'll need to add updateProduct method in your service)
        product.id = this.selectedProduct.id;
        //this.productService.updateProduct(product).subscribe(
        //  () => {
        //    this.loadProducts(); // Reload the product list
        //    this.closeProductModal();
        //  },
        //  (error) => {
        //    console.error('Error updating product:', error);
        //  }
        //);
      } else {
        // Creating a new product
        this.productService.createProduct(product).subscribe(
          () => {
            this.loadProducts(); // Reload the product list
            this.closeProductModal();
          },
          (error) => {
            console.error('Error creating product:', error);
          }
        );
      }
    } else {
      // Trigger form validation to show errors
      Object.values(this.productForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  onProductFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.productForm.patchValue({
        image: reader.result // Store the base64 string in the form
      });
    };
    reader.onerror = (error) => {
      console.error('Error converting to base64:', error);
    };
    reader.readAsDataURL(file);
  }

  applyFilters(): void {
    const title = (document.querySelector('input[placeholder="Search by title..."]') as HTMLInputElement).value;
    const location = (document.querySelector('input[placeholder="Enter location..."]') as HTMLInputElement).value;

    this.filteredProducts = this.products.filter(product => {
      let titleMatch = true;
      let locationMatch = true;

      if (title) {
        titleMatch = product.title.toLowerCase().includes(title.toLowerCase());
      }

      if (location) {
        locationMatch = product.location.toLowerCase().includes(location.toLowerCase());
      }

      return titleMatch && locationMatch;
    });
  }

  resetFilters(): void {
    this.filteredProducts = [...this.products];
    (document.querySelector('input[placeholder="Search by title..."]') as HTMLInputElement).value = '';
    (document.querySelector('input[placeholder="Enter location..."]') as HTMLInputElement).value = '';
  }

  editProduct(id: number): void {
    this.selectedProduct = this.products.find(product => product.id === id) || null;
    if (this.selectedProduct) {
      this.productForm.patchValue({
        title: this.selectedProduct.title,
        status: this.selectedProduct.status,
        date: this.selectedProduct.date,
        location: this.selectedProduct.location,
        price:this.selectedProduct.price,
        description: this.selectedProduct.description,
        image: this.selectedProduct.image
      });
      this.openProductModal();
    }
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(
        () => {
          this.loadProducts();
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }
}