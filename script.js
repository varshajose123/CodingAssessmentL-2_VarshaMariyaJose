document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab");
    const productCards = document.getElementById("product-cards");

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            const category = this.dataset.category;
            displayProducts(category);
        });
    });

    function displayProducts(category) {
        // Clear existing product cards
        productCards.innerHTML = "";

        // Fetch products for the selected category from API
        fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
            .then(response => response.json())
            .then(data => {
                data.categories.forEach(cat => {
                    if (cat.category_name === category) {
                        cat.category_products.forEach(product => {
                            const productCard = createProductCard(product);
                            productCards.appendChild(productCard);
                        });
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    function createProductCard(product) {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.title;
        productCard.appendChild(img);

        if (product.badge_text) {
            const badge = document.createElement("div");
            badge.classList.add("badge");
            badge.textContent = product.badge_text;
            productCard.appendChild(badge);
        }

        const title = document.createElement("div");
        title.classList.add("title");
        title.textContent = product.title;
        productCard.appendChild(title);

        const vendor = document.createElement("div");
        vendor.textContent = "Vendor: " + product.vendor;
        productCard.appendChild(vendor);

        const price = document.createElement("div");
        price.classList.add("price");
        price.textContent = "Price: $" + product.price;
        productCard.appendChild(price);

        const comparePrice = document.createElement("div");
        comparePrice.classList.add("compare-price");
        comparePrice.textContent = "Compare at: $" + product.compare_at_price;
        productCard.appendChild(comparePrice);

        const discount = document.createElement("div");
        discount.classList.add("discount");
        const discountValue = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
        discount.textContent = `(${discountValue}% Off)`;
        productCard.appendChild(discount);

        const addToCartBtn = document.createElement("button");
        addToCartBtn.classList.add("add-to-cart");
        addToCartBtn.textContent = "Add to Cart";
        productCard.appendChild(addToCartBtn);

        return productCard;
    }

    // Initially display products for the "Men" category
    displayProducts("Men");
});
