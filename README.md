# Instructivo para Cargar Imágenes en una Página Web

Este instructivo explica cómo preparar y organizar imágenes para una página web, incluyendo la estructura de carpetas, el nombramiento de archivos, y la creación de un archivo ZIP para su entrega al administrador de la página. Las imágenes se usarán junto con una plantilla de página web (como la descrita en el instructivo anterior).

## Estructura de Carpetas

Las imágenes deben organizarse en carpetas con un nombre específico que combine la **sección** y el **número de página** dentro de esa sección. El formato es:

```
"sección"-"número"
```

### Secciones Disponibles
Cada sección tiene un código abreviado que debe usarse en el nombre de la carpeta:

- **Talleres**: `tall`
- **Conferencias**: `conf`
- **Hoy en tu comunidad**: `hetc`
- **Periódico**: `news`

### Número de Página
El número corresponde al orden de la página dentro de la sección. Por ejemplo, si ya existen 10 páginas en la sección "Talleres" y se desea agregar una nueva, la carpeta se nombrará:

```
tall-11
```

## Nombramiento de Imágenes

Las imágenes deben cargarse dentro de la carpeta correspondiente y nombrarse siguiendo el formato:

```
"nombreDeLaCarpeta"-"número".webp
```

- **Formato de imagen**: Todas las imágenes deben estar en formato **WEBP** para optimizar los tiempos de carga de la página web.
- **Número de imagen**: Un número secuencial que comienza en `1` para cada carpeta.
- **Primera imagen**: La imagen con el número `1` (por ejemplo, `tall-11-1.webp`) será utilizada como **portada** en el apartado general de la sección.

### Ejemplo
Para la carpeta `tall-11` con 5 imágenes, los nombres serían:

1. `tall-11-1.webp`
2. `tall-11-2.webp`
3. `tall-11-3.webp`
4. `tall-11-4.webp`
5. `tall-11-5.webp`

## Archivo title.txt

Se recomienda incluir un archivo de texto llamado `title.txt` dentro de la carpeta para especificar el título del artículo o página. Este archivo es opcional, pero su uso facilita la identificación del contenido.

- **Nombre del archivo**: `title.txt`
- **Contenido**: Una sola línea con el título del artículo o página.

### Ejemplo de `title.txt`
```
Visita a Santa María Chi
```

## Preparación del Archivo ZIP

Una vez que la carpeta contiene las imágenes y, opcionalmente, el archivo `title.txt`, debe comprimirse en un archivo ZIP para su entrega.

### Pasos para Crear el Archivo ZIP
1. **Crear la carpeta**: Crea una carpeta con el nombre correcto (por ejemplo, `tall-11`).
2. **Añadir imágenes**: Coloca las imágenes en formato WEBP con los nombres correctos (por ejemplo, `tall-11-1.webp`, `tall-11-2.webp`, etc.).
3. **Añadir title.txt (opcional)**: Crea un archivo `title.txt` con el título del artículo y guárdalo en la carpeta.
4. **Comprimir la carpeta**: Selecciona la carpeta (por ejemplo, `tall-11`) y comprímela en un archivo ZIP (por ejemplo, `tall-11.zip`).
   - En Windows: Haz clic derecho en la carpeta, selecciona "Enviar a" > "Carpeta comprimida (zip)".
   - En macOS: Haz clic derecho en la carpeta y selecciona "Comprimir tall-11".
   - En Linux: Usa un comando como `zip -r tall-11.zip tall-11`.
5. **Entregar el archivo ZIP**: Proporciona el archivo ZIP al administrador de la página web junto con la plantilla correspondiente (archivo TXT con la estructura de la página).

## Ejemplo de Estructura Completa

Supongamos que se está creando una nueva página en la sección "Talleres" como la página número 11:

- **Nombre de la carpeta**: `tall-11`
- **Contenido de la carpeta**:
  - `tall-11-1.webp` (portada)
  - `tall-11-2.webp`
  - `tall-11-3.webp`
  - `tall-11-4.webp`
  - `tall-11-5.webp`
  - `title.txt` (conteniendo, por ejemplo, `Taller de Química Divertida`)
- **Archivo ZIP**: `tall-11.zip`

## Notas Adicionales
- **Formato WEBP**: Asegúrate de que todas las imágenes se conviertan a WEBP antes de cargarlas. Puedes usar herramientas como Adobe Photoshop, GIMP, o convertidores en línea para generar archivos WEBP.
- **Consistencia en nombres**: Verifica que los nombres de las imágenes coincidan exactamente con el formato `"nombreDeLaCarpeta"-"número".webp` para evitar errores en la página web.
- **Primera imagen como portada**: La imagen con el número `1` debe ser representativa, ya que se mostrará como portada en el apartado general de la sección.
- **Compatibilidad con la plantilla**: Asegúrate de que los números de imagen (`imageNumber`) en la plantilla (por ejemplo, en funciones como `TextWithImage` o `FullWidthImage`) coincidan con los números de las imágenes en la carpeta.
- **Entrega**: El archivo ZIP y la plantilla (archivo TXT) deben entregarse juntos al administrador para garantizar que la página se genere correctamente.

Con este instructivo, puedes preparar y organizar correctamente las imágenes para una página web, asegurando una integración fluida con la plantilla correspondiente.

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
