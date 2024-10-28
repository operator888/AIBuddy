export async function uploadImage(file: File): Promise<string> {
  // In a production environment, you'd upload to a proper storage service
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      localStorage.setItem('userAvatar', base64String);
      resolve(base64String);
    };
    reader.readAsDataURL(file);
  });
}

export function getUserAvatar(): string {
  return localStorage.getItem('userAvatar') || 
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&fit=crop";
}