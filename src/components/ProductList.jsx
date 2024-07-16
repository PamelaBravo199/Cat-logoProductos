import React, { useState, useEffect } from 'react';
import './ProductList.css'; // Importa el archivo CSS de estilos

const ProductList = ({ products, deleteProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    productName: '',
    category: '',
    price: '',
  });
  const [sortOrder, setSortOrder] = useState('asc'); // Estado para controlar el orden ascendente o descendente
  const [currentPage, setCurrentPage] = useState(1); // Estado para controlar la página actual
  const [productsPerPage] = useState(5); // Cantidad de productos por página

  useEffect(() => {
    if (products && products.length > 0) {
      const results = products.filter(product =>
        product.productName && product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  const handleDelete = (productId) => {
    deleteProduct(productId);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditFormData({
      productName: product.productName,
      category: product.category,
      price: product.price,
    });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditFormData({
      productName: '',
      category: '',
      price: '',
    });
  };

  const handleSaveEdit = () => {
    const updatedProduct = {
      id: editingProduct.id,
      productName: editFormData.productName,
      category: editFormData.category,
      price: parseFloat(editFormData.price),
    };
    // Implementa la lógica para guardar el producto editado en tu base de datos o en el estado global de la aplicación
    // Por simplicidad, actualizaremos solo el estado localmente
    const updatedProducts = products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setFilteredProducts(updatedProducts);
    setEditingProduct(null);
    setEditFormData({
      productName: '',
      category: '',
      price: '',
    });
  };

  const handleChangeEditForm = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleSortByName = () => {
    const sorted = [...filteredProducts].sort((a, b) => {
      const nameA = a.productName.toLowerCase();
      const nameB = b.productName.toLowerCase();
      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    setFilteredProducts(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Lógica para obtener los productos de la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="product-list-container">
      <input
        type="text"
        placeholder="Buscar Producto..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSortByName}>
        Ordenar por Nombre {sortOrder === 'asc' ? '↓' : '↑'}
      </button>
      <div className="product-card-list">
        {currentProducts.map(product => (
          <div key={product.id} className="product-card">
            {editingProduct && editingProduct.id === product.id ? (
              <div>
                <input
                  type="text"
                  placeholder="Nombre del Producto"
                  name="productName"
                  value={editFormData.productName}
                  onChange={handleChangeEditForm}
                />
                <input
                  type="text"
                  placeholder="Categoría"
                  name="category"
                  value={editFormData.category}
                  onChange={handleChangeEditForm}
                />
                <input
                  type="number"
                  placeholder="Precio"
                  name="price"
                  value={editFormData.price}
                  onChange={handleChangeEditForm}
                />
                <button onClick={handleSaveEdit}>Guardar</button>
                <button onClick={handleCancelEdit}>Cancelar</button>
              </div>
            ) : (
              <div>
                <h3>{product.productName}</h3>
                <p>Categoría: {product.category}</p>
                <p>Precio: ${product.price}</p>
                <button onClick={() => handleEdit(product)}>Editar</button>
                <button onClick={() => handleDelete(product.id)}>Eliminar</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Paginación */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
