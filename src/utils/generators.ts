export function generateOrderId(): string {
  const year = new Date().getFullYear()
  const num = Math.floor(10000 + Math.random() * 90000)
  return `CR-${year}-${num}`
}

export function generateTrackingCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = 'CRTRK-'
  for (let i = 0; i < 10; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

export function generateFakeAddress() {
  const addresses = [
    { via: 'Via Roma 42', citta: 'Milano', cap: '20121', provincia: 'MI' },
    { via: 'Corso Vittorio Emanuele 15', citta: 'Roma', cap: '00186', provincia: 'RM' },
    { via: 'Via Napoli 8', citta: 'Napoli', cap: '80133', provincia: 'NA' },
    { via: 'Via Po 23', citta: 'Torino', cap: '10124', provincia: 'TO' },
    { via: 'Via Garibaldi 71', citta: 'Bologna', cap: '40121', provincia: 'BO' },
  ]
  return addresses[Math.floor(Math.random() * addresses.length)]
}

export function generateFakeCardLast4(): string {
  return String(Math.floor(1000 + Math.random() * 9000))
}
