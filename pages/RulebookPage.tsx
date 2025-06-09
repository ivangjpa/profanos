
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APP_COLORS } from '../constants';
import Button from '../components/Button';

const RulebookPage: React.FC = () => {
  const navigate = useNavigate();

  const sectionTitleStyle = `font-serif text-xl lg:text-2xl font-semibold text-[${APP_COLORS.sectionTitleTextHex}] mt-8 mb-4 pb-2 border-b border-[${APP_COLORS.accentGreenPrimaryHex}]/50`;
  const subSectionTitleStyle = `font-serif text-lg lg:text-xl font-semibold text-[${APP_COLORS.sectionTitleTextHex}] mt-6 mb-3`;
  const paragraphStyle = `mb-3 text-[${APP_COLORS.bodyTextHex}] leading-relaxed`;
  const listStyle = `list-disc list-inside pl-4 mb-3 text-[${APP_COLORS.bodyTextHex}] space-y-1`;
  const nestedListStyle = `list-disc list-inside pl-6 mb-2 text-[${APP_COLORS.bodyTextHex}] space-y-1`;
  const effectTextStyle = `text-sm text-[${APP_COLORS.noteTextHex}] italic`;

  return (
    <div className={`w-full max-w-4xl mx-auto p-6 md:p-8 ${APP_COLORS.cardBgClass} shadow-xl rounded-lg border border-[${APP_COLORS.cardBorderColorHex}]`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b-2 pb-3 border-[${APP_COLORS.accentGreenPrimaryHex}]">
        <h1 className={`font-serif text-2xl lg:text-3xl font-bold text-[${APP_COLORS.titleTextHex}] mb-2 sm:mb-0`}>
          Manual de Campo del Investigador
        </h1>
        <Button onClick={() => navigate('/')} className="text-sm self-start sm:self-center whitespace-nowrap">
          &larr; Volver al Índice
        </Button>
      </div>

      <div className="prose prose-sm sm:prose-base max-w-none" style={{ color: APP_COLORS.bodyTextHex }}>

        {/* Sección: Sistema Básico de Juego */}
        <section aria-labelledby="sistema-basico-juego-titulo">
          <h2 id="sistema-basico-juego-titulo" className={sectionTitleStyle}>Sistema Básico de Juego con Dados de 6 Caras (D6)</h2>

          <h3 className={subSectionTitleStyle}>1. Creación de Personajes y Habilidades Iniciales</h3>
          <p className={paragraphStyle}>
            Cada personaje comienza con 18 puntos a repartir entre sus habilidades básicas (Fuerza, Agilidad, Inteligencia, Carisma, Percepción, Voluntad). Adicionalmente, cada personaje comienza con dos habilidades básicas extra, Constitución y Estabilidad Mental, cada una con un valor inicial de 2.
          </p>
          <ul className={listStyle}>
            <li>El valor mínimo para cada habilidad es de 1 y el máximo inicial es de 5.</li>
            <li>Ninguna habilidad puede superar inicialmente el valor de 5 dados.</li>
            <li>Es recomendable que los jugadores asignen más puntos a las habilidades relacionadas directamente con su profesión y trasfondo.</li>
          </ul>

          <h4 className={`font-serif text-md font-semibold text-[${APP_COLORS.sectionTitleTextHex}] mt-4 mb-2`}>Definición de Habilidades:</h4>
          <ul className={listStyle}>
            <li><strong>Fuerza:</strong> Capacidad física para mover objetos, combatir cuerpo a cuerpo y resistir impactos.</li>
            <li><strong>Agilidad:</strong> Destreza física, precisión, velocidad y equilibrio; clave para esquivar ataques y realizar tareas delicadas.</li>
            <li><strong>Inteligencia:</strong> Aptitud para comprender y resolver problemas, recordar información y analizar situaciones complejas.</li>
            <li><strong>Carisma:</strong> Habilidad social para influenciar, persuadir, intimidar y liderar a otras personas.</li>
            <li><strong>Percepción:</strong> Capacidad para observar detalles, notar elementos escondidos y reaccionar ante peligros inminentes.</li>
            <li><strong>Voluntad:</strong> Fortaleza mental para resistir influencias externas, mantenerse concentrado y persistir frente a la adversidad.</li>
            <li><strong>Constitución:</strong> Resistencia física y salud general del personaje; influye directamente en su capacidad para soportar heridas.</li>
            <li><strong>Estabilidad Mental:</strong> Resistencia psicológica frente al estrés, miedo, trauma y los horrores que se esconden en las sombras.</li>
          </ul>

          <h3 className={subSectionTitleStyle}>2. Habilidades Básicas y Profesionales</h3>
          <p className={paragraphStyle}>
            Cada habilidad básica tendrá un valor asignado (X) que representa la cantidad de D6 que el jugador lanzará para realizar una acción relacionada.
          </p>

          <h3 className={subSectionTitleStyle}>3. Realización de Acciones</h3>
          <p className={paragraphStyle}>
            Cuando un jugador declara una acción, especifica claramente qué habilidad principal utilizará y cómo lo hace narrativamente. Por ejemplo: "Abrir cerradura usando Agilidad: intento manipular el mecanismo con precisión y destreza".
          </p>

          <h3 className={subSectionTitleStyle}>4. Lanzamiento de Dados</h3>
          <p className={paragraphStyle}>Se lanzan tantos dados de seis caras como indique la habilidad básica. Además:</p>
          <ul className={listStyle}>
            <li>+1 dado adicional si la acción está relacionada directamente con la profesión del personaje.</li>
            <li>+1 dado adicional por objetos o herramientas apropiadas utilizadas.</li>
            <li>+1 dado adicional si la interpretación narrativa del jugador es especialmente creativa o pertinente.</li>
          </ul>

          <h3 className={subSectionTitleStyle}>5. Resolución de la Acción (Éxitos y Dificultad)</h3>
          <p className={paragraphStyle}>
            La dificultad de la acción se mide por el número de éxitos (Z) requeridos. Un resultado de 5 o 6 en un dado equivale a un éxito.
          </p>
          <ul className={listStyle}>
            <li>Si se iguala o supera el número de éxitos necesarios, la acción tiene éxito.</li>
            <li>Si se obtienen más éxitos de los necesarios, el éxito es especialmente favorable (ventajas adicionales).</li>
            <li>Los "seises" (6) se consideran éxitos críticos y pueden suponer ventajas tácticas y narrativas en función de la situación.</li>
            <li>Si no se obtienen éxitos, el número de resultados de 1 y 2 obtenidos determina la gravedad del fallo (a más "unos" y "doses", mayor gravedad).</li>
          </ul>

          <h4 className={`font-serif text-md font-semibold text-[${APP_COLORS.sectionTitleTextHex}] mt-4 mb-2`}>Niveles de Dificultad:</h4>
          <ul className={`${listStyle} space-y-2`}>
            <li><strong>Fácil (1 éxito):</strong> Tareas cotidianas y simples.
              <p className={effectTextStyle}>Ejemplos: Abrir una puerta sin cerradura, encender una vela.</p>
            </li>
            <li><strong>Normal (2 éxitos):</strong> Tareas comunes que requieren algo de esfuerzo.
              <p className={effectTextStyle}>Ejemplos: Escalar una valla baja, reparar una prenda rasgada.</p>
            </li>
            <li><strong>Difícil (3 éxitos):</strong> Acciones que requieren habilidad o concentración.
              <p className={effectTextStyle}>Ejemplos: Abrir una cerradura estándar con herramientas adecuadas, seguir un rastro tenue en la nieve.</p>
            </li>
            <li><strong>Muy Difícil (4 éxitos):</strong> Tareas complejas y que requieren experiencia.
              <p className={effectTextStyle}>Ejemplos: Desactivar un mecanismo de seguridad avanzado, convencer a un guardia suspicaz.</p>
            </li>
            <li><strong>Absurdo (5 éxitos):</strong> Retos excepcionales, casi al límite humano.
              <p className={effectTextStyle}>Ejemplos: Saltar de un tejado a otro en plena carrera, resolver un enigma bajo presión extrema.</p>
            </li>
            <li><strong>Imposible (6 éxitos):</strong> Hazañas extraordinarias al borde de lo sobrenatural.
              <p className={effectTextStyle}>Ejemplos: Atravesar un laberinto de trampas mortales sin sufrir daños, convencer a un sectario fanático para que revele sus secretos más profundos.</p>
            </li>
          </ul>

          <h3 className={subSectionTitleStyle}>6. Sistema de Combate</h3>
          <p className={paragraphStyle}>
            El combate se divide en combate cuerpo a cuerpo (basado en Fuerza) y combate a distancia (basado en Agilidad).
          </p>
          <ul className={listStyle}>
            <li><strong>Combate cuerpo a cuerpo:</strong> Los personajes enfrentan sus valores de Fuerza más modificadores de armas, protecciones, y contexto de escena. Quien obtenga más éxitos propina el daño de su arma.</li>
            <li><strong>Combate a distancia:</strong> Los personajes enfrentan sus valores de Agilidad más modificadores relacionados con la visibilidad, cobertura del objetivo y características del arma. Quien obtenga más éxitos acierta el disparo causando el daño correspondiente.</li>
          </ul>
          <h4 className={`font-serif text-md font-semibold text-[${APP_COLORS.sectionTitleTextHex}] mt-4 mb-2`}>Ejemplos de Combate:</h4>
          <ul className={listStyle}>
            <li>Cuerpo a cuerpo: Silas (Fuerza 4) ataca con cuchillo (+1 dado), enfrentándose a un matón (Fuerza 3) con armadura ligera (+1 dado defensa). Silas lanza 5 dados, el matón 4 dados. Silas obtiene 3 éxitos y el matón 2 éxitos; Silas inflige daño.</li>
            <li>A distancia: Harker (Agilidad 4) dispara con un revólver (+1 dado), en condiciones de poca luz (-1 dado). El objetivo tiene cobertura parcial (-1 dado). Harker lanza 3 dados, obtiene 2 éxitos contra 1 éxito del objetivo, impactando y causando daño.</li>
          </ul>

          <h3 className={subSectionTitleStyle}>7. Constitución, Estabilidad Mental, Aguante y Cordura</h3>
          <ul className={listStyle}>
            <li>Constitución inicial: 2 puntos (mejorable con PH).</li>
            <li>Estabilidad Mental inicial: 2 puntos (mejorable con PH).</li>
            <li>Aguante se calcula como 6 puntos por cada punto de Constitución.</li>
            <li>Cordura se calcula como 6 puntos por cada punto de Estabilidad Mental.</li>
            <li>La Estabilidad base es Estabilidad Mental más 3.</li>
          </ul>

          <h3 className={subSectionTitleStyle}>8. Experiencia y Mejora de Personajes</h3>
          <ul className={listStyle}>
            <li>20 PX = 1 PH.</li>
            <li>Subir habilidad hasta valor 6 cuesta 1 PH.</li>
            <li>Por encima de 6 cuesta 2 PH por nivel.</li>
            <li>Constitución y Estabilidad Mental cuestan 3 PH por nivel adicional.</li>
          </ul>

          <h3 className={subSectionTitleStyle}>9. Sistema de Puntos de Fortuna</h3>
          <p className={paragraphStyle}>
            El Director de Juego puede premiar a los jugadores con puntos de fortuna cuando estos realizan acciones particularmente inteligentes, impactantes, narrativamente destacadas o bien interpretadas.
          </p>
          <ul className={listStyle}>
            <li>Cada punto de fortuna permite al jugador relanzar uno o varios dados tras una tirada.</li>
            <li>Los puntos de fortuna pueden utilizarse en cualquier tipo de prueba o combate.</li>
            <li>Un jugador no puede acumular más de 2 puntos de fortuna a la vez.</li>
            <li>Es responsabilidad del jugador indicar cuándo desea usar uno de sus puntos de fortuna.</li>
          </ul>

          <h3 className={subSectionTitleStyle}>10. Sistema de Crédito y Disponibilidad de Recursos Financieros</h3>
          <p className={paragraphStyle}>
            El sistema de crédito se divide en dos factores diferenciados que representan las capacidades del personaje en contextos sociales distintos:
          </p>
          <ul className={listStyle}>
            <li><strong>Crédito Social:</strong> Representa la capacidad del personaje para obtener recursos dentro del ámbito legal, institucional y reconocido públicamente. Incluye acceso a servicios oficiales, comercio, bancos, bienes tecnológicos, apoyo gubernamental, o gestiones burocráticas.</li>
            <li><strong>Crédito Clandestino:</strong> Representa la capacidad del personaje para conseguir recursos a través del mercado negro, favores criminales, contrabando, chantajes, sobornos o redes ocultas. Ideal para obtener objetos ilegales, información peligrosa o apoyo de grupos marginales.</li>
          </ul>
          <p className={`${paragraphStyle} mt-2`}>Ambos niveles se miden de 1 a 6:</p>
          <ul className={listStyle}>
            <li><strong>1 - Nulo:</strong> Sin recursos, reputación manchada o sin conexiones.</li>
            <li><strong>2 - Básico:</strong> Puede conseguir bienes o favores simples dentro del ámbito correspondiente.</li>
            <li><strong>3 - Funcional:</strong> Acceso regular a servicios o recursos útiles en su red.</li>
            <li><strong>4 - Influyente:</strong> Respaldado por contactos confiables o respetado dentro de su red.</li>
            <li><strong>5 - Poderoso:</strong> Capacidad de movilizar grandes recursos, sobornos, favores o influencias.</li>
            <li><strong>6 - Autoridad/Oculto Mayor:</strong> Control o influencia directa sobre la red, institución o mercado.</li>
          </ul>
          <h4 className={`font-serif text-md font-semibold text-[${APP_COLORS.sectionTitleTextHex}] mt-4 mb-2`}>Pruebas de Crédito:</h4>
          <ul className={listStyle}>
            <li>Cada adquisición se resuelve con una Prueba de Crédito Social o Clandestino (según el tipo de recurso solicitado).</li>
            <li>Se lanzan tantos dados como indique el nivel correspondiente. La dificultad depende del coste, rareza o riesgo del recurso.</li>
            <li>Modificadores por objetos, contactos o narrativa pueden alterar la tirada.
              <ul className={nestedListStyle}>
                <li>Éxito: se obtiene el recurso.</li>
                <li>Fallo: el recurso no está disponible, hay retraso, problemas legales o traiciones implicadas.</li>
              </ul>
            </li>
          </ul>
          <h4 className={`font-serif text-md font-semibold text-[${APP_COLORS.sectionTitleTextHex}] mt-4 mb-2`}>Ejemplos Prácticos:</h4>
          <ul className={listStyle}>
            <li>Evelyn (Crédito Clandestino 3) busca dinamita en el puerto. Dificultad 4. Lanza 3 dados, obtiene 1 éxito. El contrabandista solo entrega media carga.</li>
            <li>Harker (Crédito Social 4) quiere acceso a archivos judiciales antiguos. Dificultad 3. Obtiene 2 éxitos: accede sin problemas.</li>
            <li>Silas (Crédito Clandestino 2) intenta colarse en un almacén con ayuda de un contacto (+1 dado). Dificultad 3. Lanza 3 dados. Éxito.</li>
          </ul>
          <p className={`${paragraphStyle} ${effectTextStyle} mt-2`}>
            Nota: Los niveles de crédito pueden variar durante la aventura según las decisiones del personaje, éxito en misiones, exposición pública o acciones moralmente cuestionables.
          </p>
        </section>

        {/* Sección: Apéndice: Pérdida de Cordura */}
        <section aria-labelledby="perdida-de-cordura-titulo">
          <h2 id="perdida-de-cordura-titulo" className={sectionTitleStyle}>Apéndice: Pérdida de Cordura y el Despertar Interior</h2>
          <p className={paragraphStyle}>
            A medida que un personaje pierde puntos de cordura, se sumerge en una espiral de deterioro mental. Este descenso no solo conlleva peligros, sino también la posibilidad de acceder a una realidad más profunda y poderes insospechados. Este sistema introduce un equilibrio entre la degeneración psicológica y el despertar sobrenatural.
          </p>

          <h3 className={subSectionTitleStyle}>Tramos de Cordura y sus Efectos</h3>
          <div className="space-y-4">
            <div>
              <p className={`font-semibold text-[${APP_COLORS.bodyTextHex}]`}>Cordura &gt; 10</p>
              <p className={paragraphStyle}>Estado mental saludable. El personaje mantiene el control de su percepción y juicio.</p>
              <p className={effectTextStyle}>Efectos: Sin alteraciones.</p>
            </div>
            <div>
              <p className={`font-semibold text-[${APP_COLORS.bodyTextHex}]`}>Cordura 7-10: Ligeras fisuras</p>
              <p className={paragraphStyle}>Aparición de ansiedad, pesadillas, dificultades leves para concentrarse.</p>
              <p className={effectTextStyle}>Efectos: -1 dado en pruebas bajo presión emocional. Posibilidad de obsesionarse con detalles menores o rituales personales para calmarse.</p>
            </div>
            <div>
              <p className={`font-semibold text-[${APP_COLORS.bodyTextHex}]`}>Cordura 4-6: Fracturas perceptivas</p>
              <p className={paragraphStyle}>El personaje comienza a experimentar alucinaciones esporádicas, sentimientos de paranoia o desconexión con la realidad.</p>
              <p className={effectTextStyle}>Efectos: +1 dado en tiradas relacionadas con lo sobrenatural. -1 dado en interacciones sociales o en entornos formales.</p>
            </div>
            <div>
              <p className={`font-semibold text-[${APP_COLORS.bodyTextHex}]`}>Cordura 2-3: El velo se rompe</p>
              <p className={paragraphStyle}>Visiones frecuentes, oír voces, dificultad para distinguir lo real de lo imaginario. Fascinación o repulsión intensa por lo oculto.</p>
              <p className={effectTextStyle}>Efectos: +2 dados en rituales, interpretación de símbolos, comunicación con entidades. -2 dados en pruebas de percepción común y tareas cotidianas complejas.</p>
            </div>
            <div>
              <p className={`font-semibold text-[${APP_COLORS.bodyTextHex}]`}>Cordura 1: Conciencia liminal</p>
              <p className={paragraphStyle}>El personaje vive entre la vigilia y el delirio. Experimenta una conexión directa con fuerzas más allá del entendimiento.</p>
              <p className={effectTextStyle}>Efectos: Puede realizar rituales sin conocerlos por completo (a discreción del DJ). Sufre -3 dados en interacciones normales y pruebas prácticas.</p>
            </div>
            <div>
              <p className={`font-semibold text-[${APP_COLORS.bodyTextHex}]`}>Cordura 0: Colapso mental</p>
              <p className={paragraphStyle}>El personaje desarrolla un trastorno psiquiátrico severo, pero no pierde el control del todo. Obtiene acceso a habilidades extrañas, pero paga un precio alto.</p>
            </div>
          </div>

          <h3 className={subSectionTitleStyle}>Trastornos Psiquiátricos (tirar 2D6)</h3>
          <ol className={`list-decimal list-inside pl-4 mb-3 text-[${APP_COLORS.bodyTextHex}] space-y-3`}>
            <li>
              <strong>Amnesia disociativa:</strong> Fragmentación de la identidad y la memoria.
              <ul className={nestedListStyle}>
                <li className={effectTextStyle}>-3 dados en cualquier prueba que implique recordar información (historia, pistas, contactos). +1 dado en situaciones de improvisación o reacción instintiva.</li>
              </ul>
            </li>
            <li>
              <strong>Delirio mesiánico:</strong> Creencia absoluta en su papel profético.
              <ul className={nestedListStyle}>
                <li className={effectTextStyle}>+1 dado en pruebas de carisma al hablar sobre temas sobrenaturales. -4 dados en situaciones donde deba seguir órdenes o aceptar la autoridad de otros. (...) -2 dados en situaciones donde deba seguir órdenes o aceptar la autoridad de otros.</li>
              </ul>
            </li>
            <li>
              <strong>Trastorno obsesivo-compulsivo (TOC):</strong> Necesidad ineludible de cumplir rituales previos a la acción.
              <ul className={nestedListStyle}>
                <li className={effectTextStyle}>Si el ritual personal no se cumple antes de una tirada, -3 dados. Si se respeta, +1 dado en esa acción.</li>
              </ul>
            </li>
            <li>
              <strong>Fobia específica (elegir detonante):</strong> Terror intenso ante un estímulo concreto.
              <ul className={nestedListStyle}>
                <li className={effectTextStyle}>-3 dados en cualquier prueba que implique enfrentarse directa o indirectamente a la fobia.</li>
              </ul>
            </li>
            <li>
              <strong>Paranoia persecutoria:</strong> Desconfianza generalizada de aliados y extraños.
              <ul className={nestedListStyle}>
                <li className={effectTextStyle}>+1 dado en tiradas de percepción o detectar mentiras. -4 dados en pruebas cooperativas o de liderazgo. (...) -2 dados en pruebas cooperativas o de liderazgo.</li>
              </ul>
            </li>
            <li>
              <strong>Alucinaciones auditivas:</strong> Interferencia constante de voces internas.
              <ul className={nestedListStyle}>
                <li className={effectTextStyle}>-3 dados en pruebas de concentración o tareas sostenidas. +1 dado en situaciones que impliquen caos o confusión.</li>
              </ul>
            </li>
            <li>
              <strong>Personalidad escindida:</strong> Cambios bruscos en la actitud y el comportamiento.
              <ul className={nestedListStyle}>
                <li className={effectTextStyle}>El jugador puede declarar un cambio de personalidad una vez por sesión para obtener +2 dados en una habilidad concreta. El DJ puede forzar un cambio al azar con -3 dados.</li>
              </ul>
            </li>
            <li>
              <strong>Trastorno de estrés postraumático (TEPT):</strong> Reacciones intensas ante detonantes asociados al trauma.
              <ul className={nestedListStyle}>
                <li className={effectTextStyle}>-3 dados en situaciones que evoquen el trauma. +1 dado en cualquier prueba defensiva o de protección a otros bajo amenaza.</li>
              </ul>
            </li>
            <li>
              <strong>Catatonia parcial:</strong> Bloqueos temporales ante el estrés extremo.
              <ul className={nestedListStyle}>
                <li className={effectTextStyle}>Tirada de Voluntad al inicio de cada escena intensa. Si falla, no puede actuar en los dos primeros turnos. Si supera, +1 dado solo en pruebas de autocontrol el resto de la escena.</li>
              </ul>
            </li>
            <li>
              <strong>Cleptomanía ritualizada:</strong> Impulso irracional de tomar objetos con significado oculto.
              <ul className={nestedListStyle}>
                <li className={effectTextStyle}>+1 dado en tiradas de sigilo o robo. -3 dados si se enfrenta a consecuencias por posesión de objetos prohibidos o comprometidos. (...) -1 dado si se enfrenta a consecuencias.</li>
              </ul>
            </li>
            <li>
              <strong>Síndrome del saber prohibido:</strong> Compulsión obsesiva por explorar y desentrañar los misterios del universo, incluso aquellos que deberían permanecer ocultos.
              <ul className={nestedListStyle}>
                <li className={effectTextStyle}>+1 dado en cualquier tirada relacionada con conocimientos arcanos, rituales o entidades cósmicas. El DJ puede imponer una penalización de -4 dados si el personaje decide ignorar advertencias, saltarse precauciones o investigar voluntariamente elementos claramente peligrosos.</li>
              </ul>
            </li>
          </ol>

          <h3 className={subSectionTitleStyle}>Reglas de Cordura Negativa</h3>
          <p className={paragraphStyle}>
            Cuando un personaje alcanza los 0 puntos de cordura, no se detiene su descenso mental. Por cada 3 puntos adicionales por debajo de 0 (es decir, a -3, -6, -9...), el personaje adquiere un nuevo trastorno psiquiátrico.
          </p>
          <ul className={listStyle}>
            <li>Esta adquisición se realiza mediante una tirada de 2D6 en la tabla de trastornos psiquiátricos.</li>
            <li>Si el resultado corresponde a un trastorno que el personaje ya posee, se repite la tirada hasta obtener uno nuevo.</li>
            <li>El número de trastornos acumulados puede afectar la interpretación y las acciones del personaje de forma severa.</li>
          </ul>
          <p className={paragraphStyle}>
            Esta regla refleja la disolución progresiva de la mente frente al abismo de lo inefable, relacionada con lo arcano.
          </p>
        </section>

      </div>
      <div className="mt-8 pt-6 border-t border-[${APP_COLORS.accentGreenPrimaryHex}]/40 text-center">
        <Button onClick={() => navigate('/')}>
          &larr; Volver al Índice
        </Button>
      </div>
    </div>
  );
};

export default RulebookPage;
