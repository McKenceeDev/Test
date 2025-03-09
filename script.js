// Funcionalidad principal para GM Connect

// Event listeners y funciones cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar las pestañas y contenidos
    initTabs();
    
    // Cargar datos iniciales
    loadVehicles();
    loadInventory();
    loadServices();
    loadServiceClients();
    
    // Inicializar íconos en las tarjetas de estadísticas
    initStatIcons();
    
    // Event listeners para búsqueda
    initSearchListeners();
    
    // Event listeners para login modal
    initLoginModal();
    
    // Selector de perfiles
    initProfileSelector();
});

// Inicializar pestañas
function initTabs() {
    // Asignar event listeners a las pestañas
    document.querySelectorAll('.tab-trigger').forEach(tab => {
        tab.addEventListener('click', function() {
            switchTab(this.getAttribute('data-tab'));
        });
    });
}

// Cambiar entre pestañas
function switchTab(tabId) {
    // Ocultar todos los contenidos
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Desactivar todos los triggers
    document.querySelectorAll('.tab-trigger').forEach(trigger => {
        trigger.classList.remove('active');
    });
    
    // Activar el contenido seleccionado
    document.getElementById(tabId).classList.add('active');
    
    // Activar el trigger seleccionado
    document.querySelector(`.tab-trigger[data-tab="${tabId}"]`).classList.add('active');
}

// Inicializar modal de login
function initLoginModal() {
    const modal = document.getElementById('login-modal');
    const closeBtn = modal.querySelector('.close-btn');
    
    // Evento para cerrar el modal
    closeBtn.addEventListener('click', toggleLogin);
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            toggleLogin();
        }
    });
}

// Mostrar/ocultar modal de login
function toggleLogin() {
    const modal = document.getElementById('login-modal');
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'flex';
    }
}

// Inicializar el selector de perfiles
function initProfileSelector() {
    const profileSelect = document.getElementById('profile-select');
    profileSelect.addEventListener('change', changeProfile);
    
    // Iniciar con el perfil seleccionado
    changeProfile();
}

// Cambiar el perfil de usuario
function changeProfile() {
    const profileSelect = document.getElementById('profile-select');
    const profile = profileSelect.value;
    const flotaTab = document.querySelector('.flota-tab');
    
    // Cambiar visibilidad de pestañas según perfil
    if (profile === 'flota') {
        flotaTab.style.display = 'flex';
        document.getElementById('user-name').textContent = 'Empresa XYZ';
    } else {
        flotaTab.style.display = 'none';
        
        if (profile === 'cliente') {
            document.getElementById('user-name').textContent = 'Juan Pérez';
        } else if (profile === 'concesionario') {
            document.getElementById('user-name').textContent = 'Concesionario Bogotá';
        }
    }
    
    // Cambiar a pestaña relevante para el perfil
    if (profile === 'cliente') {
        switchTab('compra');
    } else if (profile === 'flota') {
        switchTab('flota');
    } else if (profile === 'concesionario') {
        switchTab('concesionario');
    }
}

// Inicializar los íconos en las tarjetas de estadísticas
function initStatIcons() {
    const statCards = document.querySelectorAll('.stat-card');
    
    if (statCards.length >= 4) {
        for (let i = 0; i < statCards.length && i < statIcons.length; i++) {
            const divElement = document.createElement('div');
            divElement.className = 'stat-icon';
            divElement.innerHTML = statIcons[i];
            
            // Insertar el icono al principio de la tarjeta
            statCards[i].insertBefore(divElement, statCards[i].firstChild);
        }
    }
}

