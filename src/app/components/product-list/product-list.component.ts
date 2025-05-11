import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../modals/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-listing',
  imports: [ReactiveFormsModule,FormsModule],
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  showProductModal: boolean = false;
  productForm: FormGroup;
  selectedProduct: Product | null = null; 
  openProduct: any = null;
  filterTitle: string = '';
filterLocation: string = '';

  showProductDetails(product: any): void {
    this.openProduct = product;
    document.body.classList.add('overflow-hidden');
  }

  closeProductDetails(): void {
    this.openProduct = null;
    document.body.classList.remove('overflow-hidden');
  }


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
      image: [''] 
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  const staticProduct: Product = {
    id: 999,
    title: 'Static Sample Product',
    status: 'Available',
    date: '2025-05-11',
    location: 'Static City',
    price: 50.00 as DoubleRange,
    description: 'This is a hardcoded static product for display purposes.',
    image: '',
    validated: true,
    user: {
      id: 1,
      username: 'John Doe',
      phoneNumber: '99 999 999',
      email: 'johndoe@example.com'
    }
  };

  const anotherStaticProduct: Product = {
    id: 1000,
    title: 'Another Static Product',
    status: 'Unavailable',
    date: '2025-06-15',
    location: 'Another City',
    price: 75.00 as DoubleRange,
    description: 'This is another hardcoded static product for display purposes.',
    image: '',
    validated: false,
    user: {
      id: 2,
      username: 'Jane Smith',
      phoneNumber: '88 888 888',
      email: 'janesmith@example.com'
    }
  };

  this.products.push(staticProduct, anotherStaticProduct);
  this.filteredProducts.push(staticProduct, anotherStaticProduct);
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (products) => {
        this.products = products;
        this.filteredProducts = [...this.products]; 
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  openProductModal(): void {
    this.selectedProduct = null; 
    this.productForm.reset({ status: 'Available', priceMin: 0, priceMax: 0 }); 
    this.showProductModal = true;
  }

  closeProductModal(): void {
    this.showProductModal = false;
  }

  submitProduct(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;

      if (this.selectedProduct) {
        product.id = this.selectedProduct.id;
       
      } else {
        this.productService.createProduct(product).subscribe(
          () => {
            this.loadProducts(); 
            this.closeProductModal();
          },
          (error) => {
            console.error('Error creating product:', error);
          }
        );
      }
    } else {
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
    const title = this.filterTitle.trim().toLowerCase();
    const location = this.filterLocation.trim().toLowerCase();
  
    this.filteredProducts = this.products.filter(product => {
      const titleMatch = title ? product.title.toLowerCase().includes(title) : true;
      const locationMatch = location ? product.location.toLowerCase().includes(location) : true;
      return titleMatch && locationMatch;
    });
  }
  

  resetFilters(): void {
    this.filterTitle = '';
    this.filterLocation = '';
    this.filteredProducts = [...this.products];
  }
  



 
}