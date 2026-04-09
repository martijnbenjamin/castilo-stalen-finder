export interface Swatch {
  id: string;
  collection: string;
  collectionLabel: string;
  leverancier: string;
  code: string;
  name: string;
  nameLabel: string;
  colorGroup: string;
  image: string;
}

export interface Collection {
  id: string;
  label: string;
  leverancier: string;
  description: string;
  count: number;
}

const COLOR_GROUPS: Record<string, string[]> = {
  Rood: [
    "red", "tomato", "fire-red", "candy-apple", "indian-red", "burgundy",
    "wine", "raspberry", "grenadine", "ruby", "rubin", "rosewood",
    "brick", "reishi", "goji-berry", "goji", "acerola", "rosehip",
    "rhubarb", "hibiscus",
    // Duits (Amalfi)
    "rot", "kirsch",
    // Nederlands (Tretford)
    "aalbes", "aardbei", "flamingo", "bloesem",
    // HPL
    "antiek-roze",
  ],
  Oranje: [
    "orange", "burnt-orange", "persimmon", "nasturtium", "saffron",
    "tangerine", "marigold", "apricot", "mandarin", "sunkist",
    "melon", "melba", "coral", "peach", "cobre", "safran",
    "lox", "rum-sherbet", "winter-squash", "inca-berry",
    // Duits (Amalfi)
    "mandarijn", "grapefruit",
  ],
  Geel: [
    "yellow", "citrus", "lemon", "saffron-silk", "marigold",
    "wheat", "squash", "butternut-squash", "bee-pollen", "turmeric",
    "mizzle",
    // Duits (Amalfi)
    "limone",
    // Nederlands (Tretford)
    "zonnebloem", "ananas",
    // HPL
    "zandgeel",
  ],
  Groen: [
    "green", "hunter-green", "empire-green", "china-green", "spruce",
    "lime", "jade", "emerald", "pistacho", "sage", "bottle",
    "celery", "basil", "forest", "jungle", "hunter", "eucalyptus",
    "spinach", "avocado", "alfalfa", "swiss-chard", "kale",
    "moringa", "matcha", "kelp", "spirulina", "fennel", "mint-julep",
    "guarana", "pea-flower", "noni",
    // Duits (Amalfi)
    "grun", "pistazie", "pinie", "parakeet", "mint",
    // Nederlands (Tretford)
    "varen", "zeewier", "bamboe", "broccoli", "wasabi", "tijm",
    "lariks", "appel", "den", "mos",
    // HPL
    "pistache-groen", "olijfgroen",
  ],
  Blauw: [
    "blue", "bright-blue", "light-blue", "marina", "bluejay",
    "royal-blue", "navy", "colonial-blue", "sky", "cerulean",
    "fjord", "turk", "turquoise", "sapphire", "baltic", "delft",
    "deepsea", "whale", "light-teal", "teal", "petrol", "glacier",
    "skylight", "cadet", "majik",
    // Duits (Amalfi)
    "marine", "azur", "turkis",
    // Nederlands (Tretford)
    "blauw", "korenbloem", "noordpool", "winter",
    // HPL
    "denimblauw",
  ],
  Paars: [
    "purple", "purple-iris", "grape", "mauve", "lilac", "phoenician",
    "port", "orchid", "aubergine", "elderberry", "huckleberry",
    "lotus", "rose",
    // Duits (Amalfi)
    "lila", "fuchsia",
    // Nederlands (Tretford)
    "lupine", "pruim", "lavendel", "bosbes",
  ],
  Bruin: [
    "brown", "oak-brown", "chocolate", "chocolat", "espresso", "expresso",
    "saddle-tan", "russet", "allspice", "camel", "brandy", "deep-clay",
    "luggage", "umber", "mocca", "cinnamon", "sweet-potato",
    "cacao-bean", "carob", "khajur", "rooibos",
    // Duits (Amalfi)
    "hellbraun",
    // Nederlands (Tretford)
    "truffel", "schors", "aarde", "denneappel", "kastanje", "bruin",
  ],
  Neutraal: [
    "white", "snow-white", "black", "grey", "light-grey", "ocean-grey",
    "coal", "natural", "quartz", "moonglow", "slate", "beige",
    "cream", "champagne", "oatmeal", "macadamia", "sandstone",
    "taupe", "sisal", "icecream", "aluminium", "ice", "plata",
    "storm", "graphite", "titanium", "sterling", "shiitake",
    "meteor", "carbon", "jet", "windy", "smog", "coconut",
    "lucuma", "nigella", "vanilla-chai", "chamomille", "jasmin",
    "flax-seed", "tocos", "buckweed", "peru-maca", "lentils",
    "chia-seed", "black-soybean",
    // Duits (Amalfi)
    "weiss", "leinen", "buche", "auster", "titan", "grau",
    "vanille", "anthrazit", "cashmere", "delfin", "eis", "achat",
    // Nederlands (Tretford)
    "berkschors", "klei", "kiezel", "champignon", "rogge", "zwam",
    "zand", "cashew", "steen", "ijs", "toendra", "parel", "poeder",
    "aardappel", "peer", "amandel",
  ],
};

