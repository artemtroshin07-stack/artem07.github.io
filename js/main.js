new Vue({
    el: '#app',
    data: {
       products: [
            { 
                id: 1, 
                title: "Cavendish Banana", 
                short_text: "Classic & sweet", 
                image: "img/t-all/1.jpg", 
                desc: "The most popular yellow banana, perfect for a quick snack.", 
                characteristics: { 
                    resistance: ["High resistance to Panama disease (Race 1)", "Tolerant to Yellow Sigatoka"], 
                    plant: ["Robust pseudostem.", "High yield potential with large bunches."], 
                    cycle: ["All year round"], 
                    fruit: ["Long shelf life post harvest.", "Bright yellow color when ripe.", "Average fruit length: 15 – 25 cm."], 
                    color: "Yellow" 
                } 
            },
            { 
                id: 2, 
                title: "Red Banana", 
                short_text: "Sweet & berry-like", 
                image: "img/t-all/12345.jpg", 
                desc: "A sweet banana with a slight hint of raspberry flavor.", 
                characteristics: { 
                    resistance: ["Moderate resistance to common pests."], 
                    plant: ["Strong, thick trunk.", "Takes longer to mature than regular bananas."], 
                    cycle: ["All year round"], 
                    fruit: ["Creamy texture with a pinkish tint inside.", "Deep red or purplish skin.", "Plumper and slightly smaller than Cavendish."], 
                    color: "Red/Purple" 
                } 
            },
            { 
                id: 3, 
                title: "Plantain", 
                short_text: "Starchy, for cooking", 
                image: "img/t-all/1234.jpg", 
                desc: "A starchy banana best enjoyed fried, boiled, or baked.", 
                characteristics: { 
                    resistance: ["High resistance to Black Weevil.", "Tolerant to drought."], 
                    plant: ["Vigorous growth.", "Produces heavy, dense bunches."], 
                    cycle: ["All year round"], 
                    fruit: ["Thick skin, green to black depending on ripeness.", "Firm, starchy flesh.", "Larger average size, up to 30 cm."], 
                    color: "Green/Yellow" 
                } 
            },
            { 
                id: 4, 
                title: "Baby Banana", 
                short_text: "Extra sweet", 
                image: "img/t-all/12.jpg", 
                desc: "Bite-sized bananas with a dense, exceptionally sweet flavor.", 
                characteristics: { 
                    resistance: ["Susceptible to standard fungal diseases.", "Needs warm climate."], 
                    plant: ["Slightly smaller plant structure.", "Fast-maturing variety."], 
                    cycle: ["Summer", "Fall"], 
                    fruit: ["Very thin skin.", "Exceptionally sweet and creamy flesh.", "Average fruit length: 7 – 10 cm."], 
                    color: "Yellow" 
                } 
            },
            { 
                id: 5, 
                title: "Blue Java Banana", 
                short_text: "Vanilla flavor", 
                image: "img/t-all/123.jpg", 
                desc: "Often called the 'Ice Cream Banana' for its rich vanilla taste.", 
                characteristics: { 
                    resistance: ["Cold tolerant compared to other varieties.", "Wind resistant."], 
                    plant: ["High vigor with a strong root system.", "Can grow in cooler subtropical climates."], 
                    cycle: ["Spring", "Summer"], 
                    fruit: ["Silvery-blue skin when unripe.", "Soft, melting texture.", "Sweet vanilla-like flavor."], 
                    color: "Blue/Pale Yellow" 
                } 
            }
        ],
        product: {},
        cart: JSON.parse(localStorage.getItem('cart')) || {},
        cartBtnText: "Add to Cart",
        cartPageLink: "contact.html",
        orderPlaced: false,
        contactFields: { name: '', telephone: '', email: '', message: '', captcha: '' }
    },
    methods: {
        getProduct() {
            const productId = +window.location.hash.replace('#', '');
            this.product = this.products.find(p => p.id === productId) || {};
            this.updateCartButton();
        },
        updateCartButton() {
            this.cartBtnText = this.product.id && this.cart[this.product.id] ? "Go to Cart" : "Add to Cart";
        },
        addToCart(id) {
            if (!this.cart[id]) this.cart[id] = { ...this.products.find(p => p.id === id), quantity: 0 };
            this.cart[id].quantity++;
            this.saveCart();
            this.updateCartButton();
        },
        removeFromCart(id) {
            Vue.delete(this.cart, id);
            this.saveCart();
        },
        saveCart() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        goToCart() {
            window.location.href = this.cartPageLink;
        },
        makeOrder() {
            this.cart = {};
            localStorage.removeItem('cart');
            this.orderPlaced = true;
        },
        submitForm() {
            if (Object.values(this.contactFields).some(field => !field)) return;
            this.makeOrder();
        }
    },
    mounted() {
        this.getProduct();
    }
});