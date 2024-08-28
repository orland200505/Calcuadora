const products = [
    { code: '1101', name: 'Globo R12 Normal', price: 500 },
    { code: '1102', name: 'Globo R12 Normal Estampado', price: 1000 },
    { code: '1103', name: 'Globo R12 Cromado', price: 1200 },
    { code: '1104', name: 'Globo R12 Cromado Estampado', price: 1500 },
    { code: '1105', name: 'Globo R9 Normal', price: 300 },
    { code: '1106', name: 'Globo R5 Normal', price: 200 },
    { code: '1107', name: 'Globo R5 Cromado', price: 600 },
    { code: '1108', name: 'Mil figura Normal', price: 400 },
    { code: '1109', name: 'Mil figura Cromado', price: 600 },
    { code: '1110', name: 'Helio', price: null },
    { code: '1111', name: 'Metalizado', price: null },
    { code: '1112', name: 'Mano de Obra', price: null },
    { code: '1113', name: 'Pesa de agua Normal', price: 1200 },
    { code: '1114', name: 'Pesa de agua Cromada', price: 1600 },
    { code: '1115', name: 'Burbuja 18"', price: 2000 },
    { code: '1116', name: 'Burbuja 24"', price: 2500 },
    { code: '1117', name: 'Escarcha', price: 1500 },
    { code: '1118', name: 'Vinilo', price: null }
];

let selectedProduct = null;

document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    const foundProducts = products.filter(product =>
        product.code.includes(searchTerm) || product.name.toLowerCase().includes(searchTerm)
    );

    if (foundProducts.length > 0) {
        foundProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.textContent = ${product.name} (Código: ${product.code}) - $${product.price ? product.price : '(Añadible)'};
            productItem.addEventListener('click', () => {
                selectedProduct = product;
                document.getElementById('quantity').value = 1;
                if (selectedProduct.price === null) {
                    document.getElementById('price-input-container').style.display = 'block';
                } else {
                    document.getElementById('price-input-container').style.display = 'none';
                }
            });
            productList.appendChild(productItem);
        });
    } else {
        productList.textContent = 'Producto no encontrado';
    }
});

document.getElementById('add-product-form').addEventListener('submit', function(e) {
    e.preventDefault();
    if (!selectedProduct) {
        alert('Selecciona un producto primero');
        return;
    }

    const quantity = parseInt(document.getElementById('quantity').value);
    let price = selectedProduct.price;

    if (price === null) {
        price = parseFloat(document.getElementById('price').value);
        if (isNaN(price)) {
            alert('Por favor, ingresa un precio válido');
            return;
        }
    }

    const cartList = document.getElementById('cart-list');
    const listItem = document.createElement('li');
    listItem.textContent = ${selectedProduct.name} x ${quantity} = $${(price * quantity).toFixed(2)};
    cartList.appendChild(listItem);

    const totalElement = document.getElementById('total');
    const currentTotal = parseFloat(totalElement.textContent);
    totalElement.textContent = (currentTotal + price * quantity).toFixed(2);
});