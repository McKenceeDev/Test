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
            // Solo permitir cambio si la pestaña no está deshabilitada
            if (!this.classList.contains('disabled')) {
                switchTab(this.getAttribute('data-tab'));
            }
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

// Cerrar modal de detalles si existe
function closeVehicleDetailsModal() {
    const existingModal = document.getElementById('vehicle-details-modal');
    if (existingModal) {
        document.body.removeChild(existingModal);
    }
}

// Modal para mostrar detalles del vehículo
function showVehicleDetails(model) {
    // Cerrar modal existente si hay uno
    closeVehicleDetailsModal();
    
    console.log("Mostrando detalles para:", model); // Depuración
    
    // Encontrar datos del vehículo
    const vehicleData = vehicles.find(v => v.model === model);
    const inventoryData = inventory.find(i => i.model === model);
    
    if (!vehicleData) {
        console.error("No se encontraron datos para el modelo:", model);
        return;
    }
    
    // Crear modal de detalles
    const detailsModal = document.createElement('div');
    detailsModal.className = 'modal';
    detailsModal.style.display = 'flex';
    detailsModal.id = 'vehicle-details-modal';
    
    // HTML del modal
    detailsModal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h2>Detalles de ${vehicleData.name}</h2>
                <span class="close-btn">&times;</span>
            </div>
            <div style="display: flex; margin-bottom: 20px;">
                <div style="flex: 1;">
                    <div style="width: 100%; height: 200px; background-image: url('${vehicleImages[model]}'); background-size: cover; background-position: center; border-radius: 8px;"></div>
                </div>
                <div style="flex: 1; padding-left: 20px;">
                    <h3>Información General</h3>
                    <p><strong>Modelo:</strong> ${model}</p>
                    <p><strong>Precio:</strong> ${vehicleData.price}</p>
                    ${inventoryData ? `
                        <p><strong>Disponibilidad:</strong> ${inventoryData.count} unidades</p>
                        <p><strong>Colores:</strong> ${inventoryData.colors.join(', ')}</p>
                        <p><strong>Ubicación:</strong> ${inventoryData.location}</p>
                    ` : ''}
                </div>
            </div>
            
            <h3>Especificaciones Técnicas</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <tr style="background-color: #f0f0f0;">
                    <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Característica</th>
                    <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Detalle</th>
                </tr>
                <tr>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">Motor</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">1.6L Turbo (según modelo)</td>
                </tr>
                <tr>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">Potencia</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">130 HP @ 5500 rpm</td>
                </tr>
                <tr>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">Transmisión</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">Automática de 6 velocidades</td>
                </tr>
                <tr>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">Rendimiento</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">16.8 km/l (combinado)</td>
                </tr>
                <tr>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">Garantía</td>
                    <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">3 años o 100,000 km</td>
                </tr>
            </table>
            
            <div style="margin-top: 20px; text-align: center;">
                <button class="btn">Solicitar Cotización</button>
                ${inventoryData && inventoryData.count > 0 ? `<button class="btn btn-accent" style="margin-left: 10px;">Agendar Test Drive</button>` : ''}
            </div>
        </div>
    `;
    
    // Agregar al body
    document.body.appendChild(detailsModal);
    
    // Cerrar el modal
    const closeButton = detailsModal.querySelector('.close-btn');
    closeButton.addEventListener('click', function() {
        document.body.removeChild(detailsModal);
    });
    
    // Cerrar al hacer clic fuera
    detailsModal.addEventListener('click', function(event) {
        if (event.target === detailsModal) {
            document.body.removeChild(detailsModal);
        }
    });
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
    
    // Ocultar todas las pestañas primero
    document.querySelectorAll('.tab-trigger').forEach(tab => {
        tab.classList.remove('disabled');
    });
    
    // Configurar las pestañas según el perfil
    if (profile === 'flota') {
        // Mostrar solo pestañas relevantes para flota
        flotaTab.style.display = 'flex';
        document.getElementById('user-name').textContent = 'Empresa XYZ';
        
        // Deshabilitar pestañas no relevantes
        document.querySelector('.tab-trigger[data-tab="concesionario"]').classList.add('disabled');
    } else if (profile === 'cliente') {
        // Mostrar solo pestañas relevantes para cliente
        flotaTab.style.display = 'none';
        document.getElementById('user-name').textContent = 'Juan Pérez';
        
        // Deshabilitar pestañas no relevantes
        document.querySelector('.tab-trigger[data-tab="concesionario"]').classList.add('disabled');
        document.querySelector('.tab-trigger[data-tab="flota"]').classList.add('disabled');
    } else if (profile === 'concesionario') {
        // Mostrar solo pestañas relevantes para concesionario
        flotaTab.style.display = 'none';
        document.getElementById('user-name').textContent = 'Concesionario Bogotá';
        
        // Deshabilitar pestañas no relevantes
        document.querySelector('.tab-trigger[data-tab="flota"]').classList.add('disabled');
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
            <div class="vehicle-img" style="background-image: url('${vehicleImages[vehicle.model]}'); cursor: pointer;"></div>
            <div class="vehicle-info">
                <h3>${vehicle.name}</h3>
                <p class="price">${vehicle.price}</p>
                <button class="btn details-btn" style="width:100%; margin-top:10px;">Ver Detalles</button>
            </div>
        `;
        
        vehiclesGrid.appendChild(vehicleCard);
        
        // Añadir evento para mostrar detalles al hacer clic en la imagen
        vehicleCard.querySelector('.vehicle-img').onclick = function() {
            showVehicleDetails(vehicle.model);
        };
        
        // Añadir evento para mostrar detalles al hacer clic en el botón
        vehicleCard.querySelector('.details-btn').onclick = function() {
            showVehicleDetails(vehicle.model);
        };
    });
}

