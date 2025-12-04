# 🧪 AES Tool — Test File

This document provides test cases and validation steps to verify correct operation of the AES Encryption & Decryption Tool.

---

# ✔ 1. Basic UI Tests

### 1.1 Page Load Test
- Open `aes.html`
- Expected: UI loads with LEDs, fields, and buttons visible.

### 1.2 Key Visibility Toggle Test
- Click **SHOW** button
- Expected: Key becomes visible  
- Click **HIDE**
- Expected: Key is again hidden

---

# ✔ 2. Encryption Tests

## Test Case 2.1 — AES-128 ECB
- Key: `testkey123`
- Message: `hello`
- Mode: ECB  
Expected:
- Output is Base64 string
- No errors

## Test Case 2.2 — AES-256 CBC
- Key: `superstrongmasterkey!`
- Message: `this is a test message`
- Mode: CBC  
Expected:
- Output format: `IV_Base64:CIPHER_Base64`
- IV should be 24-character Base64

---

# ✔ 3. Decryption Tests

## Test Case 3.1 — ECB Decryption
- Encrypt using AES-128 ECB  
- Copy ciphertext  
- Paste into input  
- Click **Decrypt**  
Expected:
- Exact original plaintext returned

## Test Case 3.2 — CBC Decryption
- Use format: `IV:cipher`  
Expected:
- Matches original plaintext  
- Trailing space padding removed

---

# ✔ 4. Error Handling Tests

### 4.1 Missing Key
Expected:  
Popup: “Please enter a key.”

### 4.2 Empty Input
Expected:  
Popup: “Please enter ciphertext to decrypt.”

### 4.3 CBC Wrong Format
Input: `wrongformatstring`
Expected:  
Popup: “Invalid CBC ciphertext format”

---

# ✔ 5. Copy/Save Tests

### Copy Button
- Click **Copy Output**
- Paste somewhere
- Expected: output text matches exactly

### Save Button
- Click **Save Output**
- File: `aes_output.txt`
- Expected: contents match output buffer

---

# ✔ 6. Performance Test

- Encrypt message of 5,000+ characters  
Expected:
- No crash  
- Encryption completes within 1 second on modern browsers  

---

# ✔ 7. Compatibility Test

Browsers to test:
- Chrome  
- Firefox  
- Edge  
- Brave  

Device tests:
- Desktop  
- Mobile  
- Tablet  

---

# 📌 Test Status Checklist

| Test | Status |
|------|--------|
| UI Elements | ☐ |
| Key Toggle | ☐ |
| AES-128 ECB Encryption | ☐ |
| AES-256 CBC Encryption | ☐ |
| ECB Decryption | ☐ |
| CBC Decryption | ☐ |
| Error Messages | ☐ |
| Copy Output | ☐ |
| Save Output | ☐ |
| Cross-Browser Test | ☐ |
