import { Amplify } from 'aws-amplify';
import { signUp, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';

// Initialize AWS Amplify using environment variables
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID || '',
      userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID || '',
    }
  }
});

export interface APIMenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: "appetizers" | "mains" | "cocktails" | "desserts";
  imageFileName?: string;
}

/**
 * Fetches the restaurant menu items from your API Gateway.
 */
export async function getMenu(): Promise<APIMenuItem[]> {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) {
    throw new Error("VITE_API_URL environment variable is not defined");
  }
  
  try {
    const response = await fetch(`${apiUrl}/menu`); // Calls your API Gateway GET /menu endpoint
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const menuItems = await response.json();
    return menuItems;
  } catch (error) {
    console.error("Failed to load menu items from API Gateway:", error);
    throw error;
  }
}

/**
 * Step A: Sign up a new user.
 * This triggers your verified SES mail system to dispatch an confirmation code.
 */
export async function registerCustomer(email: string, password: string, fullName: string) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: email, // Cognito treats the login identifier (email) as "username"
      password: password,
      options: {
        userAttributes: {
          email: email,
          name: fullName,
        }
      }
    });
    console.log("Verification email dispatched!");
    return { isSignUpComplete, userId, nextStep };
  } catch (error) {
    console.error("Cognito registration error:", error);
    throw error;
  }
}

/**
 * Step B: Verify the email code that your customer received.
 */
export async function verifyEmailCode(email: string, verificationCode: string): Promise<boolean> {
  try {
    const { isSignUpComplete } = await confirmSignUp({
      username: email,
      confirmationCode: verificationCode
    });
    console.log("Account activated successfully:", isSignUpComplete);
    return isSignUpComplete;
  } catch (error) {
    console.error("Code verification failed:", error);
    throw error;
  }
}

/**
 * Step C: Resend the verification email if the user didn't receive it.
 */
export async function resendEmailCode(email: string): Promise<void> {
  try {
    await resendSignUpCode({ username: email });
    console.log("A fresh verification code was sent to:", email);
  } catch (error) {
    console.error("Error resending code:", error);
    throw error;
  }
}

/**
 * Converts a database image filename (like "pizza.jpg") into a public S3 URL
 */
export function getFoodImageUrl(imageFileName: string): string {
  const bucketName = import.meta.env.VITE_S3_BUCKET_NAME;
  const region = import.meta.env.VITE_REGION;
  if (!bucketName || !region) {
    return "";
  }
  return `https://${bucketName}.s3.${region}.amazonaws.com/${imageFileName}`;
}
