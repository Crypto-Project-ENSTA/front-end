# About E-Voting

E-voting is a secure electronic voting system designed to ensure **privacy**, **integrity**, and **verifiability** of votes using modern cryptographic techniques.

Developed as part of an academic project at ENSTA Alger, the system demonstrates how cryptography can be applied to build a trustworthy digital voting process.

---

## Core Technologies

E-voting relies on the following cryptographic tools:

- **RSA Public Key Cryptography**
- **Digital Signatures**
- **Blind Signatures**
- **Hash Functions**

These technologies work together to protect voter identity and guarantee that votes cannot be altered or forged.

---

## System Architecture

The system is based on four independent entities:

- **Commissioner**  
  Verifies voter eligibility using authentication codes.

- **Administrator**  
  Signs ballots to ensure their authenticity without seeing their content.

- **Anonymizer**  
  Acts as a secure ballot box, collecting encrypted votes.

- **Counter**  
  Decrypts and counts votes after verification.

This separation ensures that no single entity can compromise the system.

---

## How It Works

Each voter receives two unique codes:

- **N1** → Authentication (proves voting eligibility)
- **N2** → Verification (used to confirm the vote later)

The voting process follows these steps:

1. The voter authenticates using N1  
2. The ballot is created and **blinded**  
3. The administrator signs it without seeing the vote  
4. The ballot is **unblinded and encrypted**  
5. The anonymizer records the vote  
6. The counter verifies and counts it  

---

## Key Guarantees

E-voting ensures:

- **Anonymity** → Votes cannot be linked to voters  
- **Integrity** → Votes cannot be altered  
- **Authenticity** → Only valid votes are accepted  
- **Verifiability** → Voters can confirm their vote was counted  

---

## Objective

The goal of E-voting is to demonstrate a secure and transparent electronic voting protocol that prevents:

- Fraudulent vote injection  
- Vote manipulation  
- Identity-based tracking  

while maintaining full voter confidence.

---
