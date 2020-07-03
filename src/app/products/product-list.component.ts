import { Component, OnInit } from '@angular/core';
import { Products } from './products';
import { ProductService } from './products.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List!';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    _listFilter: string; 
    errorMessage: string; 

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: Products[];
    products: Products [] = [];

    constructor(private productService: ProductService) {}

    onRatingClicked(message: string): void {
        this.pageTitle = `Product List: ${message}`;
    }

    performFilter(filterBy: string): Products[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: Products) => 
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void { // This is an Angular Lifecycle hook, like componentDidMount() on React. 
        this.productService.getProducts().subscribe({
            next: products => {
                this.products = products; 
                this.filteredProducts = this.products; 
            }, 
            error: err => this.errorMessage = err
        });
    }
}