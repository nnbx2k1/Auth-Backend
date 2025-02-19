export function validateUsername(username) {
    if (!username || username.length < 3) {
      return { valid: false, message: "Username must be at least 3 characters long." };
    }
  
    const usernameRegex = /^[a-zA-Z0-9_]+$/; // Allows alphanumeric and underscores
    if (!usernameRegex.test(username)) {
      return { valid: false, message: "Username can only contain letters, numbers, and underscores." };
    }
  
    return { valid: true, message: "Username is valid." };
  }

export function validatePassword(password) {
    // Check if password is not empty and has a minimum length of 8 characters
    if (!password || password.length < 8) {
      return { valid: false, message: "Password must be at least 8 characters long." };
    }
  
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: "Password must contain at least one uppercase letter." };
    }
  
    // Check for at least one number
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: "Password must contain at least one number." };
    }
  
    // Check for at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return { valid: false, message: "Password must contain at least one special character." };
    }
  
    return { valid: true, message: "Password is valid." };
  }  