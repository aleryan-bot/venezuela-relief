import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Baby,
  CalendarCheck,
  CheckCircle2,
  CircleDollarSign,
  ExternalLink,
  FileText,
  HandHeart,
  Heart,
  HeartHandshake,
  Link as LinkIcon,
  MapPin,
  PackageOpen,
  PawPrint,
  Search,
  Share2,
  ShieldCheck,
  Stethoscope,
  Truck,
  Users,
  X,
} from "lucide-react";
import "./styles.css";

const filters = [
  { id: "all", icon: CheckCircle2 },
  { id: "money", icon: CircleDollarSign },
  { id: "medical", icon: Stethoscope },
  { id: "food", icon: PackageOpen },
  { id: "dropoff", icon: MapPin },
  { id: "volunteer", icon: Users },
  { id: "children", icon: Baby },
  { id: "animal", icon: PawPrint },
  { id: "tax", icon: ShieldCheck },
];

const categoryOptions = [
  ["money", "Money donations"],
  ["medical", "Medical supplies"],
  ["food", "Food + water"],
  ["dropoff", "Local drop-offs"],
  ["volunteer", "Volunteer"],
  ["children", "Children help"],
  ["animal", "Animal help"],
  ["tax", "US tax-deductible"],
];

const regionOptions = ["US", "Venezuela", "Europe", "Global", "Miami"];

const copy = {
  en: {
    brand: "Venezuela Relief",
    strap: "Earthquake relief",
    nav: {
      directory: "Directory",
      ways: "Ways to help",
      abroad: "For donors abroad",
      verify: "Verification process",
      submit: "Add organization",
      admin: "CMS",
    },
    heroTitle: "Verified ways to help Venezuela",
    heroText:
      "Compare donation, supply, volunteer, and community efforts with clear source links.",
    lastUpdated: "Last updated June 27, 2026",
    availableTo: "Available to",
    filters: {
      all: "All",
      money: "Money donations",
      medical: "Medical supplies",
      food: "Food + water",
      dropoff: "Local drop-offs",
      volunteer: "Volunteer",
      children: "Children help",
      animal: "Animal help",
      tax: "US tax-deductible",
    },
    search: "Search by organization, help type, or region",
    table: {
      org: "Organization",
      help: "Help provided",
      region: "Donor region",
      trust: "Trust level",
      action: "Action",
      donate: "Donate",
    },
    detail: {
      what: "What they do",
      who: "Who can help",
      tax: "Tax note",
      donate: "Donation link",
      route: "Aid route / local partner",
      evidence: "Evidence / source",
      checked: "Last checked",
      risk: "Risk notes",
      close: "Close details",
    },
    actions: {
      details: "View details",
      donate: "Donate",
      donateNow: "Donate now",
      like: "Like organization",
      liked: "Liked",
      share: "Share organization",
      copied: "Link copied",
      submit: "Add organization",
      clear: "Clear",
    },
    empty: "No listings match those filters yet.",
    results: "Showing {count} of {total} listings",
    pages: {
      waysTitle: "Choose the kind of help you can give",
      waysText:
        "The directory is organized by practical help types so donors and volunteers can compare options quickly.",
      abroadTitle: "Guidance for donors outside the US",
      abroadText:
        "European and global donors should look for country-specific receipts, bank transfer options, and clear local partner information.",
      verifyTitle: "How listings should be verified",
      verifyText:
        "A listing should show a current source, a clear aid route, a direct donation or sign-up link, and a last-checked date before it is promoted.",
      submitTitle: "Add organization",
      submitText:
        "Add an organization for review. It will not appear publicly until sources, help type, and donation routes are checked.",
    },
    form: {
      submitter: "Who is submitting this information?",
      submitterEmail: "Submitter email",
      name: "Organization name",
      logo: "Organization logo URL",
      link: "Donation or sign-up link",
      help: "Type of help",
      region: "Who can use it?",
      trust: "Why do you trust them?",
      sent: "Thank you. This suggestion is ready for review before publishing.",
    },
  },
  es: {
    brand: "Venezuela Relief",
    strap: "Ayuda por el terremoto",
    nav: {
      directory: "Directorio",
      ways: "Formas de ayudar",
      abroad: "Donantes afuera",
      verify: "Verificacion",
      submit: "Agregar organizacion",
      admin: "CMS",
    },
    heroTitle: "Formas verificadas de ayudar a Venezuela",
    heroText:
      "Compara donaciones, insumos, voluntariado y esfuerzos comunitarios con fuentes claras.",
    lastUpdated: "Actualizado el 27 de junio de 2026",
    availableTo: "Disponible para",
    filters: {
      all: "Todo",
      money: "Donaciones",
      medical: "Insumos medicos",
      food: "Comida + agua",
      dropoff: "Centros de acopio",
      volunteer: "Voluntariado",
      children: "Ayuda a ninos",
      animal: "Ayuda animal",
      tax: "Deducible en EEUU",
    },
    search: "Buscar por organizacion, ayuda o region",
    table: {
      org: "Organizacion",
      help: "Tipo de ayuda",
      region: "Region del donante",
      trust: "Nivel de confianza",
      action: "Accion",
      donate: "Donar",
    },
    detail: {
      what: "Que hacen",
      who: "Quien puede ayudar",
      tax: "Nota fiscal",
      donate: "Enlace de donacion",
      route: "Ruta de ayuda / socio local",
      evidence: "Evidencia / fuente",
      checked: "Ultima revision",
      risk: "Notas de riesgo",
      close: "Cerrar detalles",
    },
    actions: {
      details: "Ver detalles",
      donate: "Donar",
      donateNow: "Donar ahora",
      like: "Guardar organizacion",
      liked: "Guardada",
      share: "Compartir organizacion",
      copied: "Enlace copiado",
      submit: "Agregar organizacion",
      clear: "Limpiar",
    },
    empty: "Todavia no hay opciones con esos filtros.",
    results: "Mostrando {count} de {total} opciones",
    pages: {
      waysTitle: "Elige el tipo de ayuda que puedes dar",
      waysText:
        "El directorio se organiza por tipos concretos de ayuda para comparar rapido.",
      abroadTitle: "Guia para donantes fuera de EEUU",
      abroadText:
        "Donantes europeos y globales deben buscar recibos por pais, transferencias claras y socios locales identificados.",
      verifyTitle: "Como verificar una opcion",
      verifyText:
        "Cada opcion debe tener fuente reciente, ruta de ayuda clara, enlace directo y fecha de ultima revision.",
      submitTitle: "Agregar organizacion",
      submitText:
        "Agrega una organizacion para revision. No aparecera publicamente hasta verificar fuentes, tipo de ayuda y ruta de donacion.",
    },
    form: {
      submitter: "Quien envia esta informacion?",
      submitterEmail: "Email de quien envia",
      name: "Nombre de la organizacion",
      logo: "URL del logo de la organizacion",
      link: "Enlace de donacion o registro",
      help: "Tipo de ayuda",
      region: "Quien puede usarlo?",
      trust: "Por que confias en ellos?",
      sent: "Gracias. Esta sugerencia queda lista para revision antes de publicar.",
    },
  },
};

