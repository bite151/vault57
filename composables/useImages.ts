import Compressor from 'compressorjs'

export function useImages() {
  const imageCompress = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        width: 1200,
        height: 1200,
        quality: 100,
        convertSize: 1024 * 1024 * 1.5,
        success(result: File | Blob) {
          const compressedFile = new File([result], file.name, {
            type: result.type,
            lastModified: Date.now(),
          });
          resolve(compressedFile);
        },
        error(error: Error) {
          reject(error);
        }
      })
    })
  }
  
  const checkTypes = (
    file: File,
    types = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'],
    validExtensions = ['.png', '.jpg', '.jpeg', '.webp']
  ) => {
    if (!types.includes(file.type.toLowerCase())) {
      return true;
    }

    const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    return !validExtensions.includes(fileExtension);
  }
  
  const toBase64 = async (image: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image)
      reader.onloadend = () => {
        const base64data = reader.result
        if (!base64data) {
          return reject(new Error(`No base64 data found for ${image}`));
        }
        resolve(base64data.toString());
      }
    })
  }
  
  return { checkTypes, imageCompress, toBase64 }
}
