# 📊 Calculadora de Presupuesto Anuales.
Aplicación web desarrollada para facilitar la planeación y control de presupuestos anuales de las diferentes áreas.

Esta herramienta permite registrar todos los servicios, calcular los costos periódicos y obtener una estimación del gasto anual, ayudando a la mejoría de la organización y la toma de decisiones dentro de la organización

# 🎯 Objetivo 

El objetivo de este proyecto es proporcionar una herramienta sencilla e intuitiva que permita planificar presupuestos de manera rápida y organizada, reduciendo errores de cálculo y facilitando la toma de decisiones financieras.

# 📌 Características principales
* Registro de presupuesto anual.
* Registro de presupuesto anual pasado.
* Registro de servicios tecnológicos.
* Soporte para pagos con diferentes periodos.
* Comparación del presupuesto actual contra el límite establecido.
* Comparación del presupuesto actual contra el pasado.
* Cálculo de gastos total proyectado.

# 🖥️ Vista previa
<img width="1242" height="417" alt="calculadora1" src="https://github.com/user-attachments/assets/6d2727c5-e8c3-4442-9cc7-866666ff58ae" />
<img width="1225" height="501" alt="calculadora2" src="https://github.com/user-attachments/assets/518b63fc-f21f-4ccb-9d3b-78329af25bac" />
<img width="1239" height="456" alt="calculadora3" src="https://github.com/user-attachments/assets/e37ad15a-162d-437a-94d9-665ef4f53c53" />

# 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript


# ⚙️ Funcionamiento

- La aplicación inicia solicitando la información general del presupuesto.

El usuario puede capturar:

- Presupuesto anual anterior.
- Tope máximo del presupuesto disponible.

Posteriormente se agregan los diferentes conceptos que formarán parte del presupuesto indicando:

- Nombre del concepto.
- Costo.
- Periodicidad del gasto (mensual o anual).

Cada vez que se registra un nuevo concepto, la aplicación realiza automáticamente los siguientes procesos:

- Calcula el costo anual del concepto.
- Actualiza el gasto anual acumulado.
- Calcula el gasto mensual estimado.
- Compara el total proyectado contra el presupuesto máximo.
- Refresca toda la información mostrada en pantalla de manera inmediata.

De esta forma, el usuario puede visualizar el comportamiento del presupuesto conforme va agregando nuevos gastos y conocer si aún dispone de recursos o si ha excedido el límite establecido.