const trustLabels = {
  verified: {
    en: "Verified nonprofit",
    es: "ONG verificada",
    className: "trust-verified",
  },
  field: {
    en: "Field partner verified",
    es: "Socio local verificado",
    className: "trust-field",
  },
  community: {
    en: "Community drive",
    es: "Esfuerzo comunitario",
    className: "trust-community",
  },
  review: {
    en: "Needs review",
    es: "Requiere revision",
    className: "trust-review",
  },
};

const CONTENT_KEY = "venezuela-relief-organizations-v1";

const defaultOrganizations = [
  {
    id: "direct-relief",
    name: "Direct Relief",
    subtitle: { en: "US nonprofit medical aid", es: "ONG de EEUU: ayuda medica" },
    initials: "DR",
    mark: "mark-orange",
    help: {
      en: "Medical aid, emergency grants, and supplies for health responders.",
      es: "Ayuda medica, fondos de emergencia e insumos para respuesta de salud.",
    },
    categories: ["money", "medical", "tax", "europe"],
    regions: ["US", "Europe", "Global"],
    trust: "verified",
    priority: 100,
    priorityNote: "Top medical aid route with Venezuela-specific response page.",
    action: "Donate",
    details: {
      what: {
        en: "Launched a Venezuela earthquake response with emergency grants and planned medical shipments for hospitals, clinics, and responders.",
        es: "Inicio una respuesta al terremoto con fondos de emergencia y envios medicos para hospitales, clinicas y equipos de respuesta.",
      },
      who: {
        en: "Individuals, companies, and foundations that want a health-focused, US-receipted route.",
        es: "Personas, empresas y fundaciones que buscan una ruta medica con recibo en EEUU.",
      },
      tax: {
        en: "Official donation FAQ lists Direct Relief as a 501(c)(3). EIN: 95-1831116. Confirm in IRS records before publishing.",
        es: "Su FAQ de donaciones indica 501(c)(3). EIN: 95-1831116. Confirmar en IRS antes de publicar.",
      },
      route: {
        en: "Direct Relief -> Medical Impact, Bomberos Unidos Sin Fronteras, and health facilities needing medical supplies.",
        es: "Direct Relief -> Medical Impact, Bomberos Unidos Sin Fronteras y centros de salud que necesitan insumos.",
      },
      risk: {
        en: "Strong medical option. Donors who want restricted giving should use the Venezuela response page and save the receipt.",
        es: "Opcion fuerte para ayuda medica. Donantes que quieren restringir su aporte deben usar la pagina de Venezuela y guardar el recibo.",
      },
      checked: "June 27, 2026",
      links: [
        {
          label: "Response page",
          href: "https://www.directrelief.org/2026/06/venezuela-earthquake-direct-relief-emergency-response/",
        },
        { label: "Donate", href: "https://donate.directrelief.org/give/647931#!/donation/checkout" },
      ],
    },
  },
  {
    id: "world-central-kitchen",
    name: "World Central Kitchen",
    subtitle: { en: "Food relief nonprofit", es: "ONG de comida de emergencia" },
    initials: "WCK",
    mark: "mark-gold",
    help: {
      en: "Fresh meals, water, and mobile food support for affected communities.",
      es: "Comidas frescas, agua y apoyo movil de alimentos para comunidades afectadas.",
    },
    categories: ["money", "food", "tax", "europe"],
    regions: ["US", "Europe", "Global"],
    trust: "verified",
    priority: 96,
    priorityNote: "Top food-relief route with active field updates.",
    action: "Donate",
    details: {
      what: {
        en: "Reports teams serving meals after the Caracas-area earthquakes, including hot meals, sandwiches, water, and community kitchens.",
        es: "Reporta equipos sirviendo comida tras los terremotos cerca de Caracas, incluyendo platos calientes, sandwiches, agua y cocinas comunitarias.",
      },
      who: {
        en: "Donors who want immediate food relief through a known disaster food-response organization.",
        es: "Donantes que quieren ayuda alimentaria inmediata mediante una organizacion conocida de respuesta a desastres.",
      },
      tax: {
        en: "Official site states World Central Kitchen is a registered 501(c)(3). EIN: 27-3521132. Confirm in IRS records before publishing.",
        es: "Su sitio indica que World Central Kitchen es 501(c)(3). EIN: 27-3521132. Confirmar en IRS antes de publicar.",
      },
      route: {
        en: "WCK response teams and local food partners serving affected neighborhoods.",
        es: "Equipos de WCK y aliados locales de comida en zonas afectadas.",
      },
      risk: {
        en: "Good for meals. Review latest updates if donors need proof of active field distribution by city.",
        es: "Buena opcion para comidas. Revisar ultimas actualizaciones si el donante necesita prueba por ciudad.",
      },
      checked: "June 27, 2026",
      links: [
        {
          label: "Response page",
          href: "https://wck.org/relief/caracas-venezuela-earthquakes-2026/",
        },
        { label: "Donate", href: "https://donate.wck.org/" },
      ],
    },
  },
  {
    id: "ifrc-red-cross",
    name: "IFRC + Venezuelan Red Cross",
    subtitle: { en: "Red Cross network", es: "Red de Cruz Roja" },
    initials: "RC",
    mark: "mark-red",
    help: {
      en: "Shelter, health, cash assistance, water, sanitation, and protection.",
      es: "Refugio, salud, asistencia en efectivo, agua, saneamiento y proteccion.",
    },
    categories: ["money", "food", "medical", "volunteer", "europe"],
    regions: ["Venezuela", "Europe", "Global"],
    trust: "field",
    priority: 92,
    priorityNote: "Strong field route through Venezuelan Red Cross.",
    action: "Donate",
    details: {
      what: {
        en: "The IFRC emergency appeal supports the Venezuelan Red Cross response across shelter, health, cash, WASH, and protection services.",
        es: "El llamado de emergencia de IFRC apoya a la Cruz Roja Venezolana en refugio, salud, efectivo, agua/saneamiento y proteccion.",
      },
      who: {
        en: "Global donors and people who want to support the national Red Cross response directly.",
        es: "Donantes globales y personas que quieren apoyar directamente a la Cruz Roja nacional.",
      },
      tax: {
        en: "IFRC donations are not automatically US tax-deductible. US donors should use a US Red Cross route only if a designated appeal exists.",
        es: "Donar a IFRC no es automaticamente deducible en EEUU. Donantes en EEUU deben usar una ruta de Cruz Roja EEUU solo si hay llamado designado.",
      },
      route: {
        en: "IFRC emergency appeal -> Venezuelan Red Cross branches and volunteers.",
        es: "Llamado de emergencia IFRC -> sedes y voluntarios de Cruz Roja Venezolana.",
      },
      risk: {
        en: "Excellent field route, but label clearly for non-US-tax-deductible giving unless a US fiscal route is confirmed.",
        es: "Ruta de campo fuerte, pero etiquetar claramente como no deducible en EEUU salvo que se confirme ruta fiscal en EEUU.",
      },
      checked: "June 27, 2026",
      links: [
        {
          label: "Emergency appeal",
          href: "https://www.ifrc.org/emergency/venezuela-earthquake-2026",
        },
        { label: "Donate via IFRC", href: "https://donate.redcrossredcrescent.org/" },
      ],
    },
  },
  {
    id: "unicef-usa",
    name: "UNICEF USA",
    subtitle: { en: "Children and family support", es: "Apoyo a ninos y familias" },
    initials: "UN",
    mark: "mark-blue",
    help: {
      en: "Emergency support for children, families, water, sanitation, health, and education.",
      es: "Apoyo de emergencia para ninos, familias, agua, saneamiento, salud y educacion.",
    },
    categories: ["money", "food", "medical", "tax", "europe"],
    regions: ["US", "Europe", "Global"],
    trust: "verified",
    priority: 88,
    priorityNote: "Child-focused emergency support.",
    action: "Donate",
    details: {
      what: {
        en: "UNICEF USA highlights urgent needs for children after the earthquakes, including WASH, health, psychosocial support, and temporary learning spaces.",
        es: "UNICEF USA destaca necesidades urgentes de ninos tras los terremotos: agua/saneamiento, salud, apoyo psicosocial y espacios educativos temporales.",
      },
      who: {
        en: "Donors who want a child-focused route and an established US charity receipt.",
        es: "Donantes que quieren una ruta enfocada en ninos y recibo de una organizacion de EEUU.",
      },
      tax: {
        en: "UNICEF USA describes itself as a US 501(c)(3). Verify EIN and tax status in IRS records before publishing.",
        es: "UNICEF USA se describe como 501(c)(3) en EEUU. Verificar EIN y estatus fiscal en IRS antes de publicar.",
      },
      route: {
        en: "UNICEF country response and partners serving children and families in affected areas.",
        es: "Respuesta de UNICEF y aliados que atienden ninos y familias en zonas afectadas.",
      },
      risk: {
        en: "Strong for child-focused aid. Confirm whether donation is country-restricted or supports broader UNICEF emergency work.",
        es: "Fuerte para ayuda a ninos. Confirmar si la donacion es solo para Venezuela o para emergencias UNICEF mas amplias.",
      },
      checked: "June 27, 2026",
      links: [
        {
          label: "Response page",
          href: "https://www.unicefusa.org/stories/venezuela-earthquakes-children-need-help-now",
        },
        { label: "Donate", href: "https://www.unicefusa.org/donate" },
      ],
    },
  },
  {
    id: "irc",
    name: "International Rescue Committee",
    subtitle: { en: "Emergency relief nonprofit", es: "ONG de ayuda de emergencia" },
    initials: "IRC",
    mark: "mark-dark",
    help: {
      en: "Emergency medical care, clean water, shelter, cash, and protection support.",
      es: "Atencion medica, agua limpia, refugio, efectivo y proteccion.",
    },
    categories: ["money", "food", "medical", "children", "tax", "europe"],
    regions: ["US", "Europe", "Global"],
    trust: "verified",
    priority: 86,
    priorityNote: "Broad emergency response route.",
    action: "Donate",
    details: {
      what: {
        en: "IRC says gifts support teams delivering emergency medical care, clean water, shelter, cash, protection, and recovery help.",
        es: "IRC indica que las donaciones apoyan equipos con salud de emergencia, agua limpia, refugio, efectivo, proteccion y recuperacion.",
      },
      who: {
        en: "Donors who want a broad emergency-response organization with US and global donation routes.",
        es: "Donantes que buscan una organizacion amplia de respuesta de emergencia con rutas en EEUU y globales.",
      },
      tax: {
        en: "IRC states donations are tax-deductible to the extent allowed by law. Confirm EIN and current status in IRS records before publishing.",
        es: "IRC indica que las donaciones son deducibles segun la ley. Confirmar EIN y estatus actual en IRS antes de publicar.",
      },
      route: {
        en: "IRC emergency response teams and partners serving affected communities.",
        es: "Equipos de emergencia de IRC y aliados que atienden comunidades afectadas.",
      },
      risk: {
        en: "The appeal language may support Venezuela and other crises. Check the donation page if a donor wants Venezuela-only restriction.",
        es: "El llamado puede apoyar Venezuela y otras crisis. Revisar la pagina si el donante quiere restriccion solo Venezuela.",
      },
      checked: "June 27, 2026",
      links: [
        {
          label: "Response page",
          href: "https://www.rescue.org/article/how-help-survivors-earthquakes-venezuela",
        },
        { label: "Donate", href: "https://help.rescue.org/donate/venezuela-earthquake" },
      ],
    },
  },
  {
    id: "airlink",
    name: "Airlink",
    subtitle: { en: "Humanitarian logistics", es: "Logistica humanitaria" },
    initials: "AL",
    mark: "mark-blue",
    help: {
      en: "Air transport and logistics for responders, cargo, and emergency supplies.",
      es: "Transporte aereo y logistica para equipos, carga e insumos de emergencia.",
    },
    categories: ["money", "medical", "food", "europe"],
    regions: ["Europe", "Global"],
    trust: "field",
    priority: 72,
    priorityNote: "Useful logistics route, not direct household aid.",
    action: "Details",
    details: {
      what: {
        en: "Airlink reports mobilizing flights and logistics for humanitarian partners responding to the Venezuela earthquakes.",
        es: "Airlink reporta vuelos y logistica para aliados humanitarios que responden a los terremotos en Venezuela.",
      },
      who: {
        en: "Donors who want to fund logistics, cargo movement, and responder transport rather than direct family aid.",
        es: "Donantes que quieren financiar logistica, carga y transporte de equipos, no ayuda directa familiar.",
      },
      tax: {
        en: "Official page lists Combined Federal Campaign code 10554, but IRS status still needs direct confirmation before a tax label is shown.",
        es: "La pagina oficial lista codigo CFC 10554, pero el estatus IRS debe confirmarse antes de mostrar etiqueta fiscal.",
      },
      route: {
        en: "Airlink -> airline/logistics partners -> vetted humanitarian response organizations.",
        es: "Airlink -> aliados aereos/logisticos -> organizaciones humanitarias verificadas.",
      },
      risk: {
        en: "Best for logistics-minded donors. It is not a direct food, shelter, or cash-transfer route.",
        es: "Mejor para donantes enfocados en logistica. No es ruta directa de comida, refugio o efectivo.",
      },
      checked: "June 27, 2026",
      links: [
        {
          label: "Response page",
          href: "https://airlinkflight.org/response/venezuela-earthquakes/",
        },
        { label: "Donate", href: "https://airlinkflight.org/get-involved/donate/" },
      ],
    },
  },
  {
    id: "givedirectly",
    name: "GiveDirectly",
    subtitle: { en: "Cash assistance", es: "Asistencia en efectivo" },
    initials: "GD",
    mark: "mark-green",
    help: {
      en: "Cash transfers for affected families, with public caveats on implementation.",
      es: "Transferencias de efectivo a familias afectadas, con advertencias publicas sobre implementacion.",
    },
    categories: ["money", "tax", "europe"],
    regions: ["US", "Europe", "Global"],
    trust: "verified",
    priority: 80,
    priorityNote: "Cash route with implementation caveats.",
    action: "Donate",
    details: {
      what: {
        en: "GiveDirectly is assessing cash delivery with partners. Its page explains recipient targeting, intended payments, and fallback use of funds.",
        es: "GiveDirectly evalua entrega de efectivo con aliados. Su pagina explica seleccion de beneficiarios, pagos previstos y uso alternativo de fondos.",
      },
      who: {
        en: "Donors who prefer direct cash to affected households and accept program-start risk.",
        es: "Donantes que prefieren efectivo directo a hogares afectados y aceptan riesgo de inicio del programa.",
      },
      tax: {
        en: "Official page describes GiveDirectly as a 501(c)(3). EIN: 27-1661997. Confirm in IRS records before publishing.",
        es: "La pagina oficial describe GiveDirectly como 501(c)(3). EIN: 27-1661997. Confirmar en IRS antes de publicar.",
      },
      route: {
        en: "GiveDirectly and partners identify affected families, then send cash transfers where feasible.",
        es: "GiveDirectly y aliados identifican familias afectadas y envian transferencias cuando sea viable.",
      },
      risk: {
        en: "Transparent but not yet guaranteed: if cash cannot be delivered, funds may move to future emergency responses.",
        es: "Transparente pero no garantizado: si no pueden entregar efectivo, los fondos podrian ir a futuras emergencias.",
      },
      checked: "June 27, 2026",
      links: [
        {
          label: "Campaign page",
          href: "https://www.givedirectly.org/venezuela-earthquakes?ref=home",
        },
        { label: "Donate", href: "https://donate.givedirectly.org/" },
      ],
    },
  },
  {
    id: "save-the-children",
    name: "Save the Children",
    subtitle: { en: "Children and family relief", es: "Ayuda para ninos y familias" },
    initials: "STC",
    mark: "mark-crimson",
    help: {
      en: "Emergency supplies, shelter, food, water, and child protection support.",
      es: "Insumos de emergencia, refugio, comida, agua y proteccion infantil.",
    },
    categories: ["money", "food", "medical", "children", "tax", "europe"],
    regions: ["US", "Europe", "Global"],
    trust: "verified",
    priority: 82,
    priorityNote: "Child and family emergency support.",
    action: "Donate",
    details: {
      what: {
        en: "The Venezuela page says donations help deliver shelter, food, clean water, protection services, and psychosocial support after the earthquakes.",
        es: "La pagina de Venezuela indica que las donaciones apoyan refugio, comida, agua limpia, proteccion y apoyo psicosocial tras los terremotos.",
      },
      who: {
        en: "Donors who want a child-focused emergency charity with a broad disaster response model.",
        es: "Donantes que quieren una organizacion enfocada en ninos y respuesta amplia a desastres.",
      },
      tax: {
        en: "Save the Children states donations are tax-deductible to the extent allowed by law. Confirm IRS record before publishing.",
        es: "Save the Children indica que las donaciones son deducibles segun la ley. Confirmar IRS antes de publicar.",
      },
      route: {
        en: "Save the Children emergency response and partners supporting children and families.",
        es: "Respuesta de Save the Children y aliados que apoyan ninos y familias.",
      },
      risk: {
        en: "Good family support option. Review gift designation if a donor wants only Venezuela earthquake use.",
        es: "Buena opcion para familias. Revisar designacion si el donante quiere uso solo para Venezuela.",
      },
      checked: "June 27, 2026",
      links: [
        {
          label: "Response page",
          href: "https://www.savethechildren.org/us/where-we-work/venezuela",
        },
        { label: "Donate", href: "https://support.savethechildren.org/" },
      ],
    },
  },
  {
    id: "americares",
    name: "Americares",
    subtitle: { en: "Emergency health response", es: "Respuesta de salud de emergencia" },
    initials: "AM",
    mark: "mark-green",
    help: {
      en: "Medicines, supplies, hygiene kits, emergency funding, and health system support.",
      es: "Medicinas, insumos, kits de higiene, fondos de emergencia y apoyo al sistema de salud.",
    },
    categories: ["money", "medical", "tax", "europe"],
    regions: ["US", "Europe", "Global"],
    trust: "verified",
    priority: 84,
    priorityNote: "Health-focused emergency supplies route.",
    action: "Donate",
    details: {
      what: {
        en: "Americares reports emergency funding, medicines, medical supplies, hygiene kits, and local health partner support.",
        es: "Americares reporta fondos de emergencia, medicinas, insumos medicos, kits de higiene y apoyo a aliados locales de salud.",
      },
      who: {
        en: "Donors who want a health and emergency-supplies route from a US nonprofit.",
        es: "Donantes que quieren una ruta de salud e insumos de emergencia desde una ONG de EEUU.",
      },
      tax: {
        en: "Americares says gifts are tax-deductible to the full extent allowed by law. Confirm EIN and IRS record before publishing.",
        es: "Americares indica deducibilidad segun la ley. Confirmar EIN y registro IRS antes de publicar.",
      },
      route: {
        en: "Americares -> local health partners, clinics, and emergency responders.",
        es: "Americares -> aliados locales de salud, clinicas y equipos de emergencia.",
      },
      risk: {
        en: "Donation route may be a worldwide disaster fund. Flag clearly if it is not restricted to Venezuela only.",
        es: "La donacion puede entrar a un fondo mundial de desastres. Marcarlo claro si no es solo Venezuela.",
      },
      checked: "June 27, 2026",
      links: [
        {
          label: "Response page",
          href: "https://www.americares.org/news/americares-responds-to-venezuela-earthquakes/",
        },
        { label: "Donate", href: "https://www.americares.org/WWDisaster" },
      ],
    },
  },
  {
    id: "crs-caritas",
    name: "Catholic Relief Services",
    subtitle: { en: "US nonprofit with Caritas route", es: "ONG de EEUU con ruta Caritas" },
    initials: "CRS",
    mark: "mark-crimson",
    help: {
      en: "Cash, shelter kits, hygiene supplies, food parcels, and psychosocial support.",
      es: "Efectivo, kits de refugio, higiene, paquetes de comida y apoyo psicosocial.",
    },
    categories: ["money", "food", "medical", "tax", "europe"],
    regions: ["US", "Europe", "Global"],
    trust: "field",
    priority: 78,
    priorityNote: "Caritas-linked route for faith communities.",
    action: "Donate",
    details: {
      what: {
        en: "CRS says donations support Caritas Venezuela with cash assistance, shelter kits, hygiene supplies, food parcels, and psychosocial support.",
        es: "CRS indica que las donaciones apoyan a Caritas Venezuela con efectivo, refugio, higiene, comida y apoyo psicosocial.",
      },
      who: {
        en: "US donors, faith communities, parishes, and institutions that want a Caritas-linked route.",
        es: "Donantes en EEUU, comunidades de fe, parroquias e instituciones que buscan una ruta vinculada a Caritas.",
      },
      tax: {
        en: "CRS identifies itself as a 501(c)(3) nonprofit. EIN: 13-5563422. Confirm in IRS records before publishing.",
        es: "CRS se identifica como 501(c)(3). EIN: 13-5563422. Confirmar en IRS antes de publicar.",
      },
      route: {
        en: "CRS -> Caritas Venezuela -> households and communities affected by the earthquakes.",
        es: "CRS -> Caritas Venezuela -> hogares y comunidades afectadas por los terremotos.",
      },
      risk: {
        en: "Good route for faith communities. Confirm latest Caritas field update before featuring as top recommendation.",
        es: "Buena ruta para comunidades de fe. Confirmar actualizacion de campo de Caritas antes de destacarla.",
      },
      checked: "June 27, 2026",
      links: [
        {
          label: "Response page",
          href: "https://www.crs.org/donate/venezuela-earthquake?ms=agicrs0226veq00her00",
        },
        {
          label: "Donate",
          href: "https://www.crs.org/donate/venezuela-earthquake?ms=agicrs0226veq00her00",
        },
      ],
    },
  },
  {
    id: "gem",
    name: "Global Empowerment Mission",
    subtitle: { en: "Miami-based emergency response", es: "Respuesta de emergencia desde Miami" },
    initials: "GEM",
    mark: "mark-dark",
    help: {
      en: "Supplies, transport, local coordination, volunteer support, and supply drives.",
      es: "Insumos, transporte, coordinacion local, voluntariado y centros de acopio.",
    },
    categories: ["money", "food", "dropoff", "volunteer", "tax"],
    regions: ["US", "Miami", "Global"],
    trust: "verified",
    priority: 76,
    priorityNote: "Good for supply drives and Miami-area action.",
    action: "Donate",
    details: {
      what: {
        en: "GEM has a Venezuela earthquakes mission page and is relevant for donors or volunteers near Miami looking for supply-drive routes.",
        es: "GEM tiene una pagina de mision para los terremotos y sirve para donantes o voluntarios cerca de Miami buscando rutas de insumos.",
      },
      who: {
        en: "US donors, Miami-area volunteers, supply partners, and companies with in-kind goods.",
        es: "Donantes en EEUU, voluntarios en Miami, aliados de insumos y empresas con donaciones en especie.",
      },
      tax: {
        en: "Official site says GEM is a 501(c)(3). EIN: 45-3782061. Confirm in IRS records before publishing.",
        es: "Su sitio indica que GEM es 501(c)(3). EIN: 45-3782061. Confirmar en IRS antes de publicar.",
      },
      route: {
        en: "GEM mission team, local partners, and shipping/supply networks supporting affected communities.",
        es: "Equipo de mision GEM, aliados locales y redes de envio e insumos para comunidades afectadas.",
      },
      risk: {
        en: "Useful for local action. Verify current drop-off address, accepted items, and shipment proof before promoting supply drives.",
        es: "Util para accion local. Verificar direccion, articulos aceptados y prueba de envio antes de promover centros de acopio.",
      },
      checked: "June 27, 2026",
      links: [
        {
          label: "Mission page",
          href: "https://www.globalempowermentmission.org/mission/venezuela-earthquakes/",
        },
        { label: "Donate", href: "https://give.gem.org/" },
      ],
    },
  },
];

