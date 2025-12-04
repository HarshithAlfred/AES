# 🔐 AES Encryption & Decryption Tool

A browser-based cryptographic console supporting **AES-128**, **AES-192**, and **AES-256** in both **ECB** and **CBC** modes.  
The tool is fully client-side and uses **CryptoJS** for AES operations.

---

## 🚀 Features

- AES encryption & decryption  
- ECB and CBC modes  
- Auto IV generation in CBC  
- Manual padding (Python-compatible: space padding)  
- Show/Hide master key  
- Copy output and Save output to file  
- AES step explanation popup  
- Clean cyber-console themed UI  

---

## 📂 Project Files

| File | Purpose |
|------|---------|
| **index.html** | UI layout & structure |
| **index.css**  | Styling & theme |
| **index.js**   | Encryption, decryption, key derivation, padding, UI logic |

---

## ▶️ How to Use

### **1. Open**
Simply open `index.html` in any modern browser.

### **2. Encryption**
1. Enter plaintext  
2. Enter master key  
3. Select key size (128 / 192 / 256)  
4. Choose mode (ECB / CBC)  
5. Click **Encrypt**  
6. Output appears in the output buffer  

### **3. Decryption**
- **ECB** → paste ciphertext  
- **CBC** → paste `IV_Base64:cipher_Base64`  
- Click **Decrypt**

---

## 📦 Requirements
No installation needed.  
Runs on any browser: Chrome, Firefox, Edge, Brave, etc.

---

## ⚠️ Security Notes
- **ECB is not secure** for real modern use.  
- Space padding is for demonstration; replace with PKCS7 in production.  
- Do not use weak or short keys.  
- Always deploy over HTTPS.

---

## 👨‍💻 Contributors
- **Jagadish**  
- **Mahesh**  
- **Kaif**  
- **Komal**
- **Harshith**  
SJC Institute of Technology

---

## 📜 License
MIT License 

