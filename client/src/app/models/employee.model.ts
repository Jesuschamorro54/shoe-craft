export interface EmployeeModel{
  id: number,
  dni: string,
  email: string,
  name: string,
  role: "admin" | "cutter" | "trimmer" | "assembler",
  state: number,
  img: string,
  admissionDate: Date,
  address: string;
  phone: number;
  gender: string
}

export interface PaymentsModel{
  id: number,
  employeeId: number,
  state:0 | 1,
  date:Date,
  total: number,
}

export interface ProductsModel{
  id: number,
  name: string,
  cost:number,
  state: 0 | 1,
}

export interface PackagesModel{
  id: number,
  employeeId: number,
  productId: number,
  name: string,
  totalCost:number,
  totalProducts:number,
  state:0 | 1,
  date:Date
}

