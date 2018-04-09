class Payment {
    constructor(payment, principal, interest, totalInterest, balance) {
        this.payment = `$${payment.toFixed(2)}`
        this.principal = `$${principal.toFixed(2)}`
        this.interest = `$${interest.toFixed(2)}`
        this.totalInterest = `$${totalInterest.toFixed(2)}`
        this.balance = `$${balance.toFixed(2)}`
    }
}

function calculateAmortizationSchedule(balance, years, APR) {
    let totalInterest = 0
    let period = years * 12
    let monthlyRate = APR / 100 / 12
    let monthlyPayment = balance * monthlyRate / (1 - (1 + monthlyRate) ** -period)
    let schedule = []

    for (let i = 1; i <= period; i++) {
        let interestPayment = balance * monthlyRate
        totalInterest += interestPayment
        let principalPayment = monthlyPayment - interestPayment
        balance -= principalPayment
        schedule.push(new Payment(monthlyPayment, principalPayment, interestPayment, totalInterest, balance))
    }

    return schedule
}
