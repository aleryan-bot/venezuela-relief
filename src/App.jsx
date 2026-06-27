import { useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarCheck,
  CheckCircle2,
  CircleDollarSign,
  ExternalLink,
  FileText,
  Globe2,
  HandHeart,
  HeartHandshake,
  Link as LinkIcon,
  MapPin,
  PackageOpen,
  Search,
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
  { id: "europe", icon: Globe2 },
  { id: "tax", icon: ShieldCheck },
];

const copy = {
  en: {
    brand: "Venezuela Relief",
    strap: "Earthquake relief",
    nav: {
      directory: "Directory",
      ways: "Ways to help",
      abroad: "For donors abroad",
      verify: "Verification process",
      submit: "Submit",
    },
    heroTitle: "Verified ways to help Venezuela",
    heroText:
      "Compare donation, supply, volunteer, and community efforts with clear source links.",
    lastUpdated: "Last updated June 27, 2026",
    availableTo: "Available to",
    draft:
      "Starter research list: each listing uses source links. Confirm IRS status before publishing tax guidance.",
    filters: {
      all: "All",
      money: "Money donations",
      medical: "Medical supplies",
      food: "Food + water",
      dropoff: "Local drop-offs",
      volunteer: "Volunteer",
      europe: "Europe-friendly",
      tax: "US tax-deductible",
    },
    search: "Search by organization, help type, or region",
    table: {
      org: "Organization",
      help: "Help provided",
      region: "Donor region",
      trust: "Trust level",
      action: "Action",
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
      submit: "Submit for review",
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
      submitTitle: "Suggest an organization",
      submitText:
        "Submissions go into review first. They should not appear publicly until source links, help type, and donation routes are checked.",
    },
    form: {
      name: "Organization name",
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
      submit: "Enviar",
    },
    heroTitle: "Formas verificadas de ayudar a Venezuela",
    heroText:
      "Compara donaciones, insumos, voluntariado y esfuerzos comunitarios con fuentes claras.",
    lastUpdated: "Actualizado el 27 de junio de 2026",
    availableTo: "Disponible para",
    draft:
      "Lista inicial investigada: cada opcion usa fuentes. Confirmar IRS antes de publicar guias fiscales.",
    filters: {
      all: "Todo",
      money: "Donaciones",
      medical: "Insumos medicos",
      food: "Comida + agua",
      dropoff: "Centros de acopio",
      volunteer: "Voluntariado",
      europe: "Desde Europa",
      tax: "Deducible en EEUU",
    },
    search: "Buscar por organizacion, ayuda o region",
    table: {
      org: "Organizacion",
      help: "Tipo de ayuda",
      region: "Region del donante",
      trust: "Nivel de confianza",
      action: "Accion",
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
      submit: "Enviar a revision",
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
      submitTitle: "Sugerir una organizacion",
      submitText:
        "Las sugerencias pasan primero por revision. No deben publicarse hasta verificar fuentes, tipo de ayuda y ruta de donacion.",
    },
    form: {
      name: "Nombre de la organizacion",
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

const organizations = [
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
    categories: ["money", "food", "medical", "tax", "europe"],
    regions: ["US", "Europe", "Global"],
    trust: "verified",
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
    categories: ["money", "food", "medical", "tax", "europe"],
    regions: ["US", "Europe", "Global"],
    trust: "verified",
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
  return <span className={`org-mark ${org.mark}`}>{org.initials}</span>;
}

function Directory({ lang, selectedFilter, setSelectedFilter, selectedId, setSelectedId }) {
  const t = copy[lang];
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return organizations.filter((org) => {
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
    });
  }, [lang, query, selectedFilter]);

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
        <p className="draft-note">
          <AlertCircle aria-hidden="true" />
          {t.draft}
        </p>
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
          </div>
          {shown.length === 0 ? (
            <div className="empty-state">{t.empty}</div>
          ) : (
            shown.map((org) => (
              <button
                className={`org-row ${selected.id === org.id ? "is-selected" : ""}`}
                key={org.id}
                onClick={() => setSelectedId(org.id)}
                type="button"
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
                <span className="org-cell row-action">
                  {t.actions.details}
                  <ExternalLink aria-hidden="true" />
                </span>
              </button>
            ))
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
            <button
              className="icon-button"
              type="button"
              aria-label={t.detail.close}
              onClick={() => setSelectedId(shown[0]?.id || organizations[0].id)}
            >
              <X aria-hidden="true" />
            </button>
          </div>

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
            {t.form.name}
            <input required />
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

export function App() {
  const [lang, setLang] = useState("en");
  const [view, setView] = useState("directory");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedId, setSelectedId] = useState("direct-relief");
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
          {["directory", "ways", "abroad", "verify", "submit"].map((item) => (
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
          lang={lang}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      ) : (
        <InfoPage page={view} lang={lang} />
      )}
    </main>
  );
}
