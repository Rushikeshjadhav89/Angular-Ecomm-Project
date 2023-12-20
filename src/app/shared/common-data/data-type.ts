export interface SignUp{
    name:string,
    password:string,
    email:string
}

export interface Login{
    sMail:string,
    sPass:string
    
}

export interface product{
        pName        :string
        pPrice       :number
        pColor       :string
        pDescription :string
        pLink        :string
        pCategory    :string
        id           :number
        quantity     :undefined | number
        productId    :number
}
export interface uLogin{
    uMail: string,
    uPass: string
}
export interface cart{
        pName        :string
        pPrice       :number
        pColor       :string
        pDescription :string
        pLink        :string
        pCategory    :string
        id           :number    | undefined
        quantity     :undefined | number
        userId       :number    | undefined
        productId    :number

}
export interface priceSummary{
    price: number
    discount : number
    tax: number
    delivery: number
    total: number
}
export interface check{
    cMail:string
    caddress:string
    cContact:string
    totalPrice:number
    userId: number
    id:number | undefined
}