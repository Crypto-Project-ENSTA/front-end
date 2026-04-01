# Policies of E-Voting

This document defines the rules and guarantees governing the E-voting system.

---

## Eligibility

- Only registered voters with a valid **N1 authentication code** can participate.
- Each N1 code can be used **once only**.
- Any invalid or reused code is rejected.

---

## Privacy & Anonymity

- Votes are protected using **blind signatures**, ensuring the administrator cannot see their content.
- Ballots are **encrypted** before being stored.
- No entity can link a vote to a specific voter.

---

## Vote Validity

A vote is considered valid only if:

- It contains a correct **administrator signature**
- It includes a valid **N2 verification code**
- The N2 code matches a valid stored **hash fingerprint**

Invalid or tampered votes are automatically rejected.

---

## One Person, One Vote

- Each voter can submit **only one vote**
- Once used, the N1 code is removed from the valid list
- Duplicate voting attempts are prevented

---

## Verification

- Each voter can verify their vote using their **N2 code**
- Published results may include (N2, vote) pairs
- This ensures transparency without revealing identities

---

## Security Model

The system is designed so that no single entity can compromise the election:

- **Commissioner** cannot create votes (only verifies N1)
- **Administrator** cannot see vote content (blind signature)
- **Anonymizer** cannot read votes (encrypted)
- **Counter** cannot link votes to voters

---

## Integrity Protection

The system prevents:

- Vote forgery  
- Vote duplication  
- Unauthorized vote submission  
- Post-submission vote modification  

---

## Result Integrity

- Votes are counted only after full verification
- Any vote failing validation checks is discarded
- Final results reflect only **valid and verified ballots**

---

## Transparency

E-voting promotes transparency by allowing:

- Independent verification of vote inclusion  
- Public validation of results (without identity exposure)  

---

## Final Note

E-voting is designed as a **secure academic implementation** of an electronic voting protocol, demonstrating how cryptographic principles can ensure trust in digital elections.

---