const helpCards = [
  ["money", "Cash donations", "Fastest path when the organization has a verified relief route."],
  ["medical", "Medical aid", "Best for hospitals, clinics, medicines, and emergency health supplies."],
  ["children", "Children help", "Child protection, family support, education, nutrition, and psychosocial care."],
  ["animal", "Animal help", "Rescue, veterinary care, shelter support, and supplies for animals affected by the emergency."],
  ["dropoff", "Supply drives", "Useful when accepted items, dates, addresses, and shipping proof are clear."],
  ["volunteer", "Volunteer work", "Sorting, driving, translating, outreach, and community coordination."],
];

function getOrgText(org, key, lang) {
  const value = org[key];
  if (!value) return "";
  return typeof value === "string" ? value : value[lang] || value.en;
}

function Field({ icon: Icon, title, children }) {
  return (
    <div className="detail-field">
      <Icon aria-hidden="true" />
      <div>
        <dt>{title}</dt>
        <dd>{children}</dd>
      </div>
    </div>
  );
}

function Tag({ children, tone = "neutral" }) {
  return <span className={`tag tag-${tone}`}>{children}</span>;
}

function TrustBadge({ type, lang }) {
  const trust = trustLabels[type];
  return (
    <span className={`trust-badge ${trust.className}`}>
      <CheckCircle2 aria-hidden="true" />
      {trust[lang]}
    </span>
  );
}

