// Function to escape HTML to prevent XSS
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function (match) {
      const escape = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };
      return escape[match];
    });
  }
  
  // Tab Navigation
  document.querySelectorAll('.tab-link').forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const tabId = this.getAttribute('data-tab');
  
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
  
      document.querySelectorAll('.tab-link').forEach(link => {
        link.classList.remove('active');
      });
  
      document.getElementById(tabId).classList.add('active');
      this.classList.add('active');
    });
  });
  
  // Form Validation
  document.getElementById('myForm').addEventListener('submit', function(event) {
    let valid = true;
  
    const productName = escapeHTML(document.getElementById('productName').value);
    const price = escapeHTML(document.getElementById('price').value);
    const quantity = escapeHTML(document.getElementById('quantity').value);
  
    if (productName.length < 3) {
      document.getElementById('productNameError').innerText = "Product name must be at least 3 characters.";
      valid = false;
    } else {
      document.getElementById('productNameError').innerText = "";
    }
  
    if (price <= 0) {
      document.getElementById('priceError').innerText = "Price must be greater than zero.";
      valid = false;
    } else {
      document.getElementById('priceError').innerText = "";
    }
  
    if (quantity <= 0) {
      document.getElementById('quantityError').innerText = "Quantity must be greater than zero.";
      valid = false;
    } else {
      document.getElementById('quantityError').innerText = "";
    }
  
    if (!valid) {
      event.preventDefault();
    }
  });
  
  // Dynamic Content Update
  document.getElementById('loadContent').addEventListener('click', function() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        const newContentDiv = document.getElementById('newContent');
        newContentDiv.innerHTML = "";
        data.slice(0, 5).forEach((item, index) => {
          const bgColorClass = `bg-color-${(index % 5) + 1}`;
          newContentDiv.innerHTML += `
            <div class="product-item ${bgColorClass}">
              <h3>${escapeHTML(item.title)}</h3>
              <p>${escapeHTML(item.body)}</p>
            </div>
          `;
        });
      })
      .catch(error => console.error('Error:', error));
  });
  