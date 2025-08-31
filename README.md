# Instructivo para Generar un Archivo TXT para una Plantilla de Página Web

Este instructivo explica cómo crear un archivo de texto (.txt) que sirva como plantilla para generar una página web estructurada. El archivo debe seguir un formato específico con secciones, identificadores, títulos, subtítulos, textos, imágenes y otros elementos, como se muestra en el ejemplo proporcionado.

## Estructura General del Archivo TXT

El archivo debe contener una combinación de parámetros clave y funciones predefinidas que estructuran el contenido de la página web. A continuación, se describen los componentes principales y cómo deben escribirse.

### 1. Definición de Parámetros Iniciales
Al inicio del archivo, se deben especificar los parámetros globales de la página:

- **section**: Identificador de la sección de la página (por ejemplo, `section="hetc"`).
- **id**: Identificador único de la página (por ejemplo, `id="1"`).
- **titlePage**: Título principal de la página (por ejemplo, `titlePage="Visita a Santa María Chi"`).

**Formato:**
```
section="nombre_seccion"
id="id_unico"
titlePage="Título de la Página"
```

### 2. Funciones para Contenido

El contenido de la página se define mediante funciones específicas que estructuran texto, imágenes y combinaciones de ambos. Cada función debe seguir un formato estricto.

#### a) TextOnly
Esta función se utiliza para agregar un bloque de texto con un subtítulo, sin imágenes.

