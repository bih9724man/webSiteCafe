// Lancer l'application quand le DOM est chargé
document.addEventListener('load',getProducts());

//Question 2 : 
// récupérer les données des produits depuis l'API
function getProducts() {
    fetch('https://fake-coffee-api.vercel.app/api')
        .then(response => response.json())
        .then(data => {
            products = data;
            displayProducts(products);
        })
        .catch(error => console.error('Erreur:', error));
}




//Question 3 : 
// Créer une carte de produit
function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
        <img src="${product.image_url}" alt="">
        <h3>${product.name}</h3>
        <div class="product-info">
            <h4 class="price">${product.price} DH</h4>
            <p class="description">${product.description}</p>
            <button class="add-to-cart">+</button>
        </div>
    `;
    return card;
}

// Afficher les produits
function displayProducts(products) {
    const productContainer = document.querySelector('.product-content');
    productContainer.innerHTML = '';
    products.forEach(product => {
        const card = createProductCard(product);
        productContainer.appendChild(card);
    });
}

//Question 4 :
// Mode view
// Ajouter les écouteurs d'événements aux icônes
document.getElementById("grid").addEventListener('click', setGridView);
document.getElementById("list").addEventListener('click', setListView);

function setGridView() {
    const container = document.querySelector('.product-content');
    container.style.display = "flex";
    container.style.flexDirection = "row";
    container.style.flexWrap = "wrap";
    container.style.justifyContent = "space-around";

    document.querySelectorAll('.product-card').forEach(card => {
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.style.width = "23%";  
        card.style.marginTop = "20px"; 
        card.querySelector('.product-info').style.alignItems = "flex-start";
        card.querySelector('.add-to-cart').style.alignSelf = "center";
        card.querySelector('.add-to-cart').style.bottom = "10px";
    });
}

// Fonction pour passer en vue liste
function setListView() {
    const container = document.querySelector('.product-content');
    container.style.display = "flex";
    container.style.flexDirection = "column";
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.display = "flex";
        card.style.flexDirection = "row";
        card.style.justifyContent = "space-between";
        card.style.width = "100%"; 
        card.style.marginTop = "10px"; 
        card.style.alignItems = "center";
        card.querySelector('.product-info').style.display = "flex";
        card.querySelector('.product-info').style.flexDirection = "column";
        card.querySelector('.description').style.alignSelf = "flex-end";
        card.querySelector('.description').style.marginRight = "10px";
        card.querySelector('.price').style.alignSelf = "flex-end";
        card.querySelector('.add-to-cart').style.alignSelf = "flex-end";
    });

    document.querySelectorAll('.product-card img').forEach(img => {
        img.style.maxWidth = "200px";
    });
}



// Initialiser la vue par défaut (grille)
setGridView();



//Question 5:
// Fonction pour filtrer les produits
function filterProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase(); // Récupère la valeur de recherche et la met en minuscule pour une recherche non sensible à la casse

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||  // Filtre par nom
        product.description.toLowerCase().includes(searchTerm)  // Filtre par description
    );

    displayProducts(filteredProducts); // Affiche les produits filtrés
}

// Écouteur d'événement pour le champ de recherche
document.getElementById('search-input').addEventListener('input', filterProducts);
document.getElementById('search-button').addEventListener('click', filterProducts);

