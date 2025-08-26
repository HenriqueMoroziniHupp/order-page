export interface IContact {
  name: string
  email: string
  phone: string
  fax: string
}

export interface IOrderHeader {
  number: number
  serial: number
  buyer: string
  price: number
  currency: string
  createdAt: string
  status: string
  contact: IContact
}

export interface ISupplierDocument {
  type: string
  value: string
}

export interface ISupplier {
  code: string
  name: string
  readAt: string
  lastReplyAt: string
  document: ISupplierDocument
  address: string
  contact: IContact
}

export interface IAddress {
  label: string
  name: string
  code: string | null
  address: string
  contact: IContact
}

export interface IOrder {
  header: IOrderHeader
  supplier: ISupplier
  addresses: IAddress[]
}

export interface IInfoItem {
  src: string
  text: string
}
