import { QuickQuote, QuickQuoteMain } from "../components/homePage/leasingmodel"

export const transformQuoteData = (data: QuickQuoteMain) => {
    const quoteData = data?.data?.quickQuote;
    if(!quoteData){ 
        return {} as QuickQuote;
    }
    return {
        leaseTerm: quoteData.leaseTerm,
        kmsPerYear: quoteData.kmsPerYear,
        costs: quoteData.costs,
        novated: quoteData.novated,
        takeHome: quoteData.takeHome,
        calculation: quoteData.calculation,
    } as QuickQuote
}