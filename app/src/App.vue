<template>
  <div class="container-fluid mt-3">
    <div class="card">
      <div class="card-header">
        <header>
          <h2>Trabajo Práctico 2</h2>
        </header>
      </div>
      <div class="card-body">
        <main>

          <!-- Filtros -->
          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <label class="form-label">Nombre o Apellido</label>
              <input type="text" class="form-control" v-model="filtroNombre"
                placeholder="Buscar por nombre o apellido..." />
              <div class="form-text">Minimo 3 caracteres para activar este filtro.</div>
            </div>

            <div class="col-md-6">
              <label class="form-label">DNI</label>
              <input type="text" class="form-control" v-model="filtroDni" placeholder="Buscar por DNI..."
                inputmode="numeric" />
              <div class="form-text">Minimo 3 caracteres para activar este filtro.</div>
            </div>
          </div>

          <!-- Alerta si alguno tiene menos de 3 caracteres -->
          <div v-if="mostrarAlert" class="alert alert-warning" role="alert">
            Ingresá al menos <strong>3 caracteres</strong> en el filtro.
          </div>


          <!-- Lista de personas (igual al HTML original) -->
          <div class="card-deck m-0">
            <div class="row">
              <div class="col-md-4" v-for="persona in personasFiltradas" :key="persona.dni">
                <div class="card mb-3">
                  <div class="card-body">
                    <h5 class="card-title">{{ getNombreCompleto(persona) }}</h5>
                    <p class="card-text">DNI: {{ persona.dni }}</p>
                    <a :href="'mailto:' + persona.correo" class="card-link">{{ persona.correo }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ejercicio2', // cambiá el nombre si querés  
  // Registrar componentes hijos  
  components: {
    // Ej: HijoComponente  
  },
  // Propiedades que recibe el componente  
  props: {
    // ejemplo: titulo: { type: String, default: '' }  
  },
  // Estado local  
  data() {
    return {
      // Datos del ejercicio original
      personas: [
        { nombre: "Daniel", apellido: "Sanchez", correo: "danielsanchez68@hotmail.com", dni: "20442873" },
        { nombre: "Juan", apellido: "Perez", correo: "j@p.gmail.com", dni: "12345678" },
        { nombre: "Ana", apellido: "Suarez", correo: "a@s.gmail.com", dni: "87654321" },
        { nombre: "...", apellido: "...", correo: "...", dni: "..." }
      ],
      // Filtros
      filtroNombre: '',
      filtroDni: ''
    };
  },
  // Propiedades computadas  
  computed: {
    // Longitudes para validación (mínimo 3)
    nombreLen() { return this.filtroNombre.trim().length; },
    dniLen() { return this.filtroDni.trim().length; },

    // Filtrado excluyente (AND si ambos filtros están activos)
    personasFiltradas() {
      return this.personas.filter(p => {
        const coincideNombre =
          this.nombreLen < 3 ||
          (`${p.nombre} ${p.apellido}`.toLowerCase()
            .includes(this.filtroNombre.trim().toLowerCase()));

        const coincideDni =
          this.dniLen < 3 ||
          p.dni.includes(this.filtroDni.trim());

        return coincideNombre && coincideDni;
      });
    },
    
    // Mostrar alerta si alguno tiene 1 o 2 caracteres (pero > 0)
    mostrarAlert() {
      return (this.nombreLen > 0 && this.nombreLen < 3) ||
        (this.dniLen > 0 && this.dniLen < 3);
    }
  },
  // Observadores  
  watch: {
    // ejemplo: contador(nuevo, viejo) { /* ... */ }  
  },
  // Métodos  
  methods: {
    // ejemplo: incrementar() { this.contador++; }
    getNombreCompleto(persona) {
      return `${persona.nombre} ${persona.apellido}`;
    },
  },
  // Ciclo de vida  
  created() {
    // Se ejecuta al crear la instancia  
  },
  mounted() {
    // Se ejecuta cuando el componente se monta en el DOM  
  },
  unmounted() {
    // Limpieza al desmontar  
  }
};
</script>


<style scoped>
.card-header {
  background-color: black;
  color: white;
}
.card-deck .col {
  padding: 0.5rem;
}
.alert.alert-warning {
  color: red;
}
</style>
