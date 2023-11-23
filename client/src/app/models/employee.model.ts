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
  total: number,
  state:string,
  date:Date,
  details:Details[],
  user:UserPyments
}

export interface Details{
  id: number,
  packageId:string,
  paymentId:string,
  value: number,
  state:string,
  date:Date,
}

export interface UserPyments{
  name: string,
  id: number,
  dni: number,
  image: string,
  role: string,
}

export interface ProductsModel{
  id: number,
  name: string,
  cost:number,
  state: 0 | 1,
  image: string,
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

