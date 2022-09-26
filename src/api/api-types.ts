export type GetConvertPayload = {
    amount: string
    from: string
    to: string
    date?: string
}

export type GetConvertResponse = {
    date: string
    info: { timestamp: number, rate: number }
    query: { from: string, to: string, amount: number }
    result: number
    success: boolean
}