// Cargar inventario en la sección de concesionario
function loadInventory() {
    const inventoryGrid = document.getElementById('inventory-grid');
    inventoryGrid.innerHTML = '';
    
    inventory.forEach(item => {
        const inventoryCard = document.createElement('div');
        inventoryCard.className = 'card-small';
        
        // HTML para la tarjeta de inventario
        inventoryCard.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <div class="vehicle-thumb" style="width:50px; height:50px; background-image:url('${vehicleImages[item.model]}'); background-size:cover; background-position:center; border-radius:4px; cursor:pointer;"></div>
                <h3>${item.model}</h3>
            </div>
            <p>Cantidad Disponible: ${item.count}</p>
            <p>Colores Disponibles: ${item.colors.join(', ')}</p>
            <p>Ubicación: ${item.location}</p>
            <div style="display:flex; gap:10px; margin-top:10px;">
                <button class="btn">Gestionar</button>
                <button class="btn btn-secondary details-btn">Ver Detalles</button>
            </div>
        `;
        
        inventoryGrid.appendChild(inventoryCard);
        
        // Agregar evento al botón de detalles
        inventoryCard.querySelector('.details-btn').onclick = function() {
            showVehicleDetails(item.model);
        };
        
        // Agregar evento a la miniatura
        inventoryCard.querySelector('.vehicle-thumb').onclick = function() {
            showVehicleDetails(item.model);
        };
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
        
        // HTML para la tarjeta de servicio
        serviceCard.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <div class="vehicle-thumb" style="width:50px; height:50px; background-image:url('${vehicleImages[service.model]}'); background-size:cover; background-position:center; border-radius:4px; cursor:pointer;"></div>
                <h3>Placa: ${service.plate} (${service.model})</h3>
            </div>
            <p>Procesos Completados: ${service.completed.join(', ')}</p>
            <p>Proceso Pendiente: ${service.pending}</p>
            <p>Tiempo Estimado de Entrega: ${service.estimatedTime}</p>
            <div class="progress-container">
                <div class="progress-bar" style="width: ${service.progress}%"></div>
            </div>
            <p style="text-align:right;">${service.progress}% completado</p>
            <button class="btn" style="margin-top:10px">Actualizar</button>
        `;
        
        serviceResults.appendChild(serviceCard);
        
        // Hacer que la miniatura sea clicable
        serviceCard.querySelector('.vehicle-thumb').onclick = function() {
            showVehicleDetails(service.model);
        };
    });
}

// Cargar clientes en servicio en el panel de concesionario
function loadServiceClients() {
    const serviceClients = document.getElementById('service-clients');
    serviceClients.innerHTML = '';
    
    services.forEach(service => {
        const clientCard = document.createElement('div');
        clientCard.className = 'card-small';
        
        // HTML para la tarjeta de cliente en servicio
        clientCard.innerHTML = `
            <div style="display:flex; justify-content:space-between;">
                <div style="display:flex; align-items:center; gap:10px;">
                    <div class="vehicle-thumb" style="width:40px; height:40px; background-image:url('${vehicleImages[service.model]}'); background-size:cover; background-position:center; border-radius:4px; cursor:pointer;"></div>
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
        
        // Hacer que la miniatura sea clicable
        clientCard.querySelector('.vehicle-thumb').onclick = function() {
            showVehicleDetails(service.model);
        };
    });
}
