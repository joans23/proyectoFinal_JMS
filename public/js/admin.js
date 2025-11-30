const API = "https://proyecto-final-jms.vercel.app";

let TOKEN = null;
let USER_ROLE = null;

function openUserModal() {
    document.getElementById("userModal").classList.remove("hidden");
}

function closeUserModal() {
    document.getElementById("userModal").classList.add("hidden");

    // limpiar datos
    document.getElementById("new-username").value = "";
    document.getElementById("new-password").value = "";
    document.getElementById("new-role").value = "user";
    document.getElementById("userStatus").innerText = "";
}

async function createUser() {
    if (USER_ROLE !== "admin") {
        alert("Acceso prohibido.");
        return;
    }

    const username = document.getElementById("new-username").value.trim();
    const password = document.getElementById("new-password").value.trim();
    const role = document.getElementById("new-role").value;

    if (!username || !password) {
        document.getElementById("userStatus").innerText = "Todos los campos son obligatorios.";
        return;
    }

    const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password, role })
    });

    const data = await res.json();

    if (!res.ok) {
        document.getElementById("userStatus").innerText = data.message;
        return;
    }

    alert("Usuario creado correctamente");

    closeUserModal();
}
// ---------------------------
// LOGIN
// ---------------------------
async function login() {
    const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        })
    });

    const data = await res.json();

    if (res.ok) {
        TOKEN = data.token;
        USER_ROLE = data.user.role;

        // Guardar en localStorage
        localStorage.setItem("token", TOKEN);
        localStorage.setItem("role", USER_ROLE);

        // Guardar tiempo del login
        localStorage.setItem("loginTime", Date.now());
        localStorage.setItem("sessionDuration", 30 * 60 * 1000); // 30 min

        document.getElementById("loginModal").classList.add("hidden");

        if (USER_ROLE === "admin") {
            document.getElementById("adminSection").classList.remove("hidden");
        }

        loadProducts();
    } else {
        document.getElementById("loginStatus").innerText = data.message;
    }
}

// ---------------------------
// EDITAR PRODUCTO
// ---------------------------
function openEditModal(id) {
    const product = window.cachedProducts.find(p => p.id === id);

    document.getElementById("edit-id").value = id;
    document.getElementById("edit-nombre").value = product.nombre;
    document.getElementById("edit-categoria").value = product.categoria;
    document.getElementById("edit-descripcion").value = product.descripcion;
    document.getElementById("edit-precio").value = product.precio;
    document.getElementById("edit-stock").value = product.stock;

    document.getElementById("editModal").classList.remove("hidden");
}

function closeEditModal() {
    document.getElementById("editModal").classList.add("hidden");
}

async function saveProductChanges() {
    const id = document.getElementById("edit-id").value;

    const updatedFields = {
        nombre: document.getElementById("edit-nombre").value,
        categoria: document.getElementById("edit-categoria").value,
        descripcion: document.getElementById("edit-descripcion").value,
        precio: Number(document.getElementById("edit-precio").value),
        stock: Number(document.getElementById("edit-stock").value)
    };

    const res = await fetch(`${API}/api/products/${id}`, {
        method: "PUT",
        headers: {
            Authorization: TOKEN,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedFields)
    });

    const data = await res.json();
    alert(data.message ?? "Producto actualizado");

    closeEditModal();
    loadProducts();
}

// ---------------------------
// LISTAR PRODUCTOS
// ---------------------------
async function loadProducts() {
    const res = await fetch(`${API}/api/products`, {
        headers: { Authorization: TOKEN }
    });

    const products = await res.json();
    window.cachedProducts = products;

    const container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach((p) => {
        container.innerHTML += `
      <div class="border p-4 rounded shadow-sm flex justify-between items-center">
        <div>
          <p class="font-bold">${p.nombre}</p>
          <p class="text-gray-600">$${p.precio}</p>
          <p class="text-gray-600">${p.descripcion}</p>
          <p class="text-gray-600">Categoría: ${p.categoria}</p>
          <p class="text-gray-600">Stock: ${p.stock}</p>
        </div>

        ${USER_ROLE === "admin"
                ? `
            <div class="flex gap-2">
              <button onclick="openEditModal('${p.id}')"
                  class="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600">
                  Editar
              </button>

              <button onclick="deleteProduct('${p.id}')"
                class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                Eliminar
              </button>
            </div>
            `
                : ""
            }
      </div>
    `;
    });
}

// ---------------------------
// CREAR PRODUCTO
// ---------------------------
function validateProductForm() {
    const required = ["nombre", "precio", "stock", "categoria", "descripcion"];

    for (let id of required) {
        const value = document.getElementById(id).value.trim();
        if (!value) {
            alert("Todos los campos son obligatorios");
            return false;
        }
    }
    return true;
}

function clearProductForm() {
    document.getElementById("nombre").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
}

async function createProduct() {
    if (!validateProductForm()) return;

    const res = await fetch(`${API}/api/products/create`, {
        method: "POST",
        headers: {
            Authorization: TOKEN,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: document.getElementById("nombre").value,
            categoria: document.getElementById("categoria").value,
            descripcion: document.getElementById("descripcion").value,
            stock: Number(document.getElementById("stock").value),
            precio: Number(document.getElementById("precio").value)
        })
    });

    const data = await res.json();
    alert(data.message ?? "Producto creado");

    clearProductForm();
    loadProducts();
}

// ---------------------------
// ELIMINAR PRODUCTO
// ---------------------------
async function deleteProduct(id) {
    if (!confirm("¿Eliminar producto?")) return;

    const res = await fetch(`${API}/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: TOKEN }
    });

    const data = await res.json();
    alert(data.message);

    loadProducts();
}

// ---------------------------
// SESIÓN / LOGIN MODAL
// ---------------------------
function checkSession() {
    const loginTime = localStorage.getItem("loginTime");
    const duration = localStorage.getItem("sessionDuration");

    if (!loginTime) return false;

    const expireAt = Number(loginTime) + Number(duration);

    return Date.now() < expireAt;
}

function logout() {
    localStorage.clear();
    location.reload();
}

window.onload = () => {
    document.getElementById("logoutBtn").classList.remove("hidden");
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    // Si no hay sesión o expiró → abrir modal
    if (!savedToken || !checkSession()) {
        localStorage.clear();
        document.getElementById("loginModal").classList.remove("hidden");
        return;
    }

    TOKEN = savedToken;
    USER_ROLE = savedRole;

    document.getElementById("loginModal").classList.add("hidden");

    if (USER_ROLE === "admin") {
        document.getElementById("adminSection").classList.remove("hidden");
    }

    loadProducts();
};