// Inicializar los event listeners para las búsquedas
function initSearchListeners() {
    // Búsqueda de vehículos
    document.getElementById('search-vehicle').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const vehicleCards = document.querySelectorAll('#vehicles-grid .vehicle-card');
        
        vehicleCards.forEach(card => {
            const nameText = card.querySelector('h3').textContent.toLowerCase();
            if (nameText.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Búsqueda de placas en servicio postventa
    document.getElementById('search-plate').addEventListener('input', loadServices);
    
    // Búsqueda en inventario
    document.getElementById('search-inventory').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const inventoryItems = document.querySelectorAll('#inventory-grid .card-small');
        
        inventoryItems.forEach(item => {
            const modelText = item.querySelector('h3').textContent.toLowerCase();
            if (modelText.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Cargar vehículos en la sección de compra
function loadVehicles() {
    const vehiclesGrid = document.getElementById('vehicles-grid');
    vehiclesGrid.innerHTML = '';
    
    vehicles.forEach(vehicle => {
        const vehicleCard = document.createElement('div');
        vehicleCard.className = 'vehicle-card';
        vehicleCard.innerHTML = `
            <div class="vehicle-img" style="background-image: url('${vehicleImages[vehicle.model]}')"></div>
            <div class="vehicle-info">
                <h3>${vehicle.name}</h3>
                <p class="price">${vehicle.price}</p>
                <button class="btn" style="width:100%; margin-top:10px;">Ver Detalles</button>
            </div>
        `;
        vehiclesGrid.appendChild(vehicleCard);
    });
}

// Cargar inventario en la sección de concesionario
function loadInventory() {
    const inventoryGrid = document.getElementById('inventory-grid');
    inventoryGrid.innerHTML = '';
    
    inventory.forEach(item => {
        const inventoryCard = document.createElement('div');
        inventoryCard.className = 'card-small';
        inventoryCard.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <div style="width:50px; height:50px; background-image:url('${vehicleImages[item.model]}'); background-size:cover; background-position:center; border-radius:4px;"></div>
                <h3>${item.model}</h3>
            </div>
            <p>Cantidad Disponible: ${item.count}</p>
            <p>Colores Disponibles: ${item.colors.join(', ')}</p>
            <p>Ubicación: ${item.location}</p>
            <div style="display:flex; gap:10px; margin-top:10px;">
                <button class="btn">Gestionar</button>
                <button class="btn btn-secondary">Ver Detalles</button>
            </div>
        `;
        inventoryGrid.appendChild(inventoryCard);
    });
}

// Cargar servicios en la sección de postventa
function loadServices() {
    const serviceResults = document.getElementById('service-results');
    serviceResults.innerHTML = '';
    
    const searchPlate = document.getElementById('search-plate').value.toUpperCase();
    
    const filteredServices = services.filter(service => 
        service.plate.toUpperCase().includes(searchPlate)
    );
    
    if (filteredServices.length === 0 && searchPlate) {
        serviceResults.innerHTML = '<p>No se encontraron vehículos con esa placa.</p>';
        return;
    }
    
    filteredServices.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'card-small';
        serviceCard.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <div style="width:50px; height:50px; background-image:url('${vehicleImages[service.model]}'); background-size:cover; background-position:center; border-radius:4px;"></div>
                <h3>Placa: ${service.plate} (${service.model})</h3>
            </div>
            <p>Procesos Completados: ${service.completed.join(', ')}</p>
            <p>Proceso Pendiente: ${service.pending}</p>
            <p>Tiempo Estimado de Entrega: ${service.estimatedTime}</p>
            <div class="progress-container">
                <div class="progress-bar" style="width: ${service.progress}%"></div>
            </div>
            <p style="text-align:right;">${service.progress}% completado</p>
        `;
        serviceResults.appendChild(serviceCard);
    });
}

// Cargar clientes en servicio en el panel de concesionario
function loadServiceClients() {
    const serviceClients = document.getElementById('service-clients');
    serviceClients.innerHTML = '';
    
    services.forEach(service => {
        const clientCard = document.createElement('div');
        clientCard.className = 'card-small';
        clientCard.innerHTML = `
            <div style="display:flex; justify-content:space-between;">
                <div style="display:flex; align-items:center; gap:10px;">
                    <div style="width:40px; height:40px; background-image:url('${vehicleImages[service.model]}'); background-size:cover; background-position:center; border-radius:4px;"></div>
                    <h3>${service.model} (${service.plate})</h3>
                </div>
                <span>${service.progress}% completado</span>
            </div>
            <p>Pendiente: ${service.pending}</p>
            <div class="progress-container">
                <div class="progress-bar" style="width: ${service.progress}%"></div>
            </div>
            <div style="display:flex; gap:10px; margin-top:10px;">
                <button class="btn">Actualizar Estado</button>
                <button class="btn btn-secondary">Contactar Cliente</button>
            </div>
        `;
        serviceClients.appendChild(clientCard);
    });
}
