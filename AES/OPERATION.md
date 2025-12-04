# ⚙️ AES Encryption Tool — Operational Manual

This guide describes how the system functions internally and how operators should use and maintain it.

---

# 1. System Overview

The AES Tool is a front-end cryptographic application built in:
- **HTML** (UI layout)
- **CSS** (visual theme)
- **JavaScript + CryptoJS** (AES functions)

It performs AES block cipher encryption and decryption directly in the browser with no backend.

---

# 2. Operational Flow

## 2.1 Encryption
1. User enters plaintext  
2. User provides key  
3. System pads plaintext to 16-byte boundaries  
4. Key is resized to required key size  
5. AES encryption occurs using CryptoJS  
6. CBC mode generates a random IV  
7. Output is shown in Base64 (or IV:CIPHER for CBC)

---

## 2.2 Decryption
1. System reads key and mode  
2. If CBC, input splits into **IV** and **cipher**  
3. AES decrypt runs with no padding  
4. Trailing spaces are trimmed  
5. Plaintext is shown to the user

---

# 3. Key Handling

- Key is not stored anywhere  
- When “SHOW” is pressed, it temporarily becomes visible  
- Key is padded with spaces to match AES key length (128/192/256 bits)

---

# 4. Output Handling

- Users may copy output using clipboard API  
- Users may save output as `.txt`  
- CBC output format is:


---

# 5. Modes of Operation

| Mode | Description | Security |
|------|-------------|----------|
| **ECB** | No IV; deterministic | ❌ Not secure |
| **CBC** | Uses random IV; secure | ✔ Recommended |

---

# 6. Supported Key Sizes

| Key Size | Bytes | Rounds |
|----------|--------|--------|
| 128 bit | 16 | 10 |
| 192 bit | 24 | 12 |
| 256 bit | 32 | 14 |

---

# 7. AES Steps Explanation (UI Popup)

The **AES Steps** button explains:
- SubBytes  
- ShiftRows  
- MixColumns  
- AddRoundKey  

This helps users understand internal AES operations.

---

# 8. Operator Responsibilities

Operators should:
- Ensure correct key size selection  
- Ensure proper input format in CBC  
- Avoid weak or short keys  
- Avoid sharing keys publicly  
- Use CBC mode for secure communication  

---

# 9. Maintenance

No maintenance required beyond:
- Keeping CryptoJS CDN updated  
- Checking browser console for errors  
- Validating UI layout on major browsers  

---

# 10. Versioning

Recommend semantic versioning:
