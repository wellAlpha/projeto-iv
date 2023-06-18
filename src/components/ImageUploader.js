import React, { useState } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";

function ImageUploader({ onImageUpload }) {
  const cloudName = process.env.REACT_APP_CLOUDNAME;
  const presentName = process.env.REACT_APP_UPLOAD_PRESENT;
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", presentName); // Substitua pelo seu upload preset

    // Envia o arquivo para o Cloudinary
    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Extrai o URL da imagem do resultado
        const imageUrl = data.secure_url;

        // Chama a função de retorno de chamada com a URL da imagem
        onImageUpload(imageUrl);

        // Salva o URL da imagem no estado do componente ou faz qualquer outra operação necessária
        setImageUrl(imageUrl);
      })
      .catch((error) => {
        console.error("Erro ao enviar imagem:", error);
      });
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {imageUrl && (
        <CloudinaryContext cloudName={cloudName}>
          <Image publicId={imageUrl} width="300" height="200" />
        </CloudinaryContext>
      )}
    </div>
  );
}

export default ImageUploader;
