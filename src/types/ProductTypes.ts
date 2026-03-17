export interface CreateProductRequest {
  barcode: string;
  name: string;
  orderReferenceDays: number;
}

export interface Product {
  barcode: string;
  name: string;
  quantityInStock: number;
  orderReferenceDays: number;
}