interface Company {
    name: string,
    country : string
}

interface Category {
    name: string,
    id: number,
}

interface Product {
    id: number,
    name: string,
    price: number,
    company : Company,
    category: Category,
}

const product: Product = {
    id: 1,
    name: "Iphone 15",
    price: 80000,
    company: { name : "Apple", country: "USA"},
    category: { name : "Phones", id: 2},
} 

function logProduct(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const result: Product = originalMethod.apply(this, args);

    console.log(`Product ID: ${result.id}`);
    console.log(`Name: ${result.name}`);
    console.log(`Price: ${result.price}`);
    console.log(`Company: ${result.company.name} (${result.company.country})`);
    console.log(`Category: ${result.category.name}`);
    console.log('--------------------');
  };

  return descriptor;
}

class ProductService {
  private product: Product;

  constructor(product: Product) {
    this.product = product;
  }

  @logProduct
  getProduct() {
  }
}

const service = new ProductService(product);

console.log(service)