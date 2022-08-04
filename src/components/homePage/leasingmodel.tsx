export interface QuickQuoteMain {
    data: QuickQuoteData
    extensions: Extensions
  }
  
  export interface QuickQuoteData {
    quickQuote: QuickQuote
  }
  
  export interface QuickQuote {
    leaseTerm: number
    kmsPerYear: number
    costs: Costs
    novated: Novated
    calculation: Calculation[]
    takeHome: TakeHome
  }
  
  export interface Costs {
    fuel: number
    maintenance: number
    tyres: number
    registration: number
    insurance: number
  }
  
  export interface Novated {
    salarySacrificePayment: number
    notSalarySacrificePayment: number
    novatedSaving: number
    totalTaxSaving: number
    taxSaving: number
    gstSavingBudget: number
    gstSavingVehicle: number
    salarySacrificeTakeHomePay: number
    notSalarySacrificeTakeHomePay: number
    salarySacrificeImpactTakeHome: number
    notSalarySacrificeImpactTakeHome: number
  }
  
  export interface Calculation {
    label: string
    information?: string
    sacrifice: number
    noSacrifice: number
    negative?: boolean
    bold?: boolean
  }
  
  export interface TakeHome {
    sacrifice: number
    noSacrifice: number
  }
  
  export interface Extensions {
    tracing: Tracing
  }
  
  export interface Tracing {
    version: number
    startTime: string
    endTime: string
    duration: number
    execution: Execution
  }
  
  export interface Execution {
    resolvers: Resolver[]
  }
  
  export interface Resolver {
    path: any[]
    parentType: string
    fieldName: string
    returnType: string
    startOffset: number
    duration: number
  }
  
