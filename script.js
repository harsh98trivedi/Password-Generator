    const lengthInput = document.getElementById('passwordLength');
    const lengthWarning = document.getElementById('passwordLengthWarning');
    const strengthIndicator = document.getElementById('passwordStrength');
    const generatedPasswordInput = document.getElementById('generatedPassword');
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');

    function generateCharset(uppercase, lowercase, numbers, symbols) {
      let charset = '';
      if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
      if (numbers) charset += '0123456789';
      if (symbols) charset += '!@#$₹%^&*()_-+=<>?';

      return charset.split('').sort(() => Math.random() - 0.5).join('');
    }

    function generateRandomPassword(length, charset) {
      if(!charset.length) return '';
      let password = '';
      for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      return password;
    }

    function getPasswordStrength(password) {
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSymbols = /[!@#$₹%^&*()_\-+=<>?]/.test(password);
      const length = password.length;

      if (hasUppercase && hasLowercase && hasNumbers && hasSymbols && length >= 18) {
        return `<span class="strength-indicator text-teal-700 bg-teal-100">Super Strong 😎</span>`;
      } else if (hasUppercase && hasLowercase && hasNumbers && length >= 14) {
        return `<span class="strength-indicator text-green-700 bg-green-100">Strong 😃</span>`;
      } else if (hasNumbers && hasUppercase && hasLowercase && length >= 10) {
        return `<span class="strength-indicator text-yellow-700 bg-yellow-100">Moderate 😐</span>`;
      } else if ((hasNumbers || hasUppercase || hasLowercase) && length >= 6) {
        return `<span class="strength-indicator text-red-600 bg-red-100">Weak 😟</span>`;
      } else {
        return `<span class="strength-indicator text-red-800 bg-red-200">Very Weak 😱</span>`;
      }
    }

    function generatePassword() {
      const length = +lengthInput.value;
      const uppercase = document.getElementById('uppercase').checked;
      const lowercase = document.getElementById('lowercase').checked;
      const numbers = document.getElementById('numbers').checked;
      const symbols = document.getElementById('symbols').checked;

      if (length < 5) {
        lengthWarning.textContent = 'Password length must be at least 5 characters.';
        lengthInput.setAttribute('aria-invalid', 'true');
        strengthIndicator.innerHTML = '';
        generatedPasswordInput.value = '';
        return;
      } else if (length > 64) {
        lengthWarning.textContent = 'Maximum password length is 64 characters.';
        lengthInput.setAttribute('aria-invalid', 'true');
        strengthIndicator.innerHTML = '';
        generatedPasswordInput.value = '';
        return;
      } else {
        lengthWarning.textContent = '';
        lengthInput.setAttribute('aria-invalid', 'false');
      }

      if (!uppercase && !lowercase && !numbers && !symbols) {
        lengthWarning.textContent = 'Please select at least one character type.';
        strengthIndicator.innerHTML = '';
        generatedPasswordInput.value = '';
        return;
      }

      const charset = generateCharset(uppercase, lowercase, numbers, symbols);
      const password = generateRandomPassword(length, charset);

      generatedPasswordInput.value = password;
      strengthIndicator.innerHTML = `${getPasswordStrength(password)}`;
    }

    function copyToClipboard() {
      if (!generatedPasswordInput.value) return;
      navigator.clipboard.writeText(generatedPasswordInput.value).then(() => {
        copyBtn.innerHTML = `<i class="fa-solid fa-check" aria-hidden="true"></i>`;
        copyBtn.setAttribute("aria-label", "Copied!");
        setTimeout(() => {
          copyBtn.innerHTML = `<i class="far fa-copy" aria-hidden="true"></i>`;
          copyBtn.setAttribute("aria-label", "Copy password to clipboard");
        }, 1500);
      });
    }

    generateBtn.addEventListener('click', generatePassword);
    copyBtn.addEventListener('click', copyToClipboard);

    // Generate initial password on load
    window.addEventListener('load', generatePassword);