function getColorGroup(name: string): string {
  const lower = name.toLowerCase();
  for (const [group, keywords] of Object.entries(COLOR_GROUPS)) {
    if (keywords.some((kw) => lower.includes(kw) || kw.includes(lower))) {
      return group;
    }
  }
  return "Neutraal";
}

function formatName(raw: string): string {
  return raw
    .replace(/-/g, " ")
    .replace(/\beco\b/gi, "(eco)")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatCollectionLabel(id: string): string {
  const map: Record<string, string> = {
    vyvafabrics_boltaflex_colourways: "Boltaflex Colourways",
    vyvafabrics_freckle: "Freckle",
    vyvafabrics_harlow: "Harlow",
    vyvafabrics_pukka: "Pukka",
    vyvafabrics_silverguard: "Silverguard",
    amalfi: "Amalfi",
    tretford: "Tretford",
    flotex: "Flotex Calgary",
    hpl: "HPL",
  };
  return map[id] || id;
}

function getCollectionLeverancier(id: string): string {
  const map: Record<string, string> = {
    vyvafabrics_boltaflex_colourways: "Vyva Fabrics",
    vyvafabrics_freckle: "Vyva Fabrics",
    vyvafabrics_harlow: "Vyva Fabrics",
    vyvafabrics_pukka: "Vyva Fabrics",
    vyvafabrics_silverguard: "Vyva Fabrics",
    amalfi: "Wildeman & van Leeuwen",
    tretford: "Tretford",
    flotex: "Forbo",
    hpl: "Egger",
  };
  return map[id] || id;
}

function formatCollectionDescription(id: string): string {
  const map: Record<string, string> = {
    vyvafabrics_boltaflex_colourways: "Kunstleer met een gladde, zachte textuur. Slijtvast en onderhoudsvriendelijk.",
    vyvafabrics_freckle: "Speelse meubelstof met subtiele textuur en warme tinten.",
    vyvafabrics_harlow: "Duurzame meubelstof geïnspireerd op superfoods. Verkrijgbaar in eco-varianten.",
    vyvafabrics_pukka: "Elegante meubelstof met thee-geïnspireerde kleurnamen.",
    vyvafabrics_silverguard: "Beschermde meubelstof met vlekwerende Silverguard-technologie.",
    amalfi: "Hoogwaardige meubelstof van Wildeman & van Leeuwen. Beschikbaar in 44 kleuren.",
    tretford: "Geweven tapijttegel met Nederlandse natuurnamen. Uitgebreid kleurenpalet van 51 tinten.",
    flotex: "Vloerafwerking met de uitstraling van tapijt en het gemak van vinyl. Calgary-serie.",
    hpl: "High Pressure Laminate (HPL) plaatmateriaal in houtdecoren en uni-kleuren.",
  };
  return map[id] || "";
}

// Parse all swatch files from the known structure
function parseSwatchFilename(filename: string, collectionDir: string): Swatch | null {
  // Remove extension (.jpeg or .jpg)
  const base = filename.replace(/\.jpe?g$/, "");
  // Pattern: vyvafabrics_{collection}_{code}_{name}  (5+ parts)
  //      or: amalfi_{code}_{name}                    (3 parts)
  //      or: tretford_{code}_{name}                  (3 parts)
  const parts = base.split("_");
  if (parts.length < 3) return null;

  // The name is always the last part
  const name = parts[parts.length - 1];
  // The code is the second-to-last part (may contain -har suffix for harlow)
  const code = parts[parts.length - 2].replace(/-har$/, "");

  return {
    id: `${collectionDir}_${code}`,
    collection: collectionDir,
    collectionLabel: formatCollectionLabel(collectionDir),
    leverancier: getCollectionLeverancier(collectionDir),
    code,
    name,
    nameLabel: formatName(name),
    colorGroup: getColorGroup(name),
    image: `/swatches/${collectionDir}/${filename}`,
  };
}

// Static data generated from filenames
const SWATCH_FILES: Record<string, string[]> = {
  vyvafabrics_boltaflex_colourways: [
    "vyvafabrics_boltaflex_colourways_454121_bright-blue.jpeg",
    "vyvafabrics_boltaflex_colourways_454122_citrus.jpeg",
    "vyvafabrics_boltaflex_colourways_454123_light-blue.jpeg",
    "vyvafabrics_boltaflex_colourways_454283_marina.jpeg",
    "vyvafabrics_boltaflex_colourways_454284_bluejay.jpeg",
    "vyvafabrics_boltaflex_colourways_454285_tomato.jpeg",
    "vyvafabrics_boltaflex_colourways_454286_blueberry.jpeg",
    "vyvafabrics_boltaflex_colourways_454287_new-burgundy.jpeg",
    "vyvafabrics_boltaflex_colourways_454288_deep-clay.jpeg",
    "vyvafabrics_boltaflex_colourways_454289_indian-red.jpeg",
    "vyvafabrics_boltaflex_colourways_454290_black.jpeg",
    "vyvafabrics_boltaflex_colourways_454291_purple-iris.jpeg",
    "vyvafabrics_boltaflex_colourways_454292_royal-blue.jpeg",
    "vyvafabrics_boltaflex_colourways_454293_nasturtium.jpeg",
    "vyvafabrics_boltaflex_colourways_454294_saffron-silk.jpeg",
    "vyvafabrics_boltaflex_colourways_454295_turk.jpeg",
    "vyvafabrics_boltaflex_colourways_454296_hunter-green.jpeg",
    "vyvafabrics_boltaflex_colourways_454297_russet.jpeg",
    "vyvafabrics_boltaflex_colourways_454298_candy-apple.jpeg",
    "vyvafabrics_boltaflex_colourways_454299_burnt-orange.jpeg",
    "vyvafabrics_boltaflex_colourways_454300_light-teal.jpeg",
    "vyvafabrics_boltaflex_colourways_454301_marigold.jpeg",
    "vyvafabrics_boltaflex_colourways_454302_grape.jpeg",
    "vyvafabrics_boltaflex_colourways_454303_persimmon.jpeg",
    "vyvafabrics_boltaflex_colourways_454304_allspice.jpeg",
    "vyvafabrics_boltaflex_colourways_454305_camel.jpeg",
    "vyvafabrics_boltaflex_colourways_454306_white.jpeg",
    "vyvafabrics_boltaflex_colourways_454307_wine.jpeg",
    "vyvafabrics_boltaflex_colourways_454308_lemon-peel.jpeg",
    "vyvafabrics_boltaflex_colourways_454309_saddle-tan.jpeg",
    "vyvafabrics_boltaflex_colourways_454310_moonglow.jpeg",
    "vyvafabrics_boltaflex_colourways_454311_fire-red.jpeg",
    "vyvafabrics_boltaflex_colourways_454312_navy.jpeg",
    "vyvafabrics_boltaflex_colourways_454313_mint-julep.jpeg",
    "vyvafabrics_boltaflex_colourways_454314_empire-green.jpeg",
    "vyvafabrics_boltaflex_colourways_454315_snow-white.jpeg",
    "vyvafabrics_boltaflex_colourways_454316_slate.jpeg",
    "vyvafabrics_boltaflex_colourways_454317_jade.jpeg",
    "vyvafabrics_boltaflex_colourways_454318_chocolate.jpeg",
    "vyvafabrics_boltaflex_colourways_454319_china-green.jpeg",
    "vyvafabrics_boltaflex_colourways_454325_spruce.jpeg",
    "vyvafabrics_boltaflex_colourways_454326_lime.jpeg",
    "vyvafabrics_boltaflex_colourways_454327_wheat.jpeg",
    "vyvafabrics_boltaflex_colourways_454328_coal.jpeg",
    "vyvafabrics_boltaflex_colourways_454329_natural.jpeg",
    "vyvafabrics_boltaflex_colourways_454330_quartz.jpeg",
    "vyvafabrics_boltaflex_colourways_454331_light-grey.jpeg",
    "vyvafabrics_boltaflex_colourways_454332_ocean-grey.jpeg",
    "vyvafabrics_boltaflex_colourways_454333_expresso.jpeg",
    "vyvafabrics_boltaflex_colourways_454336_brandy.jpeg",
    "vyvafabrics_boltaflex_colourways_454344_fjord.jpeg",
    "vyvafabrics_boltaflex_colourways_454345_apricot.jpeg",
    "vyvafabrics_boltaflex_colourways_454346_colonial-blue.jpeg",
    "vyvafabrics_boltaflex_colourways_454347_sky.jpeg",
    "vyvafabrics_boltaflex_colourways_454348_lox.jpeg",
    "vyvafabrics_boltaflex_colourways_454349_cerulean.jpeg",
    "vyvafabrics_boltaflex_colourways_454350_phoenician.jpeg",
    "vyvafabrics_boltaflex_colourways_454351_port.jpeg",
    "vyvafabrics_boltaflex_colourways_454352_emerald.jpeg",
    "vyvafabrics_boltaflex_colourways_454353_cadet.jpeg",
    "vyvafabrics_boltaflex_colourways_454354_rum-sherbet.jpeg",
    "vyvafabrics_boltaflex_colourways_454358_grey.jpeg",
    "vyvafabrics_boltaflex_colourways_454361_melon.jpeg",
    "vyvafabrics_boltaflex_colourways_454363_oak-brown.jpeg",
    "vyvafabrics_boltaflex_colourways_454365_melba.jpeg",
    "vyvafabrics_boltaflex_colourways_454366_glacier.jpeg",
    "vyvafabrics_boltaflex_colourways_454367_mauve.jpeg",
    "vyvafabrics_boltaflex_colourways_454368_lilac.jpeg",
    "vyvafabrics_boltaflex_colourways_454908_rosewood.jpeg",
  ],
  vyvafabrics_freckle: [
    "vyvafabrics_freckle_5025_grapefruit.jpeg",
    "vyvafabrics_freckle_5026_eucalyptus.jpeg",
    "vyvafabrics_freckle_5027_oatmeal.jpeg",
    "vyvafabrics_freckle_5028_chocolat.jpeg",
    "vyvafabrics_freckle_5029_spinach.jpeg",
  ],
  vyvafabrics_harlow: [
    "vyvafabrics_harlow_6000-har_reishi.jpeg",
    "vyvafabrics_harlow_6001-har_goji-berry.jpeg",
    "vyvafabrics_harlow_6002-har_guarana.jpeg",
    "vyvafabrics_harlow_6003-har_swiss-chard.jpeg",
    "vyvafabrics_harlow_6004-har_alfalfa.jpeg",
    "vyvafabrics_harlow_6005-har_acerola.jpeg",
    "vyvafabrics_harlow_6006-har_pea-flower.jpeg",
    "vyvafabrics_harlow_6007-har_elderberry.jpeg",
    "vyvafabrics_harlow_6008-har_huckleberry.jpeg",
    "vyvafabrics_harlow_6009-har_black-soybean.jpeg",
    "vyvafabrics_harlow_6010-har_lentils.jpeg",
    "vyvafabrics_harlow_6011-har_chia-seed.jpeg",
    "vyvafabrics_harlow_6012-har_butternut-squash.jpeg",
    "vyvafabrics_harlow_6013-har_buckweed.jpeg",
    "vyvafabrics_harlow_6014-har_tocos.jpeg",
    "vyvafabrics_harlow_6015-har_inca-berry.jpeg",
    "vyvafabrics_harlow_6016-har_winter-squash.jpeg",
    "vyvafabrics_harlow_6017-har_flax-seed.jpeg",
    "vyvafabrics_harlow_6018-har_kale.jpeg",
    "vyvafabrics_harlow_6019-har_peru-maca.jpeg",
    "vyvafabrics_harlow_6020-har_bee-pollen.jpeg",
    "vyvafabrics_harlow_6021-har_turmeric.jpeg",
    "vyvafabrics_harlow_6022-har_cinnamon.jpeg",
    "vyvafabrics_harlow_6023-har_sweet-potato.jpeg",
    "vyvafabrics_harlow_6024-har_cacao-bean.jpeg",
    "vyvafabrics_harlow_6025-har_carob.jpeg",
    "vyvafabrics_harlow_6026-har_khajur.jpeg",
    "vyvafabrics_harlow_6027-har_coconut.jpeg",
    "vyvafabrics_harlow_6028-har_lucuma.jpeg",
    "vyvafabrics_harlow_6029-har_moringa.jpeg",
    "vyvafabrics_harlow_6030-har_noni.jpeg",
    "vyvafabrics_harlow_6031-har_nigella.jpeg",
    "vyvafabrics_harlow_6032-har_matcha-eco.jpeg",
    "vyvafabrics_harlow_6033-har_kelp-eco.jpeg",
    "vyvafabrics_harlow_6034-har_spirulina-eco.jpeg",
    "vyvafabrics_harlow_6035-har_majik-eco.jpeg",
    "vyvafabrics_harlow_6036-har_rooibos-eco.jpeg",
    "vyvafabrics_harlow_6037-har_hibiscus-eco.jpeg",
  ],
  vyvafabrics_pukka: [
    "vyvafabrics_pukka_5015_peach.jpeg",
    "vyvafabrics_pukka_5016_vanilla-chai.jpeg",
    "vyvafabrics_pukka_5017_chamomille.jpeg",
    "vyvafabrics_pukka_5018_tangerine.jpeg",
    "vyvafabrics_pukka_5019_jasmin.jpeg",
    "vyvafabrics_pukka_5020_fennel.jpeg",
    "vyvafabrics_pukka_5021_rosehip.jpeg",
    "vyvafabrics_pukka_5022_rhubarb.jpeg",
  ],
  vyvafabrics_silverguard: [
    "vyvafabrics_silverguard_sg90001_macadamia.jpeg",
    "vyvafabrics_silverguard_sg90002_sandstone.jpeg",
    "vyvafabrics_silverguard_sg90005_mocca.jpeg",
    "vyvafabrics_silverguard_sg90009_taupe.jpeg",
    "vyvafabrics_silverguard_sg90013_orange.jpeg",
    "vyvafabrics_silverguard_sg90073_luggage.jpeg",
    "vyvafabrics_silverguard_sg91010_beige.jpeg",
    "vyvafabrics_silverguard_sg91014_umber.jpeg",
    "vyvafabrics_silverguard_sg91051_sisal.jpeg",
    "vyvafabrics_silverguard_sg91077_cream.jpeg",
    "vyvafabrics_silverguard_sg91078_champagne.jpeg",
    "vyvafabrics_silverguard_sg92003_cobre.jpeg",
    "vyvafabrics_silverguard_sg92011_red.jpeg",
    "vyvafabrics_silverguard_sg92012_sunkist.jpeg",
    "vyvafabrics_silverguard_sg92016_raspberry.jpeg",
    "vyvafabrics_silverguard_sg92064_wine.jpeg",
    "vyvafabrics_silverguard_sg92089_white.jpeg",
    "vyvafabrics_silverguard_sg92090_icecream.jpeg",
    "vyvafabrics_silverguard_sg92092_avocado.jpeg",
    "vyvafabrics_silverguard_sg92093_squash.jpeg",
    "vyvafabrics_silverguard_sg92094_petrol.jpeg",
    "vyvafabrics_silverguard_sg92095_grenadine.jpeg",
    "vyvafabrics_silverguard_sg92096_tomato.jpeg",
    "vyvafabrics_silverguard_sg92097_orchid.jpeg",
    "vyvafabrics_silverguard_sg92098_rose.jpeg",
    "vyvafabrics_silverguard_sg92099_lotus.jpeg",
    "vyvafabrics_silverguard_sg92100_teal.jpeg",
    "vyvafabrics_silverguard_sg92101_aluminium.jpeg",
    "vyvafabrics_silverguard_sg92102_coral.jpeg",
    "vyvafabrics_silverguard_sg92103_skylight.jpeg",
    "vyvafabrics_silverguard_sg92105_camel.jpeg",
    "vyvafabrics_silverguard_sg92318_windy.jpeg",
    "vyvafabrics_silverguard_sg93001_turquoise.jpeg",
    "vyvafabrics_silverguard_sg93007_sapphire.jpeg",
    "vyvafabrics_silverguard_sg93066_baltic.jpeg",
    "vyvafabrics_silverguard_sg93067_delft.jpeg",
    "vyvafabrics_silverguard_sg93068_jet.jpeg",
    "vyvafabrics_silverguard_sg93352_deepsea.jpeg",
    "vyvafabrics_silverguard_sg93375_whale.jpeg",
    "vyvafabrics_silverguard_sg94001_plata.jpeg",
    "vyvafabrics_silverguard_sg94002_storm.jpeg",
    "vyvafabrics_silverguard_sg94003_graphite.jpeg",
    "vyvafabrics_silverguard_sg94004_ice.jpeg",
    "vyvafabrics_silverguard_sg94010_titanium.jpeg",
    "vyvafabrics_silverguard_sg94011_sterling.jpeg",
    "vyvafabrics_silverguard_sg94012_shiitake.jpeg",
    "vyvafabrics_silverguard_sg94024_meteor.jpeg",
    "vyvafabrics_silverguard_sg95008_pistacho.jpeg",
    "vyvafabrics_silverguard_sg95009_sage.jpeg",
    "vyvafabrics_silverguard_sg95010_bottle.jpeg",
    "vyvafabrics_silverguard_sg95019_celery.jpeg",
    "vyvafabrics_silverguard_sg95020_basil.jpeg",
    "vyvafabrics_silverguard_sg95039_smog.jpeg",
    "vyvafabrics_silverguard_sg95063_forest.jpeg",
    "vyvafabrics_silverguard_sg95444_jungle.jpeg",
    "vyvafabrics_silverguard_sg95468_hunter.jpeg",
    "vyvafabrics_silverguard_sg96004_rubin.jpeg",
    "vyvafabrics_silverguard_sg96061_mandarin.jpeg",
    "vyvafabrics_silverguard_sg96062_melon.jpeg",
    "vyvafabrics_silverguard_sg96065_safran.jpeg",
    "vyvafabrics_silverguard_sg96434_mizzle.jpeg",
    "vyvafabrics_silverguard_sg97001_aubergine.jpeg",
    "vyvafabrics_silverguard_sg97251_goji.jpeg",
    "vyvafabrics_silverguard_sg99001_black.jpeg",
    "vyvafabrics_silverguard_sg99002_carbon.jpeg",
    "vyvafabrics_silverguard_sg99243_brick.jpeg",
  ],
  amalfi: [
    "amalfi_008714_sisal.jpg",
    "amalfi_008716_black.jpg",
    "amalfi_008717_weiss.jpg",
    "amalfi_008718_leinen.jpg",
    "amalfi_008719_buche.jpg",
    "amalfi_008720_marine.jpg",
    "amalfi_008721_delft.jpg",
    "amalfi_008722_rot.jpg",
    "amalfi_008723_grun.jpg",
    "amalfi_008724_turkis.jpg",
    "amalfi_008725_auster.jpg",
    "amalfi_008726_melon.jpg",
    "amalfi_008727_titan.jpg",
    "amalfi_008728_grau.jpg",
    "amalfi_008730_port.jpg",
    "amalfi_008731_safran.jpg",
    "amalfi_008732_kirsch.jpg",
    "amalfi_010427_parakeet.jpg",
    "amalfi_010682_orange.jpg",
    "amalfi_013487_taupe.jpg",
    "amalfi_013929_beige.jpg",
    "amalfi_014128_azur.jpg",
    "amalfi_014129_pistazie.jpg",
    "amalfi_014130_mocca.jpg",
    "amalfi_014131_vanille.jpg",
    "amalfi_015867_anthrazit.jpg",
    "amalfi_015905_fuchsia.jpg",
    "amalfi_016265_mandarin.jpg",
    "amalfi_019510_smoke.jpg",
    "amalfi_019511_cashmere.jpg",
    "amalfi_019512_nature.jpg",
    "amalfi_019521_pinie.jpg",
    "amalfi_019522_limone.jpg",
    "amalfi_019868_baltic.jpg",
    "amalfi_020646_hellbraun.jpg",
    "amalfi_021770_rose.jpg",
    "amalfi_021771_delfin.jpg",
    "amalfi_021772_eis.jpg",
    "amalfi_021773_pastellgreen.jpg",
    "amalfi_021774_neo-mint.jpg",
    "amalfi_021775_lila.jpg",
    "amalfi_021776_petrol.jpg",
    "amalfi_021777_sky.jpg",
    "amalfi_021778_achat.jpg",
  ],
  tretford: [
    "tretford_512_truffel.jpg",
    "tretford_514_blauwe-distel.jpg",
    "tretford_515_berkschors.jpg",
    "tretford_516_blauw-druifje.jpg",
    "tretford_517_korenbloem.jpg",
    "tretford_519_lariks.jpg",
    "tretford_520_klei.jpg",
    "tretford_523_kiezel.jpg",
    "tretford_524_aalbes.jpg",
    "tretford_532_amandel.jpg",
    "tretford_534_schors.jpg",
    "tretford_538_winter.jpg",
    "tretford_555_champignon.jpg",
    "tretford_556_varen.jpg",
    "tretford_558_zeewier.jpg",
    "tretford_559_aarde.jpg",
    "tretford_560_rogge.jpg",
    "tretford_564_bamboe.jpg",
    "tretford_565_den.jpg",
    "tretford_566_broccoli.jpg",
    "tretford_567_lupine.jpg",
    "tretford_568_ananas.jpg",
    "tretford_569_mos.jpg",
    "tretford_570_aardbei.jpg",
    "tretford_571_aardappel.jpg",
    "tretford_572_denneappel.jpg",
    "tretford_573_kastanje.jpg",
    "tretford_575_blauwe-bes.jpg",
    "tretford_580_appel.jpg",
    "tretford_581_bosbes.jpg",
    "tretford_582_grapefruit.jpg",
    "tretford_584_pruim.jpg",
    "tretford_585_mandarijn.jpg",
    "tretford_588_bloesem.jpg",
    "tretford_590_bruine-bonen.jpg",
    "tretford_591_zwam.jpg",
    "tretford_592_lavendel.jpg",
    "tretford_601_zand.jpg",
    "tretford_602_cashew.jpg",
    "tretford_603_zonnebloem.jpg",
    "tretford_611_peer.jpg",
    "tretford_622_wasabi.jpg",
    "tretford_632_steen.jpg",
    "tretford_640_ijs.jpg",
    "tretford_641_noordpool.jpg",
    "tretford_642_tijm.jpg",
    "tretford_643_toendra.jpg",
    "tretford_644_aubergine.jpg",
    "tretford_645_flamingo.jpg",
    "tretford_646_poeder.jpg",
    "tretford_647_parel.jpg",
  ],
  flotex: [
    "flotex_s290004_menthol.jpg",
    "flotex_s290006_sahara.jpg",
    "flotex_s290010_ash.jpg",
    "flotex_s290011_quartz.jpg",
    "flotex_s290019_carbon.jpg",
    "flotex_s290025_riviera.jpg",
    "flotex_s290026_linen.jpg",
  ],
  hpl: [
    "hpl_H1145_bardolino-eik.jpg",
    "hpl_H1223_sevilla-es.jpg",
    "hpl_H1277_lakeland-acacia-licht.jpg",
    "hpl_H1357_spree-eik-grijs-beige.jpg",
    "hpl_H1710_kentucky-kastanjelaar-zand.jpg",
    "hpl_H1715_parona-walnoot.jpg",
    "hpl_H1732_zandberk.jpg",
    "hpl_H1910_wilg-beuk.jpg",
    "hpl_H3157_vicenza-eik.jpg",
    "hpl_H3158_vicenza-eik-grijs.jpg",
    "hpl_H3170_kendal-eik.jpg",
    "hpl_H3702_pacific-notelaar-tabak.jpg",
    "hpl_H3734_dijon-notelaar.jpg",
    "hpl_H3840_mandal-esdoorn-natuur.jpg",
    "hpl_U125_zandgeel.jpg",
    "hpl_U325_antiek-roze.jpg",
    "hpl_U540_denimblauw.jpg",
    "hpl_U608_pistache-groen.jpg",
    "hpl_U640_olijfgroen.jpg",
    "hpl_U732_stofgrijs.jpg",
    "hpl_W1000_wit.jpg",
  ],
};

export const swatches: Swatch[] = Object.entries(SWATCH_FILES).flatMap(
  ([collectionDir, files]) =>
    files
      .map((f) => parseSwatchFilename(f, collectionDir))
      .filter((s): s is Swatch => s !== null)
);

export const collections: Collection[] = Object.keys(SWATCH_FILES).map(
  (id) => ({
    id,
    label: formatCollectionLabel(id),
    leverancier: getCollectionLeverancier(id),
    description: formatCollectionDescription(id),
    count: SWATCH_FILES[id].length,
  })
);

export const colorGroups = Object.keys(COLOR_GROUPS);