function OrganizationMark({ org }) {
  if (org.logoUrl) {
    return (
      <span className="org-mark org-logo">
        <img src={org.logoUrl} alt="" />
      </span>
    );
  }

  return <span className={`org-mark ${org.mark}`}>{org.initials}</span>;
}

const FAVORITES_KEY = "venezuela-relief-liked-organizations";

function splitList(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function joinList(items) {
  return items.join(", ");
}

function toggleListValue(value, option) {
  const items = splitList(value);
  return items.includes(option)
    ? joinList(items.filter((item) => item !== option))
    : joinList([...items, option]);
}

function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function getEditorDraft(org) {
  const details = org.details || {};
  const links = details.links || [];

  return {
    id: org.id,
    name: org.name,
    subtitle: getOrgText(org, "subtitle", "en"),
    logoUrl: org.logoUrl || "",
    help: getOrgText(org, "help", "en"),
    categories: (org.categories || []).join(", "),
    regions: (org.regions || []).join(", "),
    trust: org.trust,
    status: org.status || "approved",
    priority: String(org.priority || 50),
    priorityNote: org.priorityNote || "",
    donationUrl: getDonateLink(org)?.href || "",
    sourceUrl: links.find((link) => !link.label.toLowerCase().includes("donate"))?.href || "",
    what: details.what?.en || "",
    who: details.who?.en || "",
    tax: details.tax?.en || "",
    route: details.route?.en || "",
    risk: details.risk?.en || "",
    checked: details.checked || "Needs review",
  };
}

function createOrganizationFromDraft(draft, existingOrg) {
  const name = draft.name.trim() || "New organization";
  const id = existingOrg?.id || slugify(name) || `organization-${Date.now()}`;
  const sourceUrl = draft.sourceUrl.trim();
  const donationUrl = draft.donationUrl.trim();
  const links = [
    sourceUrl ? { label: "Source", href: sourceUrl } : null,
    donationUrl ? { label: "Donate", href: donationUrl } : null,
  ].filter(Boolean);

  return {
    ...(existingOrg || {}),
    id,
    name,
    subtitle: { en: draft.subtitle.trim() || "Relief organization", es: draft.subtitle.trim() || "Organizacion de ayuda" },
    initials: existingOrg?.initials || getInitials(name),
    mark: existingOrg?.mark || "mark-blue",
    logoUrl: draft.logoUrl.trim(),
    help: { en: draft.help.trim(), es: draft.help.trim() },
    categories: splitList(draft.categories),
    regions: splitList(draft.regions),
    trust: draft.trust,
    status: draft.status,
    priority: Number(draft.priority) || 50,
    priorityNote: draft.priorityNote.trim(),
    action: donationUrl ? "Donate" : "Details",
    details: {
      ...(existingOrg?.details || {}),
      what: { en: draft.what.trim(), es: draft.what.trim() },
      who: { en: draft.who.trim(), es: draft.who.trim() },
      tax: { en: draft.tax.trim(), es: draft.tax.trim() },
      route: { en: draft.route.trim(), es: draft.route.trim() },
      risk: { en: draft.risk.trim(), es: draft.risk.trim() },
      checked: draft.checked.trim() || new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      links,
    },
  };
}

function useEditableOrganizations() {
  const [organizations, setOrganizations] = useState(() => {
    if (typeof window === "undefined") return defaultOrganizations;
    try {
      const stored = JSON.parse(window.localStorage.getItem(CONTENT_KEY) || "null");
      return Array.isArray(stored) && stored.length ? stored : defaultOrganizations;
    } catch {
      return defaultOrganizations;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(CONTENT_KEY, JSON.stringify(organizations));
  }, [organizations]);

  return [organizations, setOrganizations];
}

function getDonateLink(org) {
  const links = org.details?.links || [];

  return (
    links.find((link) => link.label.toLowerCase().includes("donate")) ||
    links[links.length - 1] ||
    { label: "Website", href: links[0]?.href || "#" }
  );
}

function getShareUrl(org) {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("org", org.id);
  return url.toString();
}

async function copyShareUrl(url) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(url);
    return true;
  }

  const input = document.createElement("textarea");
  input.value = url;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(input);
  return copied;
}

