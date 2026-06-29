export interface ProductSpecification {
  label: string;
  value: string | number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  packSize: number;
  stockStatus: 'In Stock' | 'Out of Stock' | 'Ships in 1-2 Days';
  specs: ProductSpecification[];
  description: string;
}

export const mockProducts: Product[] = [
  {
    id: 'p-1001',
    sku: '91292A133',
    name: 'Metric 18-8 Stainless Steel Socket Head Screw',
    category: 'Fasteners & Hardware',
    subcategory: 'Socket Head Screws',
    price: 12.45,
    packSize: 50,
    stockStatus: 'In Stock',
    description: 'Made from 18-8 stainless steel, these screws have good chemical resistance and may be mildly magnetic. They require an Allen wrench (hex key) for installation.',
    specs: [
      { label: 'System of Measurement', value: 'Metric' },
      { label: 'Thread Size', value: 'M8' },
      { label: 'Thread Pitch', value: '1.25 mm' },
      { label: 'Length', value: '20 mm' },
      { label: 'Threading', value: 'Fully Threaded' },
      { label: 'Head Style', value: 'Socket' },
      { label: 'Head Diameter', value: '13 mm' },
      { label: 'Head Height', value: '8 mm' },
      { label: 'Drive Style', value: 'Hex' },
      { label: 'Drive Size', value: '6 mm' },
      { label: 'Material', value: '18-8 Stainless Steel' },
      { label: 'Tensile Strength', value: '70,000 psi' },
      { label: 'RoHS', value: 'Compliant' }
    ]
  },
  {
    id: 'p-1002',
    sku: '91292A134',
    name: 'Metric 18-8 Stainless Steel Socket Head Screw',
    category: 'Fasteners & Hardware',
    subcategory: 'Socket Head Screws',
    price: 13.80,
    packSize: 50,
    stockStatus: 'In Stock',
    description: 'Made from 18-8 stainless steel, these screws have good chemical resistance and may be mildly magnetic. They require an Allen wrench (hex key) for installation.',
    specs: [
      { label: 'System of Measurement', value: 'Metric' },
      { label: 'Thread Size', value: 'M8' },
      { label: 'Thread Pitch', value: '1.25 mm' },
      { label: 'Length', value: '25 mm' },
      { label: 'Threading', value: 'Fully Threaded' },
      { label: 'Head Style', value: 'Socket' },
      { label: 'Head Diameter', value: '13 mm' },
      { label: 'Head Height', value: '8 mm' },
      { label: 'Drive Style', value: 'Hex' },
      { label: 'Drive Size', value: '6 mm' },
      { label: 'Material', value: '18-8 Stainless Steel' },
      { label: 'Tensile Strength', value: '70,000 psi' },
      { label: 'RoHS', value: 'Compliant' }
    ]
  },
  {
    id: 'p-1003',
    sku: '91292A135',
    name: 'Metric 18-8 Stainless Steel Socket Head Screw',
    category: 'Fasteners & Hardware',
    subcategory: 'Socket Head Screws',
    price: 15.20,
    packSize: 50,
    stockStatus: 'In Stock',
    description: 'Made from 18-8 stainless steel, these screws have good chemical resistance and may be mildly magnetic. They require an Allen wrench (hex key) for installation.',
    specs: [
      { label: 'System of Measurement', value: 'Metric' },
      { label: 'Thread Size', value: 'M8' },
      { label: 'Thread Pitch', value: '1.25 mm' },
      { label: 'Length', value: '30 mm' },
      { label: 'Threading', value: 'Partially Threaded' },
      { label: 'Head Style', value: 'Socket' },
      { label: 'Head Diameter', value: '13 mm' },
      { label: 'Head Height', value: '8 mm' },
      { label: 'Drive Style', value: 'Hex' },
      { label: 'Drive Size', value: '6 mm' },
      { label: 'Material', value: '18-8 Stainless Steel' },
      { label: 'Tensile Strength', value: '70,000 psi' },
      { label: 'RoHS', value: 'Compliant' }
    ]
  }
];