- **Parámetros**:
  - Subtítulo: Título del bloque de texto (entre comillas).
  - Texto: Contenido del bloque, encerrado en comillas invertidas (\`).
- **Formato**:
  ```
  TextOnly("Subtítulo", `Texto descriptivo aquí.`)
  ```
- **Ejemplo**:
  ```
  TextOnly("Un Día de Ciencia en la Comunidad", `Nuestra visita a Santa María Chi fue una experiencia enriquecedora, donde pudimos compartir la pasión por la ciencia con niños y adultos de la comunidad. Llevamos a cabo diversas actividades interactivas diseñadas para despertar la curiosidad y fomentar el aprendizaje a través del juego y la experimentación.`)
  ```

#### b) TextWithImage
Esta función combina un bloque de texto con una imagen posicionada a la izquierda o derecha.

- **Parámetros**:
  - Subtítulo: Título del bloque (entre comillas).
  - Texto: Contenido del bloque, encerrado en comillas invertidas (\`).
  - section: Nombre de la sección (debe coincidir con el definido al inicio).
  - id: Identificador de la página (debe coincidir con el definido al inicio).
  - imageNumber: Número asignado a la imagen (entero, por ejemplo, `1`).
  - position: Posición de la imagen (`"left"` o `"right"`).
- **Formato**:
  ```
  TextWithImage("Subtítulo", `Texto descriptivo aquí.`, section, id, imageNumber, "posición")
  ```
- **Ejemplo**:
  ```
  TextWithImage("Talleres Interactivos y Demostraciones", `Durante la jornada, organizamos varios talleres prácticos. Uno de los más populares fue el de "Química Divertida", donde los niños pudieron crear sus propios slimes y observar reacciones químicas sorprendentes de forma segura.`, section, id, 1, "right")
  ```

#### c) FullWidthImage
Esta función agrega una imagen de ancho completo con un subtítulo y una descripción.

- **Parámetros**:
  - Subtítulo: Título del bloque (entre comillas).
  - Descripción: Texto descriptivo de la imagen (entre comillas).
  - section: Nombre de la sección.
  - id: Identificador de la página.
  - imageNumber: Número asignado a la imagen.
- **Formato**:
  ```
  FullWidthImage("Subtítulo", "Descripción de la imagen", section, id, imageNumber)
  ```
- **Ejemplo**:
  ```
  FullWidthImage("Momentos de Aprendizaje y Diversión", "Los niños de Santa María Chi participando activamente en los experimentos.", section, id, 2)
  ```

#### d) ThreeImages
Esta función permite agregar una galería de tres imágenes con sus respectivas descripciones.

- **Parámetros**:
  - section: Nombre de la sección.
  - id: Identificador de la página.
  - Subtítulo: Título de la galería (entre comillas).
  - Imágenes: Lista de objetos con dos atributos cada uno:
    - imageNumber: Número asignado a la imagen.
    - caption: Descripción de la imagen (entre comillas).
- **Formato**:
  ```
  ThreeImages(section, id, "Subtítulo", [{"imageNumber": número, "caption": "Descripción"}, {"imageNumber": número, "caption": "Descripción"}, {"imageNumber": número, "caption": "Descripción"}])
  ```
- **Ejemplo**:
  ```
  ThreeImages(section, id, "Galería de la Visita", [{"imageNumber": 4, "caption": "Explicando conceptos básicos"}, {"imageNumber": 5, "caption": "Trabajo en equipo"}, {"imageNumber": 6, "caption": "Sonrisas y descubrimientos"}])
  ```

## Pasos para Crear el Archivo TXT

1. **Crear un archivo de texto**: Abre un editor de texto (como Notepad, VS Code, o cualquier editor simple) y crea un nuevo archivo con extensión `.txt` (por ejemplo, `plantilla_web.txt`).
2. **Definir los parámetros iniciales**: Escribe los parámetros `section`, `id`, y `titlePage` al inicio del archivo.
3. **Agregar bloques de contenido**: Usa las funciones `TextOnly`, `TextWithImage`, `FullWidthImage`, y `ThreeImages` según el diseño deseado para la página web.
4. **Verificar el formato**: Asegúrate de que:
   - Todas las comillas y comas estén correctamente colocadas.
   - Los parámetros `section` e `id` sean consistentes en todo el archivo.
   - Los números de imagen (`imageNumber`) sean únicos y correspondan a las imágenes que se usarán en la página.
5. **Guardar el archivo**: Guarda el archivo con la extensión `.txt` y asegúrate de que el contenido sea legible para el sistema que generará la página web.

## Ejemplo Completo de un Archivo TXT

A continuación, se muestra un ejemplo completo de cómo debería verse el archivo TXT basado en la estructura proporcionada:

```
section="hetc"
id="1"
titlePage="Visita a Santa María Chi"

TextOnly("Un Día de Ciencia en la Comunidad", `Nuestra visita a Santa María Chi fue una experiencia enriquecedora, donde pudimos compartir la pasión por la ciencia con niños y adultos de la comunidad. Llevamos a cabo diversas actividades interactivas diseñadas para despertar la curiosidad y fomentar el aprendizaje a través del juego y la experimentación.

El entusiasmo de los participantes fue contagioso, y ver sus rostros de asombro y alegría al descubrir nuevos conceptos científicos nos llenó de satisfacción. Creemos firmemente que la ciencia es para todos y que acercarla a las comunidades es fundamental para el desarrollo y la inspiración de las nuevas generaciones.`)

TextWithImage("Talleres Interactivos y Demostraciones", `Durante la jornada, organizamos varios talleres prácticos. Uno de los más populares fue el de "Química Divertida", donde los niños pudieron crear sus propios slimes y observar reacciones químicas sorprendentes de forma segura. También tuvimos demostraciones de física, explicando principios básicos de una manera muy visual y participativa. La interacción directa con los materiales y los experimentos permitió a los asistentes comprender conceptos complejos de una manera sencilla y memorable. Fue un espacio donde la teoría se convirtió en una experiencia tangible y emocionante.`, section, id, 1, "right")

FullWidthImage("Momentos de Aprendizaje y Diversión", "Los niños de Santa María Chi participando activamente en los experimentos.", section, id, 2)

ThreeImages(section, id, "Galería de la Visita", [{"imageNumber": 4, "caption": "Explicando conceptos básicos"}, {"imageNumber": 5, "caption": "Trabajo en equipo"}, {"imageNumber": 6, "caption": "Sonrisas y descubrimientos"}])
```

## Notas Adicionales
- **Consistencia**: Asegúrate de que los valores de `section` e `id` sean los mismos en todas las funciones que los requieran.
- **Imágenes**: Los números de imagen (`imageNumber`) deben corresponder a archivos de imagen reales que el sistema usará para renderizar la página web.
- **Compatibilidad**: Verifica que el sistema que procesará el archivo TXT reconozca las funciones y el formato descrito.
- **Errores comunes**: Evita omitir comas, comillas, o cerrar incorrectamente las funciones, ya que esto puede causar errores al generar la página web.

Con este instructivo, puedes crear un archivo TXT que sirva como plantilla para una página web estructurada y visualmente atractiva.