function Directory({ lang, selectedFilter, setSelectedFilter, selectedId, setSelectedId, organizations }) {
  const t = copy[lang];
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState("");
  const [likedIds, setLikedIds] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(window.localStorage.getItem(FAVORITES_KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(likedIds));
  }, [likedIds]);

  function handleSelect(orgId) {
    setSelectedId(orgId);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("org", orgId);
      window.history.replaceState({}, "", url);
    }
  }

  function toggleLiked(orgId) {
    setLikedIds((current) =>
      current.includes(orgId)
        ? current.filter((id) => id !== orgId)
        : [...current, orgId],
    );
  }

  async function shareOrg(org) {
    const url = getShareUrl(org);
    const text = `${org.name} - ${getOrgText(org, "help", lang)}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: org.name, text, url });
        return;
      } catch {
        // Fall through to copy when the share sheet is dismissed or unavailable.
      }
    }

    if (await copyShareUrl(url)) {
      setCopiedId(org.id);
      window.setTimeout(() => setCopiedId(""), 1800);
    }
  }

  const shown = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return organizations
      .filter((org) => {
        if (["review", "rejected", "archived"].includes(org.status)) return false;
        const matchesFilter =
          selectedFilter === "all" || org.categories.includes(selectedFilter);
        const haystack = [
          org.name,
          getOrgText(org, "subtitle", lang),
          getOrgText(org, "help", lang),
          org.regions.join(" "),
          trustLabels[org.trust][lang],
        ]
          .join(" ")
          .toLowerCase();
        return matchesFilter && (!normalized || haystack.includes(normalized));
      })
      .sort((a, b) => (b.priority || 0) - (a.priority || 0) || a.name.localeCompare(b.name));
  }, [lang, organizations, query, selectedFilter]);

  const selected =
    shown.find((org) => org.id === selectedId) || shown[0] || organizations[0];

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">{t.lastUpdated}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-copy">{t.heroText}</p>
        </div>
      </section>

      <section className="filters" aria-label="Directory filters">
        <div className="filter-row">
          {filters.map(({ id, icon: Icon }) => (
            <button
              className={`filter ${selectedFilter === id ? "is-active" : ""}`}
              key={id}
              onClick={() => setSelectedFilter(id)}
              type="button"
            >
              <Icon aria-hidden="true" />
              {t.filters[id]}
            </button>
          ))}
        </div>
        <label className="search">
          <Search aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.search}
          />
          {query ? (
            <button type="button" onClick={() => setQuery("")}>
              {t.actions.clear}
            </button>
          ) : null}
        </label>
      </section>

      <section className="workspace" aria-label="Organization directory">
        <div className="listing">
          <div className="listing-head">
            <span>{t.table.org}</span>
            <span>{t.table.help}</span>
            <span>{t.table.trust}</span>
            <span>{t.table.action}</span>
            <span>{t.table.donate}</span>
          </div>
          {shown.length === 0 ? (
            <div className="empty-state">{t.empty}</div>
          ) : (
            shown.map((org) => {
              const donateLink = getDonateLink(org);
              const isLiked = likedIds.includes(org.id);

              return (
              <article
                className={`org-row ${selected.id === org.id ? "is-selected" : ""}`}
                key={org.id}
                onClick={(event) => {
                  if (event.target.closest("a, button")) return;
                  handleSelect(org.id);
                }}
              >
                <span className="org-cell org-name">
                  <OrganizationMark org={org} />
                  <span>
                    <strong>{org.name}</strong>
                    <small>{getOrgText(org, "subtitle", lang)}</small>
                  </span>
                </span>
                <span className="org-cell help-cell">
                  <span className="help-copy">{getOrgText(org, "help", lang)}</span>
                  <span className="region-tags">
                    <span className="region-label">{t.availableTo}</span>
                    {org.regions.map((region) => (
                      <Tag key={region}>{region}</Tag>
                    ))}
                  </span>
                </span>
                <span className="org-cell">
                  <TrustBadge type={org.trust} lang={lang} />
                </span>
                <span className="org-cell action-cell">
                  <button
                    className="row-action"
                    onClick={() => handleSelect(org.id)}
                    type="button"
                  >
                    {t.actions.details}
                    <ExternalLink aria-hidden="true" />
                  </button>
                  <span className="row-tools">
                    <button
                      className={`tool-button ${isLiked ? "is-liked" : ""}`}
                      type="button"
                      aria-label={isLiked ? t.actions.liked : t.actions.like}
                      title={isLiked ? t.actions.liked : t.actions.like}
                      onClick={() => toggleLiked(org.id)}
                    >
                      <Heart aria-hidden="true" />
                    </button>
                    <button
                      className="tool-button"
                      type="button"
                      aria-label={t.actions.share}
                      title={copiedId === org.id ? t.actions.copied : t.actions.share}
                      onClick={() => shareOrg(org)}
                    >
                      <Share2 aria-hidden="true" />
                    </button>
                  </span>
                </span>
                <span className="org-cell donate-cell">
                  <a
                    className="donate-button"
                    href={donateLink.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <HeartHandshake aria-hidden="true" />
                    {t.actions.donateNow}
                  </a>
                </span>
              </article>
            );
            })
          )}
          <p className="result-count">
            {t.results
              .replace("{count}", shown.length.toString())
              .replace("{total}", organizations.length.toString())}
          </p>
        </div>

        <aside className="details" aria-label={`${selected.name} details`}>
          <div className="details-title">
            <div>
              <h2>{selected.name}</h2>
              <TrustBadge type={selected.trust} lang={lang} />
            </div>
            <div className="details-actions">
              <button
                className={`icon-button ${likedIds.includes(selected.id) ? "is-liked" : ""}`}
                type="button"
                aria-label={likedIds.includes(selected.id) ? t.actions.liked : t.actions.like}
                title={likedIds.includes(selected.id) ? t.actions.liked : t.actions.like}
                onClick={() => toggleLiked(selected.id)}
              >
                <Heart aria-hidden="true" />
              </button>
              <button
                className="icon-button"
                type="button"
                aria-label={t.actions.share}
                title={copiedId === selected.id ? t.actions.copied : t.actions.share}
                onClick={() => shareOrg(selected)}
              >
                <Share2 aria-hidden="true" />
              </button>
              <button
                className="icon-button"
                type="button"
                aria-label={t.detail.close}
                onClick={() => handleSelect(shown[0]?.id || organizations[0]?.id)}
              >
                <X aria-hidden="true" />
              </button>
            </div>
          </div>

          <a
            className="detail-donate"
            href={getDonateLink(selected).href}
            target="_blank"
            rel="noreferrer"
          >
            <HeartHandshake aria-hidden="true" />
            {t.actions.donateNow}
          </a>

          <dl>
            <Field icon={PackageOpen} title={t.detail.what}>
              {selected.details.what[lang] || selected.details.what.en}
            </Field>
            <Field icon={Users} title={t.detail.who}>
              {selected.details.who[lang] || selected.details.who.en}
            </Field>
            <Field icon={ShieldCheck} title={t.detail.tax}>
              {selected.details.tax[lang] || selected.details.tax.en}
            </Field>
            <Field icon={LinkIcon} title={t.detail.donate}>
              <div className="link-list">
                {selected.details.links.map((link) => (
                  <a
                    href={link.href}
                    key={link.label}
                    target={link.href === "#" ? undefined : "_blank"}
                    rel={link.href === "#" ? undefined : "noreferrer"}
                  >
                    {link.label}
                    <ExternalLink aria-hidden="true" />
                  </a>
                ))}
              </div>
            </Field>
            <Field icon={Truck} title={t.detail.route}>
              {selected.details.route[lang] || selected.details.route.en}
            </Field>
            <Field icon={FileText} title={t.detail.evidence}>
              {selected.details.links.length
                ? selected.details.links.map((link) => link.label).join(" / ")
                : "Source review required"}
            </Field>
            <Field icon={CalendarCheck} title={t.detail.checked}>
              {selected.details.checked}
            </Field>
            <Field icon={AlertCircle} title={t.detail.risk}>
              {selected.details.risk[lang] || selected.details.risk.en}
            </Field>
          </dl>
        </aside>
      </section>
    </>
  );
}

function InfoPage({ page, lang }) {
  const t = copy[lang];
  const isSubmit = page === "submit";
  const [sent, setSent] = useState(false);
  const title = t.pages[`${page}Title`];
  const text = t.pages[`${page}Text`];

  return (
    <section className={`info-page ${isSubmit ? "submit-page" : ""}`}>
      <div className="info-copy">
        <p className="eyebrow">VenezuelaRelief.us</p>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {isSubmit ? (
        <form
          className="submit-form"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <label>
            {t.form.submitter}
            <input required />
          </label>
          <label>
            {t.form.submitterEmail}
            <input required type="email" />
          </label>
          <label>
            {t.form.name}
            <input required />
          </label>
          <label>
            {t.form.logo}
            <input type="url" placeholder="https://" />
          </label>
          <label>
            {t.form.link}
            <input required type="url" placeholder="https://" />
          </label>
          <label>
            {t.form.help}
            <input required />
          </label>
          <label>
            {t.form.region}
            <input required />
          </label>
          <label>
            {t.form.trust}
            <textarea required rows="5" />
          </label>
          <button className="primary-button" type="submit">
            {t.actions.submit}
          </button>
          {sent ? <p className="success">{t.form.sent}</p> : null}
        </form>
      ) : (
        <div className="info-grid">
          {helpCards.map(([id, titleEn, description]) => {
            const filter = filters.find((item) => item.id === id);
            const Icon = filter?.icon || HandHeart;
            return (
              <article key={id}>
                <Icon aria-hidden="true" />
                <h2>{lang === "en" ? titleEn : copy.es.filters[id]}</h2>
                <p>{lang === "en" ? description : t.pages[`${page}Text`]}</p>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function AdminPage({ organizations, setOrganizations }) {
  const [selectedId, setSelectedId] = useState(organizations[0]?.id || "");
  const selected = organizations.find((org) => org.id === selectedId) || organizations[0];
  const [draft, setDraft] = useState(() => getEditorDraft(selected || defaultOrganizations[0]));
  const [message, setMessage] = useState("");
  const [importText, setImportText] = useState("");

  useEffect(() => {
    if (selected) setDraft(getEditorDraft(selected));
  }, [selectedId, selected]);

  function updateDraft(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function toggleDraftList(field, value) {
    setDraft((current) => ({
      ...current,
      [field]: toggleListValue(current[field], value),
    }));
  }

  function saveDraft() {
    const nextOrg = createOrganizationFromDraft(draft, selected);
    setOrganizations((current) =>
      current.map((org) => (org.id === selected?.id ? nextOrg : org)),
    );
    setSelectedId(nextOrg.id);
    setMessage("Saved locally. Publish by syncing to the database or exporting JSON.");
  }

  function addOrganization() {
    const fresh = createOrganizationFromDraft(
      {
        id: "",
        name: "New organization",
        subtitle: "Relief organization",
        logoUrl: "",
        help: "Describe the help this organization provides.",
        categories: "money",
        regions: "US, Global",
        trust: "review",
        status: "review",
        priority: "50",
        priorityNote: "Needs editorial review.",
        donationUrl: "",
        sourceUrl: "",
        what: "Describe what they do.",
        who: "Describe who can help.",
        tax: "Tax status needs review.",
        route: "Aid route needs review.",
        risk: "Needs source verification before publication.",
        checked: "Needs review",
      },
      null,
    );
    fresh.id = `${fresh.id}-${Date.now().toString().slice(-4)}`;
    setOrganizations((current) => [fresh, ...current]);
    setSelectedId(fresh.id);
    setMessage("New organization created in review status.");
  }

  function duplicateOrganization() {
    if (!selected) return;
    const copyOrg = {
      ...selected,
      id: `${selected.id}-copy-${Date.now().toString().slice(-4)}`,
      name: `${selected.name} Copy`,
      status: "review",
      priority: 50,
    };
    setOrganizations((current) => [copyOrg, ...current]);
    setSelectedId(copyOrg.id);
    setMessage("Duplicated as a review draft.");
  }

  function deleteOrganization() {
    if (!selected) return;
    const next = organizations.filter((org) => org.id !== selected.id);
    setOrganizations(next);
    setSelectedId(next[0]?.id || "");
    setMessage("Organization removed from local CMS data.");
  }

  function resetContent() {
    setOrganizations(defaultOrganizations);
    setSelectedId(defaultOrganizations[0].id);
    setMessage("Reset to the code default content.");
  }

  function exportContent() {
    const blob = new Blob([JSON.stringify(organizations, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "venezuela-relief-organizations.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function importContent() {
    try {
      const parsed = JSON.parse(importText);
      if (!Array.isArray(parsed)) throw new Error("Expected an array");
      setOrganizations(parsed);
      setSelectedId(parsed[0]?.id || "");
      setImportText("");
      setMessage("Imported JSON into local CMS data.");
    } catch {
      setMessage("Import failed. Paste JSON exported from this CMS.");
    }
  }

  const counts = organizations.reduce(
    (acc, org) => {
      const status = org.status || "approved";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {},
  );

  return (
    <section className="admin-page" aria-label="Content management system">
      <div className="admin-hero">
        <p className="eyebrow">Private content tools</p>
        <h1>CMS</h1>
        <p>
          Edit organizations, donation links, logos, priority, trust level, and publication status.
        </p>
      </div>

      <div className="admin-summary" aria-label="CMS summary">
        <span>{organizations.length} organizations</span>
        <span>{counts.approved || 0} approved</span>
        <span>{counts.review || 0} in review</span>
      </div>

      {message ? <p className="admin-message">{message}</p> : null}

      <div className="admin-workspace">
        <aside className="admin-list" aria-label="Organizations">
          <div className="admin-toolbar">
            <button className="primary-button" type="button" onClick={addOrganization}>
              Add organization
            </button>
            <button className="secondary-button" type="button" onClick={exportContent}>
              Export JSON
            </button>
          </div>
          <div className="admin-org-list">
            {organizations
              .slice()
              .sort((a, b) => (b.priority || 0) - (a.priority || 0))
              .map((org) => (
                <button
                  className={`admin-org-button ${selected?.id === org.id ? "is-current" : ""}`}
                  key={org.id}
                  type="button"
                  onClick={() => setSelectedId(org.id)}
                >
                  <span>{org.name}</span>
                  <small>{org.status || "approved"} / priority {org.priority || 50}</small>
                </button>
              ))}
          </div>
        </aside>

        <form
          className="admin-editor"
          onSubmit={(event) => {
            event.preventDefault();
            saveDraft();
          }}
        >
          <div className="admin-editor-head">
            <div>
              <h2>{draft.name || "Organization"}</h2>
              <p>{draft.status} / priority {draft.priority}</p>
            </div>
            <div className="admin-editor-actions">
              <button className="secondary-button" type="button" onClick={duplicateOrganization}>
                Duplicate
              </button>
              <button className="danger-button" type="button" onClick={deleteOrganization}>
                Delete
              </button>
              <button className="primary-button" type="submit">
                Save changes
              </button>
            </div>
          </div>

          <div className="admin-form-grid">
            <label>
              Organization name
              <input value={draft.name} onChange={(event) => updateDraft("name", event.target.value)} />
            </label>
            <label>
              Subtitle
              <input value={draft.subtitle} onChange={(event) => updateDraft("subtitle", event.target.value)} />
            </label>
            <label>
              Logo URL
              <input value={draft.logoUrl} onChange={(event) => updateDraft("logoUrl", event.target.value)} placeholder="https://" />
            </label>
            <label>
              Donation URL
              <input value={draft.donationUrl} onChange={(event) => updateDraft("donationUrl", event.target.value)} placeholder="https://" />
            </label>
            <label>
              Source URL
              <input value={draft.sourceUrl} onChange={(event) => updateDraft("sourceUrl", event.target.value)} placeholder="https://" />
            </label>
            <label>
              Last checked
              <input value={draft.checked} onChange={(event) => updateDraft("checked", event.target.value)} />
            </label>
            <label>
              Status
              <select value={draft.status} onChange={(event) => updateDraft("status", event.target.value)}>
                <option value="approved">Approved</option>
                <option value="review">Review</option>
                <option value="rejected">Rejected</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <label>
              Trust level
              <select value={draft.trust} onChange={(event) => updateDraft("trust", event.target.value)}>
                <option value="verified">Verified nonprofit</option>
                <option value="field">Field partner verified</option>
                <option value="community">Community drive</option>
                <option value="review">Needs review</option>
              </select>
            </label>
            <label>
              Priority score
              <input min="0" max="100" type="number" value={draft.priority} onChange={(event) => updateDraft("priority", event.target.value)} />
            </label>
            <label>
              Priority note
              <input value={draft.priorityNote} onChange={(event) => updateDraft("priorityNote", event.target.value)} />
            </label>
          </div>

          <div className="admin-choice-grid">
            <fieldset>
              <legend>Help types</legend>
              <div className="admin-checks">
                {categoryOptions.map(([id, label]) => (
                  <label className="check-pill" key={id}>
                    <input
                      checked={splitList(draft.categories).includes(id)}
                      onChange={() => toggleDraftList("categories", id)}
                      type="checkbox"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Donor regions</legend>
              <div className="admin-checks">
                {regionOptions.map((region) => (
                  <label className="check-pill" key={region}>
                    <input
                      checked={splitList(draft.regions).includes(region)}
                      onChange={() => toggleDraftList("regions", region)}
                      type="checkbox"
                    />
                    {region}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <label>
            Help summary
            <textarea rows="3" value={draft.help} onChange={(event) => updateDraft("help", event.target.value)} />
          </label>
          <label>
            What they do
            <textarea rows="4" value={draft.what} onChange={(event) => updateDraft("what", event.target.value)} />
          </label>
          <label>
            Who can help
            <textarea rows="3" value={draft.who} onChange={(event) => updateDraft("who", event.target.value)} />
          </label>
          <label>
            Tax note
            <textarea rows="3" value={draft.tax} onChange={(event) => updateDraft("tax", event.target.value)} />
          </label>
          <label>
            Aid route
            <textarea rows="3" value={draft.route} onChange={(event) => updateDraft("route", event.target.value)} />
          </label>
          <label>
            Risk notes
            <textarea rows="3" value={draft.risk} onChange={(event) => updateDraft("risk", event.target.value)} />
          </label>

          <div className="admin-import">
            <label>
              Import JSON
              <textarea
                rows="5"
                value={importText}
                onChange={(event) => setImportText(event.target.value)}
                placeholder="Paste exported CMS JSON here"
              />
            </label>
            <div className="admin-editor-actions">
              <button className="secondary-button" type="button" onClick={importContent}>
                Import JSON
              </button>
              <button className="danger-button" type="button" onClick={resetContent}>
                Reset local content
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export function App() {
  const [organizations, setOrganizations] = useEditableOrganizations();
  const [lang, setLang] = useState("en");
  const [view, setView] = useState("directory");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(() => {
    if (typeof window === "undefined") return "direct-relief";
    return new URLSearchParams(window.location.search).get("org") || "direct-relief";
  });
  const t = copy[lang];

  return (
    <main>
      <header className="site-header">
        <button className="brand" type="button" onClick={() => setView("directory")}>
          <img src="/venezuela-relief-mark.png" alt="" />
          <span>
            <strong>{t.brand}</strong>
            <small>{t.strap}</small>
          </span>
        </button>
        <nav aria-label="Primary navigation">
          {["directory", "ways", "abroad", "verify", "submit", "admin"].map((item) => (
            <button
              className={view === item ? "is-current" : ""}
              key={item}
              onClick={() => setView(item)}
              type="button"
            >
              {t.nav[item]}
            </button>
          ))}
        </nav>
        <div className="language" aria-label="Language">
          {["en", "es"].map((item) => (
            <button
              className={lang === item ? "is-active" : ""}
              key={item}
              onClick={() => setLang(item)}
              type="button"
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      {view === "directory" ? (
        <Directory
          organizations={organizations}
          lang={lang}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      ) : view === "admin" ? (
        <AdminPage organizations={organizations} setOrganizations={setOrganizations} />
      ) : (
        <InfoPage page={view} lang={lang} />
      )}
    </main>
  );
}
