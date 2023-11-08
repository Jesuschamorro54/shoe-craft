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
