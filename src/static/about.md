# About E-Voting

CryptoVote is a secure, anonymous, and verifiable electronic voting system built on
real cryptographic protocols. Developed as an academic project at **ENSTA Alger** for
the Applied Cryptography module (3rd year — Artificial Intelligence & Systems Security), it demonstrates
how modern cryptography can be applied to solve one of the hardest problems in digital
systems: conducting an election where **no one — not even the system itself — can link
a vote to a voter**.

---

## The Problem We Solve

Electronic voting offers convenience and speed, but introduces a fundamental tension:
the system must simultaneously **know who voted** (to prevent fraud) and **not know
how they voted** (to guarantee anonymity). In a paper ballot system, this is solved
physically. In a digital system, it requires cryptography.

CryptoVote solves this using a combination of four well-established cryptographic
primitives working in concert.

---

## Cryptographic Foundation

| Primitive | Role in the System |
|---|---|
| **RSA Public Key Cryptography** | Encrypts ballots so only the Counter can read them |
| **Digital Signatures** | Proves a ballot was approved by the Administrator |
| **Blind Signatures** | Lets the Administrator sign a ballot without seeing its content |
| **Hash Functions (SHA-256)** | Protects N2 codes — stored only as irreversible fingerprints |

### What is a Blind Signature?

A blind signature is the cryptographic equivalent of signing a document inside a sealed
envelope. The Administrator confirms the ballot is legitimate — without ever seeing the
vote choice inside. This is the core mechanism that breaks the link between voter
identity and vote content.

Mathematically, the voter computes:
```
masked_ballot = ballot × k^e  mod N
```

The Administrator signs the masked version. The voter then removes the mask:
```
signature = masked_signature × k⁻¹  mod N
```

The result is a valid RSA signature on the original ballot — which the Administrator
never saw.

---

## System Architecture

CryptoVote separates authority across four independent entities. No single entity has
enough information to compromise the system on its own.

### Commissioner
- Holds the list of valid **N1** authentication codes
- Validates voter eligibility before and during the voting process
- Stores only `hash(N2)` — never N2 itself
- Has no access to vote content

### Administrator
- Signs ballots using RSA **blind signature**
- Never sees the ballot content — only the masked version
- Cannot link a signed ballot back to the voter who requested it

### Anonymizer
- Receives encrypted, signed ballots — acts as the digital ballot box
- Verifies N1 with the Commissioner, then **permanently invalidates it**
- Stores only the encrypted vote — with zero link to voter identity

### Counter
- Holds the only RSA private key that can decrypt votes
- Decrypts, verifies signatures, validates N2 hashes, and tallies results
- Knows the vote content — but cannot link it to any voter

---

## The Voting Process

Each voter receives two unique secret codes before the election:

| Code | Purpose |
|---|---|
| **N1** | Authentication — proves the right to vote. Used once, then permanently invalidated. |
| **N2** | Verification — embedded in the ballot. Used after the election to confirm the vote was counted. |

The election runs in three phases:

### Phase 1 — Initialization
The system generates N1 and N2 for each voter. Only `hash(N2)` is stored.
N2 in plaintext is destroyed immediately after being sent to the voter.

### Phase 2 — Voting
1. Voter authenticates with **N1** → Commissioner confirms eligibility
2. Voter constructs the ballot: `(vote, N2, random_bits)`
3. Voter **blinds** the ballot with a random masking factor
4. Administrator signs the masked ballot — without seeing the vote
5. Voter **unblinds** the signature → obtains a valid signed ballot
6. Voter encrypts the ballot using the Counter's public key
7. Voter submits `(N1, encrypted_ballot)` to the Anonymizer
8. Anonymizer validates N1 with the Commissioner → N1 is invalidated → vote is stored

### Phase 3 — Counting
1. Counter decrypts each ballot using its private key
2. Counter verifies the Administrator's digital signature
3. Counter extracts N2, hashes it, and sends `hash(N2)` to the Commissioner
4. Commissioner confirms `hash(N2)` is in the valid list
5. Vote is counted and `hash(N2)` is stored — preventing double-counting

---

## Security Guarantees

| Guarantee | How It Is Enforced |
|---|---|
| **Anonymity** | No link exists between voter identity and vote content at any layer |
| **Integrity** | Every ballot carries a verifiable RSA signature from the Administrator |
| **Authenticity** | Only ballots with a valid signature and a valid `hash(N2)` are counted |
| **No double voting** | N1 is invalidated atomically on first use |
| **No double counting** | `hash(N2)` has a UNIQUE constraint in the database |
| **Verifiability** | Voters can check if their vote was counted using their N2 code |
| **Blind authority** | The Administrator signs without seeing — cannot correlate voter to vote |

---

## What the System Prevents

- **Vote injection** — Invalid votes are rejected: no valid N1, no valid `hash(N2)`, no valid signature
- **Vote manipulation** — Signed ballots cannot be altered without breaking the RSA signature
- **Identity tracking** — Random bits in the ballot prevent any correlation to the encrypted submission
- **Double voting** — N1 is single-use and invalidated atomically in a database transaction
- **Insider attacks** — Role separation ensures no single entity has complete control

---

## Technical Stack

| Layer | Technology |
|---|---|
| Backend | Python 3.11 · FastAPI |
| Cryptography | `cryptography` library (RSA-OAEP, RSA-PSS, SHA-256) |
| Database | PostgreSQL (Neon) · SQLite for local development |
| Frontend | React · TailwindCSS |
| Deployment | Vercel (frontend) · Render (backend) |

---

## Project Team — ENSTA Alger

| Member | Role |
|---|---|
| **Akram** | Frontend & Architecture |
| **Walid** | Backend & API Design |
| **Sophia** | Database & Queries |
| **Amal** | Cryptography |
| **Maylis** | Frontend & UI/UX Design |

*Supervisor: Mrs. Souad KHERROUBI*

---

> "In cryptography we trust — not the server, not the admin, not the system.
> The math is the guarantee."