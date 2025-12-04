// --- Helper: pad text to multiple of 16 bytes (like your Python pad()) ---
function padToBlockSize(text) {
  while (text.length % 16 !== 0) {
    text += " ";
  }
  return text;
}

// --- Helper: get selected key size in bits ---
function getKeySize() {
  const radios = document.querySelectorAll('input[name="keySize"]');
  for (const r of radios) {
    if (r.checked) return parseInt(r.value, 10);
  }
  return 128;
}

// --- Helper: get selected mode (ECB / CBC) ---
function getMode() {
  const radios = document.querySelectorAll('input[name="mode"]');
  for (const r of radios) {
    if (r.checked) return r.value;
  }
  return "ECB";
}

// --- Helper: derive key (pad with spaces & cut to N bytes, like Python) ---
function deriveKey() {
  const keyText = document.getElementById("keyInput").value;
  const keySizeBits = getKeySize();
  if (!keyText) {
    alert("Please enter a key.");
    throw new Error("Missing key");
  }
  const neededBytes = keySizeBits / 8;
  let padded = keyText;
  while (padded.length < neededBytes) {
    padded += " ";
  }
  padded = padded.slice(0, neededBytes);
  // Convert to CryptoJS WordArray
  return CryptoJS.enc.Utf8.parse(padded);
}

// --- Helper: update mode label + show info ---
function updateModeDisplay(mode) {
  document.getElementById("modeDisplay").textContent = "Current Mode: " + mode;
}

// --- Helper: set output text ---
function setOutput(text) {
  document.getElementById("outputText").value = text;
}

// --- Encrypt handler ---
function handleEncrypt() {
  try {
    const inputEl = document.getElementById("inputText");
    let message = inputEl.value.trim();

    if (!message) {
      alert("Please enter a message to encrypt.");
      return;
    }

    const key = deriveKey();
    const mode = getMode();

    // Match Python behavior: manual space-padding of plaintext, then NoPadding in AES
    const paddedMessage = padToBlockSize(message);
    const messageWordArray = CryptoJS.enc.Utf8.parse(paddedMessage);

    let options = {
      mode: mode === "ECB" ? CryptoJS.mode.ECB : CryptoJS.mode.CBC,
      padding: CryptoJS.pad.NoPadding,
    };

    let iv = null;
    if (mode === "CBC") {
      iv = CryptoJS.lib.WordArray.random(16);
      options.iv = iv;
    }

    const encrypted = CryptoJS.AES.encrypt(messageWordArray, key, options);
    const cipherBase64 = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

    let finalOutput;
    if (mode === "CBC") {
      const ivBase64 = iv.toString(CryptoJS.enc.Base64);
      finalOutput = ivBase64 + ":" + cipherBase64;
    } else {
      finalOutput = cipherBase64;
    }

    setOutput(finalOutput);
    updateModeDisplay(mode);
  } catch (err) {
    console.error(err);
    alert("Encryption error: " + err.message);
  }
}

// --- Decrypt handler ---
function handleDecrypt() {
  try {
    const inputEl = document.getElementById("inputText");
    const input = inputEl.value.trim();

    if (!input) {
      alert("Please enter ciphertext to decrypt.");
      return;
    }

    const key = deriveKey();
    const mode = getMode();

    let cipherBase64;
    let iv = null;

    if (mode === "CBC") {
      const parts = input.split(":");
      if (parts.length !== 2) {
        alert(
          "Invalid CBC ciphertext format. Expected IV_Base64:Ciphertext_Base64"
        );
        return;
      }
      const ivBase64 = parts[0];
      cipherBase64 = parts[1];
      iv = CryptoJS.enc.Base64.parse(ivBase64);
    } else {
      cipherBase64 = input;
    }

    const cipherWordArray = CryptoJS.enc.Base64.parse(cipherBase64);
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: cipherWordArray,
    });

    let options = {
      mode: mode === "ECB" ? CryptoJS.mode.ECB : CryptoJS.mode.CBC,
      padding: CryptoJS.pad.NoPadding,
    };
    if (mode === "CBC") {
      options.iv = iv;
    }

    const decrypted = CryptoJS.AES.decrypt(cipherParams, key, options);

    let decryptedText = CryptoJS.enc.Utf8.stringify(decrypted);
    // Remove trailing spaces (like Python .rstrip())
    decryptedText = decryptedText.replace(/\s+$/g, "");

    setOutput(decryptedText);
    updateModeDisplay(mode);
  } catch (err) {
    console.error(err);
    alert("Decryption error: " + err.message);
  }
}

// --- Copy output handler ---
function handleCopy() {
  const text = document.getElementById("outputText").value.trim();
  if (!text) {
    alert("Nothing to copy!");
    return;
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Output copied to clipboard!"))
      .catch((err) => alert("Failed to copy: " + err));
  } else {
    // Fallback
    const temp = document.createElement("textarea");
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    alert("Output copied to clipboard!");
  }
}

// --- Save output handler (download as .txt) ---
function handleSave() {
  const text = document.getElementById("outputText").value.trim();
  if (!text) {
    alert("Nothing to save!");
    return;
  }
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "aes_output.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// --- Show AES steps (like your messagebox) ---
function handleSteps() {
  alert(
    "AES performs these main steps per round:\n\n" +
      "1️⃣ SubBytes – Nonlinear substitution using S-box.\n" +
      "2️⃣ ShiftRows – Rows of the state matrix are shifted.\n" +
      "3️⃣ MixColumns – Columns are mixed using matrix multiplication.\n" +
      "4️⃣ AddRoundKey – Round key is XORed with the state.\n\n" +
      "You can illustrate this with diagrams or animations in your presentation."
  );
}

// --- Show / Hide Master Key toggle ---
function initToggleKey() {
  const keyInputEl = document.getElementById("keyInput");
  const toggleKeyBtn = document.getElementById("toggleKeyBtn");
  if (!keyInputEl || !toggleKeyBtn) return;

  toggleKeyBtn.addEventListener("click", () => {
    if (keyInputEl.type === "password") {
      keyInputEl.type = "text";
      toggleKeyBtn.textContent = "HIDE";
    } else {
      keyInputEl.type = "password";
      toggleKeyBtn.textContent = "SHOW";
    }
  });
}

// --- Attach events after DOM is loaded ---
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("encryptBtn")
    .addEventListener("click", handleEncrypt);
  document
    .getElementById("decryptBtn")
    .addEventListener("click", handleDecrypt);
  document.getElementById("copyBtn").addEventListener("click", handleCopy);
  document.getElementById("saveBtn").addEventListener("click", handleSave);
  document.getElementById("stepsBtn").addEventListener("click", handleSteps);
  initToggleKey();
});
