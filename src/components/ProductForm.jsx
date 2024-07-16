import React, { useState } from 'react';
import './ProductForm.css'; // Importa el archivo CSS de estilos

const ProductForm = ({ addProduct, editProduct, setEditing }) => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !category || !price) return;
    if (editProduct) {
      editProduct({ productName, category, price: parseFloat(price) });
      setEditing(false);
    } else {
      addProduct({ productName, category, price: parseFloat(price) });
    }
    setProductName('');
    setCategory('');
    setPrice('');
  };

  return (
    <form className="product-form-container" onSubmit={handleSubmit}>
      <h2>{editProduct ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <input
        type="text"
        placeholder="Nombre del Producto"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Categoría"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit">{editProduct ? 'Guardar' : 'Agregar'}</button>
    </form>
  );
};

export default ProductForm;
