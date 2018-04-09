class Payment {
    constructor(payment, principal, interest, totalInterest, balance, equity) {
        this.payment = `$${payment.toFixed(2)}`
        this.principal = `$${principal.toFixed(2)}`
        this.interest = `$${interest.toFixed(2)}`
        this.totalInterest = `$${totalInterest.toFixed(2)}`
        this.balance = `$${balance.toFixed(2)}`
        this.equity = (equity * 100).toFixed(2)
    }
}

function calculateAmortizationSchedule(price, balance, years, APR, rounded = 1) {
    let totalInterest = 0
    let period = years * 12
    let monthlyRate = APR / 100 / 12
    let monthlyPayment = balance * monthlyRate / (1 - (1 + monthlyRate) ** -period)
    let schedule = []

    for (let i = 1; balance > 0.01 && i <= period; i++) {
        let interestPayment = balance * monthlyRate
        totalInterest += interestPayment
        let minimumPrincipalPayment = Math.min(monthlyPayment, balance) - interestPayment
        let principalPayment = Math.min(balance, rounded * Math.ceil(minimumPrincipalPayment / rounded))
        balance -= principalPayment
        let payment = interestPayment + principalPayment
        schedule.push(new Payment(payment, principalPayment, interestPayment, totalInterest, balance, 1 - balance / price))
    }

    return schedule
}
