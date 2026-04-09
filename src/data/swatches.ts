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
    // HPL houtdecoren
    "bardolino", "sevilla", "parona", "walnoot", "notelaar", "dijon",
    "wilg-beuk",
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
    if (keywords.some((kw) => {
      // Korte keywords (<=3 chars) alleen exact matchen om valse substring-hits te voorkomen
      if (kw.length <= 3) return lower === kw;
      return lower.includes(kw) || kw.includes(lower);
    })) {
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
  // Remove extension
  const base = filename.replace(/\.(webp|jpe?g)$/, "");
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
    "vyvafabrics_boltaflex_colourways_454121_bright-blue.webp",
    "vyvafabrics_boltaflex_colourways_454122_citrus.webp",
    "vyvafabrics_boltaflex_colourways_454123_light-blue.webp",
    "vyvafabrics_boltaflex_colourways_454283_marina.webp",
    "vyvafabrics_boltaflex_colourways_454284_bluejay.webp",
    "vyvafabrics_boltaflex_colourways_454285_tomato.webp",
    "vyvafabrics_boltaflex_colourways_454286_blueberry.webp",
    "vyvafabrics_boltaflex_colourways_454287_new-burgundy.webp",
    "vyvafabrics_boltaflex_colourways_454288_deep-clay.webp",
    "vyvafabrics_boltaflex_colourways_454289_indian-red.webp",
    "vyvafabrics_boltaflex_colourways_454290_black.webp",
    "vyvafabrics_boltaflex_colourways_454291_purple-iris.webp",
    "vyvafabrics_boltaflex_colourways_454292_royal-blue.webp",
    "vyvafabrics_boltaflex_colourways_454293_nasturtium.webp",
    "vyvafabrics_boltaflex_colourways_454294_saffron-silk.webp",
    "vyvafabrics_boltaflex_colourways_454295_turk.webp",
    "vyvafabrics_boltaflex_colourways_454296_hunter-green.webp",
    "vyvafabrics_boltaflex_colourways_454297_russet.webp",
    "vyvafabrics_boltaflex_colourways_454298_candy-apple.webp",
    "vyvafabrics_boltaflex_colourways_454299_burnt-orange.webp",
    "vyvafabrics_boltaflex_colourways_454300_light-teal.webp",
    "vyvafabrics_boltaflex_colourways_454301_marigold.webp",
    "vyvafabrics_boltaflex_colourways_454302_grape.webp",
    "vyvafabrics_boltaflex_colourways_454303_persimmon.webp",
    "vyvafabrics_boltaflex_colourways_454304_allspice.webp",
    "vyvafabrics_boltaflex_colourways_454305_camel.webp",
    "vyvafabrics_boltaflex_colourways_454306_white.webp",
    "vyvafabrics_boltaflex_colourways_454307_wine.webp",
    "vyvafabrics_boltaflex_colourways_454308_lemon-peel.webp",
    "vyvafabrics_boltaflex_colourways_454309_saddle-tan.webp",
    "vyvafabrics_boltaflex_colourways_454310_moonglow.webp",
    "vyvafabrics_boltaflex_colourways_454311_fire-red.webp",
    "vyvafabrics_boltaflex_colourways_454312_navy.webp",
    "vyvafabrics_boltaflex_colourways_454313_mint-julep.webp",
    "vyvafabrics_boltaflex_colourways_454314_empire-green.webp",
    "vyvafabrics_boltaflex_colourways_454315_snow-white.webp",
    "vyvafabrics_boltaflex_colourways_454316_slate.webp",
    "vyvafabrics_boltaflex_colourways_454317_jade.webp",
    "vyvafabrics_boltaflex_colourways_454318_chocolate.webp",
    "vyvafabrics_boltaflex_colourways_454319_china-green.webp",
    "vyvafabrics_boltaflex_colourways_454325_spruce.webp",
    "vyvafabrics_boltaflex_colourways_454326_lime.webp",
    "vyvafabrics_boltaflex_colourways_454327_wheat.webp",
    "vyvafabrics_boltaflex_colourways_454328_coal.webp",
    "vyvafabrics_boltaflex_colourways_454329_natural.webp",
    "vyvafabrics_boltaflex_colourways_454330_quartz.webp",
    "vyvafabrics_boltaflex_colourways_454331_light-grey.webp",
    "vyvafabrics_boltaflex_colourways_454332_ocean-grey.webp",
    "vyvafabrics_boltaflex_colourways_454333_expresso.webp",
    "vyvafabrics_boltaflex_colourways_454336_brandy.webp",
    "vyvafabrics_boltaflex_colourways_454344_fjord.webp",
    "vyvafabrics_boltaflex_colourways_454345_apricot.webp",
    "vyvafabrics_boltaflex_colourways_454346_colonial-blue.webp",
    "vyvafabrics_boltaflex_colourways_454347_sky.webp",
    "vyvafabrics_boltaflex_colourways_454348_lox.webp",
    "vyvafabrics_boltaflex_colourways_454349_cerulean.webp",
    "vyvafabrics_boltaflex_colourways_454350_phoenician.webp",
    "vyvafabrics_boltaflex_colourways_454351_port.webp",
    "vyvafabrics_boltaflex_colourways_454352_emerald.webp",
    "vyvafabrics_boltaflex_colourways_454353_cadet.webp",
    "vyvafabrics_boltaflex_colourways_454354_rum-sherbet.webp",
    "vyvafabrics_boltaflex_colourways_454358_grey.webp",
    "vyvafabrics_boltaflex_colourways_454361_melon.webp",
    "vyvafabrics_boltaflex_colourways_454363_oak-brown.webp",
    "vyvafabrics_boltaflex_colourways_454365_melba.webp",
    "vyvafabrics_boltaflex_colourways_454366_glacier.webp",
    "vyvafabrics_boltaflex_colourways_454367_mauve.webp",
    "vyvafabrics_boltaflex_colourways_454368_lilac.webp",
    "vyvafabrics_boltaflex_colourways_454908_rosewood.webp",
  ],
  vyvafabrics_freckle: [
    "vyvafabrics_freckle_5025_grapefruit.webp",
    "vyvafabrics_freckle_5026_eucalyptus.webp",
    "vyvafabrics_freckle_5027_oatmeal.webp",
    "vyvafabrics_freckle_5028_chocolat.webp",
    "vyvafabrics_freckle_5029_spinach.webp",
  ],
  vyvafabrics_harlow: [
    "vyvafabrics_harlow_6000-har_reishi.webp",
    "vyvafabrics_harlow_6001-har_goji-berry.webp",
    "vyvafabrics_harlow_6002-har_guarana.webp",
    "vyvafabrics_harlow_6003-har_swiss-chard.webp",
    "vyvafabrics_harlow_6004-har_alfalfa.webp",
    "vyvafabrics_harlow_6005-har_acerola.webp",
    "vyvafabrics_harlow_6006-har_pea-flower.webp",
    "vyvafabrics_harlow_6007-har_elderberry.webp",
    "vyvafabrics_harlow_6008-har_huckleberry.webp",
    "vyvafabrics_harlow_6009-har_black-soybean.webp",
    "vyvafabrics_harlow_6010-har_lentils.webp",
    "vyvafabrics_harlow_6011-har_chia-seed.webp",
    "vyvafabrics_harlow_6012-har_butternut-squash.webp",
    "vyvafabrics_harlow_6013-har_buckweed.webp",
    "vyvafabrics_harlow_6014-har_tocos.webp",
    "vyvafabrics_harlow_6015-har_inca-berry.webp",
    "vyvafabrics_harlow_6016-har_winter-squash.webp",
    "vyvafabrics_harlow_6017-har_flax-seed.webp",
    "vyvafabrics_harlow_6018-har_kale.webp",
    "vyvafabrics_harlow_6019-har_peru-maca.webp",
    "vyvafabrics_harlow_6020-har_bee-pollen.webp",
    "vyvafabrics_harlow_6021-har_turmeric.webp",
    "vyvafabrics_harlow_6022-har_cinnamon.webp",
    "vyvafabrics_harlow_6023-har_sweet-potato.webp",
    "vyvafabrics_harlow_6024-har_cacao-bean.webp",
    "vyvafabrics_harlow_6025-har_carob.webp",
    "vyvafabrics_harlow_6026-har_khajur.webp",
    "vyvafabrics_harlow_6027-har_coconut.webp",
    "vyvafabrics_harlow_6028-har_lucuma.webp",
    "vyvafabrics_harlow_6029-har_moringa.webp",
    "vyvafabrics_harlow_6030-har_noni.webp",
    "vyvafabrics_harlow_6031-har_nigella.webp",
    "vyvafabrics_harlow_6032-har_matcha-eco.webp",
    "vyvafabrics_harlow_6033-har_kelp-eco.webp",
    "vyvafabrics_harlow_6034-har_spirulina-eco.webp",
    "vyvafabrics_harlow_6035-har_majik-eco.webp",
    "vyvafabrics_harlow_6036-har_rooibos-eco.webp",
    "vyvafabrics_harlow_6037-har_hibiscus-eco.webp",
  ],
  vyvafabrics_pukka: [
    "vyvafabrics_pukka_5015_peach.webp",
    "vyvafabrics_pukka_5016_vanilla-chai.webp",
    "vyvafabrics_pukka_5017_chamomille.webp",
    "vyvafabrics_pukka_5018_tangerine.webp",
    "vyvafabrics_pukka_5019_jasmin.webp",
    "vyvafabrics_pukka_5020_fennel.webp",
    "vyvafabrics_pukka_5021_rosehip.webp",
    "vyvafabrics_pukka_5022_rhubarb.webp",
  ],
  vyvafabrics_silverguard: [
    "vyvafabrics_silverguard_sg90001_macadamia.webp",
    "vyvafabrics_silverguard_sg90002_sandstone.webp",
    "vyvafabrics_silverguard_sg90005_mocca.webp",
    "vyvafabrics_silverguard_sg90009_taupe.webp",
    "vyvafabrics_silverguard_sg90013_orange.webp",
    "vyvafabrics_silverguard_sg90073_luggage.webp",
    "vyvafabrics_silverguard_sg91010_beige.webp",
    "vyvafabrics_silverguard_sg91014_umber.webp",
    "vyvafabrics_silverguard_sg91051_sisal.webp",
    "vyvafabrics_silverguard_sg91077_cream.webp",
    "vyvafabrics_silverguard_sg91078_champagne.webp",
    "vyvafabrics_silverguard_sg92003_cobre.webp",
    "vyvafabrics_silverguard_sg92011_red.webp",
    "vyvafabrics_silverguard_sg92012_sunkist.webp",
    "vyvafabrics_silverguard_sg92016_raspberry.webp",
    "vyvafabrics_silverguard_sg92064_wine.webp",
    "vyvafabrics_silverguard_sg92089_white.webp",
    "vyvafabrics_silverguard_sg92090_icecream.webp",
    "vyvafabrics_silverguard_sg92092_avocado.webp",
    "vyvafabrics_silverguard_sg92093_squash.webp",
    "vyvafabrics_silverguard_sg92094_petrol.webp",
    "vyvafabrics_silverguard_sg92095_grenadine.webp",
    "vyvafabrics_silverguard_sg92096_tomato.webp",
    "vyvafabrics_silverguard_sg92097_orchid.webp",
    "vyvafabrics_silverguard_sg92098_rose.webp",
    "vyvafabrics_silverguard_sg92099_lotus.webp",
    "vyvafabrics_silverguard_sg92100_teal.webp",
    "vyvafabrics_silverguard_sg92101_aluminium.webp",
    "vyvafabrics_silverguard_sg92102_coral.webp",
    "vyvafabrics_silverguard_sg92103_skylight.webp",
    "vyvafabrics_silverguard_sg92105_camel.webp",
    "vyvafabrics_silverguard_sg92318_windy.webp",
    "vyvafabrics_silverguard_sg93001_turquoise.webp",
    "vyvafabrics_silverguard_sg93007_sapphire.webp",
    "vyvafabrics_silverguard_sg93066_baltic.webp",
    "vyvafabrics_silverguard_sg93067_delft.webp",
    "vyvafabrics_silverguard_sg93068_jet.webp",
    "vyvafabrics_silverguard_sg93352_deepsea.webp",
    "vyvafabrics_silverguard_sg93375_whale.webp",
    "vyvafabrics_silverguard_sg94001_plata.webp",
    "vyvafabrics_silverguard_sg94002_storm.webp",
    "vyvafabrics_silverguard_sg94003_graphite.webp",
    "vyvafabrics_silverguard_sg94004_ice.webp",
    "vyvafabrics_silverguard_sg94010_titanium.webp",
    "vyvafabrics_silverguard_sg94011_sterling.webp",
    "vyvafabrics_silverguard_sg94012_shiitake.webp",
    "vyvafabrics_silverguard_sg94024_meteor.webp",
    "vyvafabrics_silverguard_sg95008_pistacho.webp",
    "vyvafabrics_silverguard_sg95009_sage.webp",
    "vyvafabrics_silverguard_sg95010_bottle.webp",
    "vyvafabrics_silverguard_sg95019_celery.webp",
    "vyvafabrics_silverguard_sg95020_basil.webp",
    "vyvafabrics_silverguard_sg95039_smog.webp",
    "vyvafabrics_silverguard_sg95063_forest.webp",
    "vyvafabrics_silverguard_sg95444_jungle.webp",
    "vyvafabrics_silverguard_sg95468_hunter.webp",
    "vyvafabrics_silverguard_sg96004_rubin.webp",
    "vyvafabrics_silverguard_sg96061_mandarin.webp",
    "vyvafabrics_silverguard_sg96062_melon.webp",
    "vyvafabrics_silverguard_sg96065_safran.webp",
    "vyvafabrics_silverguard_sg96434_mizzle.webp",
    "vyvafabrics_silverguard_sg97001_aubergine.webp",
    "vyvafabrics_silverguard_sg97251_goji.webp",
    "vyvafabrics_silverguard_sg99001_black.webp",
    "vyvafabrics_silverguard_sg99002_carbon.webp",
    "vyvafabrics_silverguard_sg99243_brick.webp",
  ],
  amalfi: [
    "amalfi_008714_sisal.webp",
    "amalfi_008716_black.webp",
    "amalfi_008717_weiss.webp",
    "amalfi_008718_leinen.webp",
    "amalfi_008719_buche.webp",
    "amalfi_008720_marine.webp",
    "amalfi_008721_delft.webp",
    "amalfi_008722_rot.webp",
    "amalfi_008723_grun.webp",
    "amalfi_008724_turkis.webp",
    "amalfi_008725_auster.webp",
    "amalfi_008726_melon.webp",
    "amalfi_008727_titan.webp",
    "amalfi_008728_grau.webp",
    "amalfi_008730_port.webp",
    "amalfi_008731_safran.webp",
    "amalfi_008732_kirsch.webp",
    "amalfi_010427_parakeet.webp",
    "amalfi_010682_orange.webp",
    "amalfi_013487_taupe.webp",
    "amalfi_013929_beige.webp",
    "amalfi_014128_azur.webp",
    "amalfi_014129_pistazie.webp",
    "amalfi_014130_mocca.webp",
    "amalfi_014131_vanille.webp",
    "amalfi_015867_anthrazit.webp",
    "amalfi_015905_fuchsia.webp",
    "amalfi_016265_mandarin.webp",
    "amalfi_019510_smoke.webp",
    "amalfi_019511_cashmere.webp",
    "amalfi_019512_nature.webp",
    "amalfi_019521_pinie.webp",
    "amalfi_019522_limone.webp",
    "amalfi_019868_baltic.webp",
    "amalfi_020646_hellbraun.webp",
    "amalfi_021770_rose.webp",
    "amalfi_021771_delfin.webp",
    "amalfi_021772_eis.webp",
    "amalfi_021773_pastellgreen.webp",
    "amalfi_021774_neo-mint.webp",
    "amalfi_021775_lila.webp",
    "amalfi_021776_petrol.webp",
    "amalfi_021777_sky.webp",
    "amalfi_021778_achat.webp",
  ],
  tretford: [
    "tretford_512_truffel.webp",
    "tretford_514_blauwe-distel.webp",
    "tretford_515_berkschors.webp",
    "tretford_516_blauw-druifje.webp",
    "tretford_517_korenbloem.webp",
    "tretford_519_lariks.webp",
    "tretford_520_klei.webp",
    "tretford_523_kiezel.webp",
    "tretford_524_aalbes.webp",
    "tretford_532_amandel.webp",
    "tretford_534_schors.webp",
    "tretford_538_winter.webp",
    "tretford_555_champignon.webp",
    "tretford_556_varen.webp",
    "tretford_558_zeewier.webp",
    "tretford_559_aarde.webp",
    "tretford_560_rogge.webp",
    "tretford_564_bamboe.webp",
    "tretford_565_den.webp",
    "tretford_566_broccoli.webp",
    "tretford_567_lupine.webp",
    "tretford_568_ananas.webp",
    "tretford_569_mos.webp",
    "tretford_570_aardbei.webp",
    "tretford_571_aardappel.webp",
    "tretford_572_denneappel.webp",
    "tretford_573_kastanje.webp",
    "tretford_575_blauwe-bes.webp",
    "tretford_580_appel.webp",
    "tretford_581_bosbes.webp",
    "tretford_582_grapefruit.webp",
    "tretford_584_pruim.webp",
    "tretford_585_mandarijn.webp",
    "tretford_588_bloesem.webp",
    "tretford_590_bruine-bonen.webp",
    "tretford_591_zwam.webp",
    "tretford_592_lavendel.webp",
    "tretford_601_zand.webp",
    "tretford_602_cashew.webp",
    "tretford_603_zonnebloem.webp",
    "tretford_611_peer.webp",
    "tretford_622_wasabi.webp",
    "tretford_632_steen.webp",
    "tretford_640_ijs.webp",
    "tretford_641_noordpool.webp",
    "tretford_642_tijm.webp",
    "tretford_643_toendra.webp",
    "tretford_644_aubergine.webp",
    "tretford_645_flamingo.webp",
    "tretford_646_poeder.webp",
    "tretford_647_parel.webp",
  ],
  flotex: [
    "flotex_s290004_menthol.webp",
    "flotex_s290006_sahara.webp",
    "flotex_s290010_ash.webp",
    "flotex_s290011_quartz.webp",
    "flotex_s290019_carbon.webp",
    "flotex_s290025_riviera.webp",
    "flotex_s290026_linen.webp",
  ],
  hpl: [
    "hpl_H1145_bardolino-eik.webp",
    "hpl_H1223_sevilla-es.webp",
    "hpl_H1277_lakeland-acacia-licht.webp",
    "hpl_H1357_spree-eik-grijs-beige.webp",
    "hpl_H1710_kentucky-kastanjelaar-zand.webp",
    "hpl_H1715_parona-walnoot.webp",
    "hpl_H1732_zandberk.webp",
    "hpl_H1910_wilg-beuk.webp",
    "hpl_H3157_vicenza-eik.webp",
    "hpl_H3158_vicenza-eik-grijs.webp",
    "hpl_H3170_kendal-eik.webp",
    "hpl_H3702_pacific-notelaar-tabak.webp",
    "hpl_H3734_dijon-notelaar.webp",
    "hpl_H3840_mandal-esdoorn-natuur.webp",
    "hpl_U125_zandgeel.webp",
    "hpl_U325_antiek-roze.webp",
    "hpl_U540_denimblauw.webp",
    "hpl_U608_pistache-groen.webp",
    "hpl_U640_olijfgroen.webp",
    "hpl_U732_stofgrijs.webp",
    "hpl_W1000_wit.webp",
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
