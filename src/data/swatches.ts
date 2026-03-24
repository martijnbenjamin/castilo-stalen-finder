export interface Swatch {
  id: string;
  collection: string;
  collectionLabel: string;
  code: string;
  name: string;
  nameLabel: string;
  colorGroup: string;
  image: string;
}

export interface Collection {
  id: string;
  label: string;
  description: string;
  count: number;
}

const COLOR_GROUPS: Record<string, string[]> = {
  Rood: [
    "red", "tomato", "fire-red", "candy-apple", "indian-red", "burgundy",
    "wine", "raspberry", "grenadine", "ruby", "rubin", "rosewood",
    "brick", "reishi", "goji-berry", "goji", "acerola", "rosehip",
    "rhubarb", "hibiscus"
  ],
  Oranje: [
    "orange", "burnt-orange", "persimmon", "nasturtium", "saffron",
    "tangerine", "marigold", "apricot", "mandarin", "sunkist",
    "melon", "melba", "coral", "peach", "cobre", "safran",
    "lox", "rum-sherbet", "winter-squash", "inca-berry"
  ],
  Geel: [
    "yellow", "citrus", "lemon", "saffron-silk", "marigold",
    "wheat", "squash", "butternut-squash", "bee-pollen", "turmeric",
    "mizzle"
  ],
  Groen: [
    "green", "hunter-green", "empire-green", "china-green", "spruce",
    "lime", "jade", "emerald", "pistacho", "sage", "bottle",
    "celery", "basil", "forest", "jungle", "hunter", "eucalyptus",
    "spinach", "avocado", "alfalfa", "swiss-chard", "kale",
    "moringa", "matcha", "kelp", "spirulina", "fennel", "mint-julep",
    "guarana", "pea-flower", "noni"
  ],
  Blauw: [
    "blue", "bright-blue", "light-blue", "marina", "bluejay",
    "royal-blue", "navy", "colonial-blue", "sky", "cerulean",
    "fjord", "turk", "turquoise", "sapphire", "baltic", "delft",
    "deepsea", "whale", "light-teal", "teal", "petrol", "glacier",
    "skylight", "cadet", "majik"
  ],
  Paars: [
    "purple", "purple-iris", "grape", "mauve", "lilac", "phoenician",
    "port", "orchid", "aubergine", "elderberry", "huckleberry",
    "lotus", "rose"
  ],
  Bruin: [
    "brown", "oak-brown", "chocolate", "chocolat", "espresso", "expresso",
    "saddle-tan", "russet", "allspice", "camel", "brandy", "deep-clay",
    "luggage", "umber", "mocca", "cinnamon", "sweet-potato",
    "cacao-bean", "carob", "khajur", "rooibos"
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
    "chia-seed", "black-soybean"
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
  };
  return map[id] || "";
}

// Parse all swatch files from the known structure
function parseSwatchFilename(filename: string, collectionDir: string): Swatch | null {
  // Remove extension
  const base = filename.replace(/\.jpeg$/, "");
  // Pattern: vyvafabrics_{collection}_{code}_{name}
  // For harlow: vyvafabrics_harlow_{code}-har_{name}
  const parts = base.split("_");
  if (parts.length < 4) return null;

  // The name is always the last part
  const name = parts[parts.length - 1];
  // The code is the second-to-last part (may contain -har suffix for harlow)
  const code = parts[parts.length - 2].replace(/-har$/, "");

  return {
    id: `${collectionDir}_${code}`,
    collection: collectionDir,
    collectionLabel: formatCollectionLabel(collectionDir),
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
    description: formatCollectionDescription(id),
    count: SWATCH_FILES[id].length,
  })
);

export const colorGroups = Object.keys(COLOR_GROUPS);
